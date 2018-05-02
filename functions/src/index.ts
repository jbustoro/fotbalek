import * as functions from "firebase-functions"
import * as admin from "firebase-admin"
import {rate, Rating} from 'ts-trueskill'

const COLLECTION_PLAYERS: string = `players`
const COLLECTION_SNAPSHOTS: string = `snapshots`
const COLLECTION_MATCHES: string = `matches`
const COLLECTION_TEAMS: string = `teams`
const COLLECTION_TOURNAMENTS: string = "tournaments"

const DEFAULT_RATING: number = 25
const DEFAULT_SIGMA: number = DEFAULT_RATING / 3

admin.initializeApp()
const db = admin.firestore()


exports.onMatchCreate = functions.firestore.document(`${COLLECTION_MATCHES}/{matchId}`)
    .onCreate((snapshot, context) => addMatch(snapshot.data(), snapshot.ref))

exports.onMatchDelete = functions.firestore.document(`${COLLECTION_MATCHES}/{matchId}`)
    .onDelete(() => resetPlayers())


exports.resetPlayers = functions.https.onRequest((req, res) =>
    resetPlayers()
        .then(() => res.end())
        .catch(e => res.json(e.message))
)

exports.createSnapshot = functions.https.onRequest((req, res) =>
    createSnapshot().then(() => res.end()).catch(e => console.error(e))
)

exports.onRegistration = functions.auth.user()
    .onCreate((snap, context) => createPlayer(snap.uid, snap.displayName))

exports.countTournamentOrder = functions.https.onRequest((req, res) => {
    const tournamentId = req.query["tournamentId"]
    calculateTeamOrder(tournamentId, false).then(() => res.end()).catch(e => console.log(e))
})

exports.countPlayerOrder = functions.https.onRequest((req, res) => {
    calculatePlayerOrder(false).then(() => res.end()).catch(e => console.log(e))
})

async function createSnapshot() {
    const result = {};

    (await db.collection(COLLECTION_PLAYERS).get()).docs
        .forEach(playerData => {result[playerData.id] = playerData.data().tsRating})

    const date = new Date()
    const dayOfMonth = date.getDate()
    const monthOfYear = date.getMonth()
    const year = date.getFullYear()

    const key = `${year}-${monthOfYear}-${dayOfMonth}`

    return db.collection(COLLECTION_SNAPSHOTS).doc(key).set(result)
}

function getDefaultTeamObject(players: string[],tournamentId:string) {
    return {
        players,
        tournamentId,
        wins: 0,
        loses: 0,
        goalsFor: 0,
        goalsAgainst: 0
    }
}

async function updateTournamentTeams(teamsArray, result ,indexes, tournamentId) {

    if (tournamentId) {
        const sortedTeamsStrings = teamsArray.map(team => team.sort().toString())

        const allTeams = (await db.collection(COLLECTION_TEAMS).where("tournamentId","==",tournamentId).get()).docs

        const teams = sortedTeamsStrings.map(teamString => {
            return allTeams.find(team => team.data().players.sort().toString() === teamString)
        })

        const batch = db.batch()
        teams.map((team, i) => {

            let teamObj
            let teamRef

            if (!team) {
                teamObj = getDefaultTeamObject(teamsArray[i],tournamentId)
                teamRef = db.collection(COLLECTION_TEAMS).doc()
            } else {
                teamRef = team.ref
                teamObj = team.data()
            }

            const newGoals: number = result[i]
            teamObj.wins += indexes[i] === 0 ? 1 : 0
            teamObj.loses += indexes[i] === 0 ? 0 : 1
            teamObj.goalsFor += newGoals
            teamObj.goalsAgainst += result.reduce((a, b) => a + b, -newGoals)

            return batch.set(teamRef, teamObj)

        })

        return await batch.commit()

    }
    return null

}


async function calculateTeamOrder(tournamentId: string, sendNotif: boolean){
    console.log(`Getting tournament: ${tournamentId}`)
    const tournamentSnapshot = await db.collection(COLLECTION_TOURNAMENTS).doc(tournamentId).get()
    if(!tournamentSnapshot.exists) throw new Error("Tournament does not exist")

    console.log(`Getting teams for tournament: ${tournamentId}`)
    const teams = (await db.collection(COLLECTION_TEAMS)
        .orderBy("wins", "desc")
        .orderBy("loses", "asc")
        .where("tournamentId","==", tournamentId).get())
        .docs

    const batch = db.batch()
    const notifications = []

    teams.map((teamData, index) => {
        const team = teamData.data()
        if(!team.order || team.order !== index){
            console.log(`Setting order for team: `, teamData.ref)
            batch.set(teamData.ref, {order: index}, {merge: true})

            if(team.order){
                console.log(`Adding notif for team `, teamData.ref)
                notifications.push({
                    players: team.players,
                    oldOrder: team.order,
                    newOrder: index
                })
            }

        }
    })

    try {
        console.log("Committing")
        await batch.commit()

        if(!sendNotif) return null

        const tournament = tournamentSnapshot.data()
        const messaging = admin.messaging()

        const players = (await db.collection(COLLECTION_PLAYERS).get()).docs

        notifications.map(notifSource => {
            notifSource.players.map(playerId => {
                const playerSnapshot = players.find(it => it.id === playerId)

                if(!playerSnapshot) return null
                const player = playerSnapshot.data()
                if(!player.deviceToken) return null

                let action = "promoted"
                if(notifSource.oldOrder < notifSource.newOrder){
                    action = "demoted"
                }

                messaging.sendToDevice(player.deviceToken, {
                    notification: {
                        title: "Fotbálek tournament ranking",
                        text: `Your team were ${action} from rank ${notifSource.oldOrder + 1} to ${notifSource.newOrder + 1} in tournament ${tournament.name}.`,
                        sound: "default"
                    }
                }).then(() => console.log(`Sent succesfullty to device ${notifSource.deviceToken}`))
                    .catch(e => console.error(e))
            })
        })


    } catch (e){
        console.error(e)
    }


}

async function calculatePlayerOrder(sendNotif: boolean) {
    const players = (await db.collection(COLLECTION_PLAYERS).orderBy("tsRating", "desc").get()).docs

    const batch = db.batch()
    const notifications = []

    players.map((playerData, index) => {
        const player = playerData.data()
        if (!player.order || player.order !== index) {
            batch.set(playerData.ref, {order: index}, {merge: true})

            if(player.order && player.deviceToken){
                notifications.push({
                    deviceToken: player.deviceToken,
                    oldOrder: player.order,
                    newOrder: index
                })
            }

        }
    })


    try {
        await batch.commit()

        if(!sendNotif) return null

        const messaging = admin.messaging()

        notifications.map(it => {
            let action = "promoted"
            if(it.oldOrder < it.newOrder){
                action = "demoted"
            }

            messaging.sendToDevice(it.deviceToken, {
                notification: {
                    title: "Fotbálek ranking",
                    text: `You were ${action} from rank ${it.oldOrder + 1} to ${it.newOrder + 1}.`,
                    sound: "default"
                }
            }).then(() => console.log(`Sent succesfullty to device ${it.deviceToken}`))
                .catch(e => console.error(e))
        })
    } catch (e){
        console.error(e)
    }

}

function getTSRating(rating: number, sigma: number){
    return rating - 3*sigma
}

function getDefaultPlayerObject(name: string) {
    return {
        name,
        rating: DEFAULT_RATING,
        sigma: DEFAULT_SIGMA,
        tsRating: getTSRating(DEFAULT_RATING, DEFAULT_SIGMA),
        wins: 0,
        loses: 0,
        goalsFor: 0,
        goalsAgainst: 0
    }
}

function createPlayer(id: string, name: string) {
    return db.collection(COLLECTION_PLAYERS).doc(id).set(getDefaultPlayerObject(name))
}

// async function resetPlayersToDefault() {
//     const collectionPlayers = await db.collection(COLLECTION_PLAYERS).get()
//     const batch = db.batch()
//     collectionPlayers.forEach((playerDoc) => {
//         batch.set(playerDoc.ref, getDefaultPlayerObject(playerDoc.data().name), {merge: true})
//     })
//
//     return batch.commit()
// }

function objectToArray(obj) {
    const arr = []
    if ('object' !== typeof obj || 'undefined' === typeof obj || Array.isArray(obj)) {
        return obj
    } else {
        Object.keys(obj).map(x => {
            if ('object' === typeof obj[x]) {
                arr.push(objectToArray(obj[x]))
            } else arr.push(obj[x])
        })
    }
    return arr
}

function getMatchEvaluation(matchData) {

    const teams = matchData.teams
    const result:any[] = matchData.result

    const sortedResult = [...result]
    sortedResult.sort((a, b) => b - a)

    const indexes = result.map(index => sortedResult.indexOf(index))

    const teamsArray = objectToArray(teams)

    return {teamsArray, result, indexes}
}

async function addMatch(matchData, matchRef) {

    const evaluation = getMatchEvaluation(matchData)
    let responses: any[]
    try {
        //todo don't load the whole collection
        responses = (await db.collection(COLLECTION_PLAYERS).get()).docs
            .filter(player => evaluation.teamsArray.some(team => team.includes(player.id)))
    } catch (e) {
        console.error(e)
        return null
    }
    const playersObj = {};

    responses.map((playerData) =>{
        playersObj[playerData.id] = playerData.data()
    })


    const newRating = getNewRating(matchData,playersObj)
    await savePlayers(newRating["players"])
    await updateMatchGains(newRating["gains"],matchRef)
    updateTournamentTeams(evaluation.teamsArray,evaluation.result,evaluation.indexes,matchData.tournamentId).catch(e => console.error(e))
    calculatePlayerOrder(true).catch(e => console.error(e))
    if(matchData.tournamentId)
        calculateTeamOrder(matchData.tournamentId, true).catch(e => console.error(e))
}

function getNewRating(matchData, playersOld) {

    console.log(matchData)
    const players = {...playersOld}
    const evaluation = getMatchEvaluation(matchData)

    const matchPlayers = evaluation.teamsArray.map(team =>
        team.map(teamPlayer => {
            const player = players[teamPlayer]
            if (!player)
                throw new Error(`Missing player ${teamPlayer}`)

            return player
        })
    )

    // const ranking = indexes.map(index => [matchPlayers[index][0].rating, matchPlayers[index][1].rating])
    const ranking = evaluation.indexes.map(index => [
        new Rating(matchPlayers[index][0].rating, matchPlayers[index][0].sigma),
        new Rating(matchPlayers[index][1].rating, matchPlayers[index][1].sigma)
    ])

    const newRating = rate(ranking)
    const gains = {}
    evaluation.teamsArray.map((team, i) =>
        team.map((playerId, n) => {
            const playerRating = newRating[evaluation.indexes[i]][n]
            const playerObj = matchPlayers[i][n]
            const win: number = evaluation.indexes[i] === 0 ? 1 : 0
            const loss: number = evaluation.indexes[i] === 0 ? 0 : 1
            const gF: number = playerObj.goalsFor
            const newGoals: number = evaluation.result[i]
            const gA: number = playerObj.goalsAgainst
            players[playerId] = {
                rating: playerRating.mu,
                sigma: playerRating.sigma,
                tsRating: getTSRating(playerRating.mu, playerRating.sigma),
                goalsFor: gF + newGoals,
                goalsAgainst: gA + evaluation.result.reduce((a, b) => a + b, -newGoals),
                wins: playerObj.wins + win,
                loses: playerObj.loses + loss
            }
            const oldRating = ranking[evaluation.indexes[i]][n]
            gains[playerId] = getTSRating(playerRating.mu, playerRating.sigma) - getTSRating(oldRating.mu, oldRating.sigma)


        })
    )

    return {"players":players,"gains":gains}

}
async function updateMatchGains(gains, matchRef) {
     return await matchRef.update({gains:gains})
}
async function savePlayers(players) {
    const batch = db.batch()
    Object.keys(players).map((id) => {
        const playerRef = db.collection(COLLECTION_PLAYERS).doc(id)
        batch.set(playerRef,players[id],{merge:true})
    })
    return await batch.commit()
}


async function resetPlayers() {
    // await resetPlayersToDefault()

    await dropTeams()
    let playersObj = {};

    (await db.collection(COLLECTION_PLAYERS).get()).docs.map((playerData) => {
        playersObj[playerData.id] = getDefaultPlayerObject(playerData.data().name)
    })

    const matchesData = await db.collection(COLLECTION_MATCHES).orderBy("playedAt", "asc").get()

    for (const match of matchesData.docs) {

        const matchData = match.data()
        const newRating = getNewRating(matchData,playersObj)
        playersObj = newRating["players"]

        const evaluation = getMatchEvaluation(matchData)
        await updateMatchGains(newRating["gains"], db.collection(COLLECTION_MATCHES).doc(match.id))
        await updateTournamentTeams(evaluation.teamsArray,evaluation.result,evaluation.indexes,matchData.tournamentId).catch(e => console.error(e))
    }

    await savePlayers(playersObj)

    return await calculatePlayerOrder(false).catch(e => console.error(e))

}

async function dropTeams() {

    const batch = db.batch()
    const teams = (await db.collection(COLLECTION_TEAMS).get()).docs

    teams.map(team => {
        batch.delete(team.ref)
    })
    return await batch.commit()

}

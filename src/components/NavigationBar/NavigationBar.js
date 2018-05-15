import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faArrowLeft from '@fortawesome/fontawesome-free-solid/faArrowLeft'
import PropTypes from 'prop-types'
import {
  MATCHES,
  PLAYERS,
  TOURNAMENTS,
  CURRENT_TOURNAMENT_LEADERBOARD,
  CURRENT_TOURNAMENT_MATCHES
} from '../../constants'
import {
  currentTournamentSelector,
  navActiveKeySelector
} from '../../selectors'
import {
  setNavActiveKey,
  displayData,
  setCurrentTournament
} from '../../actions/display'
import './NavigationBar.css'

const INITIAL_NAV_ITEMS = [
  { name: `Matches`, dataType: MATCHES },
  { name: `Players`, dataType: PLAYERS },
  { name: `Tournaments`, dataType: TOURNAMENTS }
]

const CURRENT_TOURNAMENT_NAV_ITEMS = [
  { name: `Leaderboard`, dataType: CURRENT_TOURNAMENT_LEADERBOARD },
  { name: `Matches`, dataType: CURRENT_TOURNAMENT_MATCHES }
]

const mapStateToProps = state => ({
  currentTournament: currentTournamentSelector(state),
  navActiveKey: navActiveKeySelector(state)
})

const mapDispatchToProps = {
  setNavActiveKey,
  displayData,
  setCurrentTournament
}

class NavigationBar extends Component {
  /*eslint-disable react/prop-types*/
  handleSelect(selectedKey) {
    this.props.setNavActiveKey(selectedKey)
  }

  render() {
    const { currentTournament, navActiveKey } = this.props
    const itemsToMap = !currentTournament
      ? INITIAL_NAV_ITEMS
      : CURRENT_TOURNAMENT_NAV_ITEMS

    return (
      <Navbar staticTop fluid>
        <Navbar.Collapse>
          <Nav
            activeKey={navActiveKey}
            onSelect={event => this.handleSelect(event)}
          >
            {currentTournament && (
              <NavItem onClick={() => this.props.setCurrentTournament(null)}>
                <FontAwesomeIcon className="ArrowLeft" icon={faArrowLeft} />
              </NavItem>
            )}
            {itemsToMap.map(({ name, dataType }, key) => {
              return (
                <NavItem
                  key={key}
                  eventKey={key + 1}
                  onClick={() => this.props.displayData(dataType)}
                >
                  {name}
                </NavItem>
              )
            })}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
  /*eslint-enable react/prop-types*/
}

Navbar.propTypes = {
  navActiveKey: PropTypes.number,
  displayData: PropTypes.func,
  setNavActiveKey: PropTypes.func,
  setCurrentTournament: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar)

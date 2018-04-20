import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
import './Loading.css';

const Loading = () => (
  <div className="Loading-container">
    <FontAwesomeIcon className="Spinner" icon={faSpinner} size="5x" spin />
  </div>
);

export default Loading;

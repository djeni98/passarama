import React, { useState } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import './styles.css';

export default function SearchBar (props) {
  const [value, setValue] = useState(props.value || '');

  const location = useLocation();
  const history = useHistory();

  function handleClick() {
    if (!location.pathname.includes('search')) {
      history.push('/search', value);
    } else {
      props.runFunction(value);
    }
  }

  return (
    <div className="search-bar">
      <input
        className="search-input"
        placeholder="Pesquise..."
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button
          className="search-button"
          onClick={handleClick}
      >
        <span className="material-icons">search</span>
      </button>
    </div>
  );
}

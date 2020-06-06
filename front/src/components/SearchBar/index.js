import React, { useState } from 'react';

import './styles.css';

export default function SearchBar(props) {
  const [value, setValue] = useState(props.value || '');

  const callback = props.callback || console.log;

  function checkEnterKey(event) {
    if (event.key === 'Enter') {
      callback(value);
    }
  }

  return (
    <div className="search-bar">
      <input
        className="search-input"
        placeholder="Pesquise..."
        value={value}
        type="text"
        onChange={e => setValue(e.target.value)}
        onKeyPress={checkEnterKey}
      />
      <button
          className="search-button"
          onClick={() => callback(value)}
      >
        <span className="material-icons">search</span>
      </button>
    </div>
  );
}

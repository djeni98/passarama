import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

function SearchBar(props) {
  const [value, setValue] = useState(props.value);

  const callback = props.callback;

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
        <span className="sr-only">Pesquisar</span>
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string,
  callback: PropTypes.func.isRequired
}

SearchBar.defaultProps = {
  value: ''
}

export default SearchBar;

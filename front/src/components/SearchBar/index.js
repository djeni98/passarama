/* Passarama - Find doramas and brazilian fansubs.
 * Copyright (C) 2021 Djenifer R Pereira <djeniferrenata@yahoo.com.br>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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

import React from 'react';
import './styles.css';

export default function SearchBar () {
  return (
    <div className="search-bar">
      <input className="search-input" />
      <button className="search-button">
        <span className="material-icons">search</span>
      </button>
    </div>
  );
}

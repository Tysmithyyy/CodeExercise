import React from 'react';

function SearchBar({ value, onChange }) {
  return (
    <div className='search-container'>
        <input
        type="text"
        className='search-bar'
        placeholder="Search by title..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        />
        <span className="material-symbols-outlined search-icon">search</span>
    </div>
  );
}

export default SearchBar;
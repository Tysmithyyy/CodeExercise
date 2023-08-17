import React, { useState, useRef, useEffect } from 'react';

function GenreFilter({ allGenres, onSelectGenre, selectedGenres }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleGenreChange = (event) => {
    const { id, checked } = event.target;
    const updatedGenres = checked
      ? [...selectedGenres, id]
      : selectedGenres.filter((genre) => genre !== id);

    onSelectGenre(updatedGenres);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      const optionsContainer = dropdownRef.current.querySelector('.dropdown-options');
      optionsContainer.scrollTop = 0;
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="genre-filter">
      <div className={`dropdown ${isOpen ? 'open' : ''}`} ref={dropdownRef}>
        <button className="dropdown-toggle" onClick={toggleDropdown} tabindex="0">
          {selectedGenres.length > 1 ? `${selectedGenres.length} Genres` : 'Genre'}
          {isOpen ?
            <span className="material-symbols-outlined">expand_less</span> : <span className="material-symbols-outlined">expand_more</span>
          }     
        </button>
        <div className='triangle-border'></div>
        <div className='triangle'></div>
        <div className="dropdown-options">
          {allGenres.map(genre => (
              <label htmlFor={genre} className="checkbox-label">
                <input 
                  type="checkbox" 
                  id={genre} 
                  name='genre'
                  onChange={handleGenreChange}
                  checked={selectedGenres.includes(genre)}
                />
              {genre} </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GenreFilter;

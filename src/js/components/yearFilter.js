import React, { useState, useRef, useEffect } from 'react';

function YearFilter({ allYears, onSelectYear, selectedYears }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleYearChange = (event) => {
    const { id, checked } = event.target;
    const updatedYears = checked
      ? [...selectedYears, id]
      : selectedYears.filter((genre) => genre !== id);

    onSelectYear(updatedYears);
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
    <div className="year-filter">
      <div className={`dropdown ${isOpen ? 'open' : ''}`} ref={dropdownRef}>
      <button className="dropdown-toggle" onClick={toggleDropdown} tabindex="0">
          Year
          {isOpen ?
            <span className="material-symbols-outlined">expand_less</span> : <span className="material-symbols-outlined">expand_more</span>
          }     
        </button>
        <div className='triangle-border'></div>
        <div className='triangle'></div>
        <div className="dropdown-options">
          {allYears.map(year => (
            <label htmlFor={year} className="checkbox-label">
              <input 
                type="checkbox" 
                id={year} 
                name='year'
                onChange={handleYearChange}
                checked={selectedYears.includes(year)} 
              />
            {year} </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default YearFilter;
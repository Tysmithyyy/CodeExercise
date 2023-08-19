import React, { useState, useRef, useEffect } from "react";

function CheckboxFilter({ allFilters, onSelectFilter, selectedFilters, filterType, }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Creates an array of selected filters each time an option is checked.
  const handleChange = (event) => {
    const { id, checked } = event.target;
    const updatedFilters = checked
      ? [...selectedFilters, id]
      : selectedFilters.filter((genre) => genre !== id);

    onSelectFilter(updatedFilters);
  };

  // Makes sure that the dropdown gets the open class when clicked open. Also makes sure that the filters are scrolled to the top each time it is opened.
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      const optionsContainer =
        dropdownRef.current.querySelector(".dropdown-options");
      optionsContainer.scrollTop = 0;
    }
  };

  // Closes the open dropdown when a click is detected outside the options dropdown. 
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Listener to call above function on a click
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown-filter">
      <div className={`dropdown ${isOpen ? "open" : ""}`} ref={dropdownRef}>
        <button className="dropdown-toggle" onClick={toggleDropdown}>
          {selectedFilters.length > 1
            ? `${selectedFilters.length} ${filterType}s`
            : `${filterType}`}
          {isOpen ? (
            <span className="material-symbols-outlined">expand_less</span>
          ) : (
            <span className="material-symbols-outlined">expand_more</span>
          )}
        </button>
        <div className="dropdown-options">
          {allFilters.map((filter) => (
            <label htmlFor={filter} key={filter} className="checkbox-label">
              <input
                type="checkbox"
                id={filter}
                name="filter"
                onChange={handleChange}
                checked={selectedFilters.includes(filter)}
              />
              {filter}{" "}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CheckboxFilter;

import React from "react";

function FilterPills({
  selectedGenres,
  selectedYears,
  selectedType,
  onChange,
}) {
  const handlePillClick = (filterType, value) => {
    onChange(filterType, value);
  };

  const renderPills = (filters, filterType) => {
    return filters.map((filter, index) => (
      <button
        key={index}
        className="filter-pill-button"
        onClick={() => handlePillClick(filterType, filter)}
      >
        {filter}{" "}
        <span
          className="pill-close-icon"
          aria-label={"Remove" + filter + "filter"}
        >
          &#10005;
        </span>
      </button>
    ));
  };

  return (
    <div className="filter-pills">
      {selectedGenres.length > 0 && renderPills(selectedGenres, "Genre")}
      {selectedYears.length > 0 && renderPills(selectedYears, "Year")}
      {selectedType && renderPills([selectedType], "Type")}
    </div>
  );
}

export default FilterPills;

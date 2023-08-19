import React, { useState, useEffect } from "react";
// Fuse.js for fuzzy search
import Fuse from "fuse.js";
// Importing componentes
import DisplayMoviesBooks from "./components/displayMoviesBooks.js";
import CheckboxFilter from "./components/checkboxFilter.js";
import ToggleMovieBook from "./components/toggleMovieBook.js";
import SearchBar from "./components/searchBar.js";
import FilterPills from "./components/filterPills.js";
// api module
import { fetchAllMediaData } from "./utils/apiService.js"; 
// utilities modules
import { getAllGenres, getAllYears } from "./utils/utils.js"; 

function MediaPage() {
  // Setup state variables
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [allYears, setAllYears] = useState([]);
  const [mediaType, setMediaType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [mediaData, setMediaData] = useState([]);

  // Perform data fetching, and get arrays that will be used for filters
  useEffect(() => {
    async function fetchData() {
      try {
        const allData = await fetchAllMediaData();
        setMediaData(allData);
        setAllGenres(getAllGenres(allData));
        setAllYears(getAllYears(allData));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  // Handle changes from different filter components
  const handleGenreChange = (selectedGenres) => {
    setSelectedGenres(selectedGenres);
  };

  const handleYearChange = (selectedYears) => {
    setSelectedYears(selectedYears);
  };

  const handleMediaTypeChange = (mediaType) => {
    setMediaType(mediaType);
  };

  // Handle a search query, and configure and run a fuzzy search using fuse.js
  const handleSearchQuery = (newSearchQuery) => {
    setSearchQuery(newSearchQuery);

    const fuseOptions = {
      keys: ["title"],
      threshold: 0.3,
    };

    const fuse = new Fuse(mediaData, fuseOptions);

    const searchResults = fuse.search(newSearchQuery);

    setSearchResults(searchResults);
  };

  // Handle when a filter pill is removed, and remove that filter from the approprate filter type
  const handlePillChange = (filterType, valueToRemove) => {
    if (filterType === "Genre") {
      setSelectedGenres(
        selectedGenres.filter((genre) => genre !== valueToRemove)
      );
    } else if (filterType === "Year") {
      setSelectedYears(selectedYears.filter((year) => year !== valueToRemove));
    } else if (filterType === "Type") {
      setMediaType("");
    }
  };

  // Clear filters when the "Clear Filters" button is pressed
  const clearFilters = () => {
    setSelectedGenres([]);
    setSelectedYears([]);
    setMediaType("");
    setSearchQuery("");
  };

  // All filtering is handled here and the resulting data is send to the display media component to be rendered
  const filteredMovieData = mediaData.filter((media) => {
    const matchesGenre =
      selectedGenres.length === 0 ||
      selectedGenres.some((genre) => media.genre.includes(genre));
    const matchesYear =
      selectedYears.length === 0 || selectedYears.includes(media.year);
    const matchesType = mediaType === "" || media.type === mediaType;
    const matchesSearch =
      searchQuery === "" ||
      searchResults.some((result) => result.item.title === media.title);
    return matchesGenre && matchesYear && matchesType && matchesSearch;
  });

  return (
    <div className="media-page">
      <div className="filters-container">
        <div className="media-filters">
          <div className="select-filters">
            <CheckboxFilter
              allFilters={allGenres}
              onSelectFilter={handleGenreChange}
              selectedFilters={selectedGenres}
              filterType="Genre"
            />
            <CheckboxFilter
              allFilters={allYears}
              onSelectFilter={handleYearChange}
              selectedFilters={selectedYears}
              filterType="Year"
            />
          </div>
          <SearchBar value={searchQuery} onChange={handleSearchQuery} />
        </div>
        <div className="other-filters">
          <ToggleMovieBook
            selectedType={mediaType}
            onMediaTypeChange={handleMediaTypeChange}
          />
          <button onClick={clearFilters}>Clear Filters</button>
        </div>
      </div>
      <FilterPills
        selectedType={mediaType}
        selectedYears={selectedYears}
        selectedGenres={selectedGenres}
        onChange={handlePillChange}
      />
      <DisplayMoviesBooks mediaData={filteredMovieData} />
    </div>
  );
}

export default MediaPage;

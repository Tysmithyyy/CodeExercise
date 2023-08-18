import React, { useState, useEffect } from "react";
// Fuse.js for fuzzy search
import Fuse from "fuse.js";
import DisplayMoviesBooks from "./components/displayMoviesBooks.js";
import GenreFilter from "./components/genreFilter.js";
import YearFilter from "./components/yearFilter.js";
import ToggleMovieBook from "./components/toggleMovieBook.js";
import SearchBar from "./components/searchBar.js";
import { fetchAllMediaData } from "./utils/apiService.js"; // api module
import { getAllGenres, getAllYears } from "./utils/utils.js"; // utilities modules

function MediaPage() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [allYears, setAllYears] = useState([]);
  const [mediaType, setMediaType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [mediaData, setMediaData] = useState([]);

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

  // Handle genre and year changes
  const handleGenreChange = (selectedGenres) => {
    setSelectedGenres(selectedGenres);
  };

  const handleYearChange = (selectedYears) => {
    setSelectedYears(selectedYears);
  };

  const handleMediaTypeChange = (mediaType) => {
    setMediaType(mediaType);
  };

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

  const clearFilters = () => {
    setSelectedGenres([]);
    setSelectedYears([]);
    setMediaType("");
    setSearchQuery("");
  };

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
            <GenreFilter
              allGenres={allGenres}
              onSelectGenre={handleGenreChange}
              selectedGenres={selectedGenres}
            />
            <YearFilter
              allYears={allYears}
              onSelectYear={handleYearChange}
              selectedYears={selectedYears}
            />
          </div>
          <SearchBar 
            value={searchQuery} 
            onChange={handleSearchQuery} 
          />
        </div>
        <div className="other-filters">
          <ToggleMovieBook
            selectedType={mediaType}
            onMediaTypeChange={handleMediaTypeChange}
          />
          <button onClick={clearFilters}>Clear Filters</button>
        </div>
      </div>
      <DisplayMoviesBooks mediaData={filteredMovieData} />
    </div>
  );
}

export default MediaPage;

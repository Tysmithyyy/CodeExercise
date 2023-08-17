import React, { useState, useEffect } from 'react';
import DisplayMoviesBooks from './components/displayMoviesBooks.js';
import GenreFilter from './components/genreFilter.js';
import YearFilter from './components/yearFilter.js';
import ToggleMovieBook from './components/toggleMovieBook.js';
import SearchBar from './components/searchBar.js'
import { fetchAllMediaData } from './utils/apiService.js'; // api module
import { getAllGenres, getAllYears } from './utils/utils.js'; // utilities modules

function MediaPage() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [allYears, setAllYears] = useState([]);
  const [mediaType, setMediaType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [mediaData, setMediaData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const allData = await fetchAllMediaData();
        setMediaData(allData);
        const genres = getAllGenres(allData);
        setAllGenres(genres);
        console.log(allGenres)

        const years = getAllYears(allData);
        setAllYears(years);
        console.log(allYears)
      } catch (error) {
        console.error('Error fetching data:', error);
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

  const clearFilters = () => {
    setSelectedGenres([]);
    setSelectedYears([]);
    setMediaType('');
    setSearchQuery('');
  };

  const filteredMovieData = mediaData.filter((media) => {
    const matchesGenre = selectedGenres.length === 0 || selectedGenres.some((genre) => media.genre.includes(genre));
    const matchesYear = selectedYears.length === 0 || selectedYears.includes(media.year);
    const matchesType = mediaType === '' || media.type === mediaType;
    const matchesSearch = media.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesYear && matchesType && matchesSearch;
  });

  console.log(filteredMovieData)

  return (
    <div className="media-page">
      <h1>Media Page</h1>
      <div className='filters-container'>
        <div>
          <div className='select-filters'>
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
          <ToggleMovieBook 
            selectedType={mediaType}
            onMediaTypeChange={handleMediaTypeChange}
          />
        </div>
        <div className='other-filters'>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <button onClick={clearFilters}>Clear Filters</button>
        </div>
      </div>
      <DisplayMoviesBooks mediaData={filteredMovieData} />
    </div>
  );
}

export default MediaPage;
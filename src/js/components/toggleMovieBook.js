import React from 'react';

function ToggleMovieBook({ selectedType, onMediaTypeChange }) {
  return (
    <div className='toggle-container'>
        <label class="form-control">
            <input 
                type="radio" 
                name="mediaType"
                value="movie"
                checked={selectedType === "movie"}
                onChange={() => onMediaTypeChange("movie")} 
            />
            Movies
        </label>
        <label class="form-control">
            <input 
                type="radio" 
                name="mediaType"
                value="book"
                checked={selectedType === "book"}
                onChange={() => onMediaTypeChange("book")} 
            />
            Books
        </label>
    </div>
  );
}

export default ToggleMovieBook;
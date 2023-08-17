import React from 'react';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function DisplayMoviesBooks({ mediaData }) {
    return (
        <div className="media-list">
          {mediaData.map((media, index) => (
            <div className="media-card" key={index}>
              <img src={media.poster} alt={media.title} />
              <h2>{media.title} ({media.year})</h2>
              <p>Genres: {media.genre.map(genre => capitalizeFirstLetter(genre)).join(', ')}</p>
            </div>
          ))}
        </div>
      );
}

export default DisplayMoviesBooks;

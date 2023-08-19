import React from "react";
import noCover from "../../static/no-cover-art.png";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function DisplayMoviesBooks({ mediaData }) {
  // Function to handle media without cover art, replaces the src url with a static default image.
  const handleImageError = (e) => {
    e.target.src = noCover;
  };

  // Function to sort the data by title before it is rendered. This is done after other filters.
  const sortedMediaData = mediaData.slice().sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }
    return 0;
  });

  // Before rendering the object map of media, the jsx checks if there are no results and displays a message if there aren't
  return (
    <div>
      {sortedMediaData.length > 0 ? (
        <div className="media-list">
          {sortedMediaData.map((media, index) => (
            <div className="media-card" key={index}>
              <img
                src={media.poster}
                alt={media.title}
                onError={handleImageError}
              />
              <div className="card-text">
                <h2>
                  {media.title} ({media.year})
                </h2>
                <p>
                  Genres:{" "}
                  {media.genre
                    .map((genre) => capitalizeFirstLetter(genre))
                    .join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-results">
          Sorry, no results were found matching your search.
        </p>
      )}
    </div>
  );
}

export default DisplayMoviesBooks;

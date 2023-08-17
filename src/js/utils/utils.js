export function getAllGenres(mediaData) {
    // Using a Set to prevent duplicate genres
    const allGenres = new Set();

    mediaData.forEach((media) => {
        media.genre.forEach((genre) => {
            allGenres.add(genre);
        });
    });

    // Sorting genres alphabetically before returning the array to be used in the dropdown
    const sortedGenres = Array.from(allGenres).sort();

    return sortedGenres;
}

export function getAllYears(mediaData) {
    // Using a Set to prevent duplicate years
    const allYears = new Set();

    mediaData.forEach((media) => {
        allYears.add(media.year);
    });

    // Sorting years in order before returning the array to be used in the dropdown
    const sortedYears = Array.from(allYears).sort((a, b) => a - b);

    return sortedYears;
}
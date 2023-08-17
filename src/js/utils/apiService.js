// api to retrieve movie data
export async function fetchAllMediaData() {
    try {
      const response = await fetch('https://raw.githubusercontent.com/HubSpotWebTeam/CodeExercise/main/src/js/data/data.json');
      const data = await response.json();
      return data.media;
    } catch (error) {
      throw new Error('Error fetching data: ' + error.message);
    }
  }
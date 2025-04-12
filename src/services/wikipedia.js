// Simple service to fetch Wikipedia data based on coordinates

export const getWikipediaInfo = async (latitude, longitude) => {
    try {
      // Using Wikipedia's GeoSearch API to find articles near the coordinates
      const geoUrl = `https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gsradius=10000&gscoord=${latitude}|${longitude}&gslimit=5&format=json&origin=*`;
      
      const geoResponse = await fetch(geoUrl);
      const geoData = await geoResponse.json();
      
      if (!geoData.query || !geoData.query.geosearch || geoData.query.geosearch.length === 0) {
        return {
          title: "No information found",
          extract: "There doesn't seem to be any notable landmarks near this location in our database.",
          distance: null
        };
      }
      
      // Get the closest landmark (first result)
      const closestPlace = geoData.query.geosearch[0];
      
      // Now get more detailed information about this place
      const detailsUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&pageids=${closestPlace.pageid}&format=json&origin=*`;
      
      const detailsResponse = await fetch(detailsUrl);
      const detailsData = await detailsResponse.json();
      
      const page = detailsData.query.pages[closestPlace.pageid];
      
      return {
        title: page.title,
        extract: page.extract || "No detailed description available.",
        distance: `${Math.round(closestPlace.dist)} meters away`
      };
    } catch (error) {
      console.error('Error fetching Wikipedia data:', error);
      return {
        title: "Error",
        extract: "Could not fetch information at this time. Please try again later.",
        distance: null
      };
    }
  };
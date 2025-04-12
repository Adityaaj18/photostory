// Simple service to fetch currency data based on coordinates

// This function gets country code from coordinates using reverse geocoding
export const getCountryFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      return data.address?.country_code?.toUpperCase() || null;
    } catch (error) {
      console.error('Error getting country from coordinates:', error);
      return null;
    }
  };
  
  // This function gets currency information for a country
  export const getCurrencyInfo = async (latitude, longitude, homeCurrency) => {
    try {
      // First get the country from coordinates
      const countryCode = await getCountryFromCoordinates(latitude, longitude);
      if (!countryCode) {
        return {
          error: "Could not determine country from location"
        };
      }
      
      // Get currency information for the country
      const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
      const countryData = await response.json();
      
      if (!countryData || !countryData[0]?.currencies) {
        return {
          error: "No currency information available for this location"
        };
      }
      
      // Get the first currency for the country
      const currencyCode = Object.keys(countryData[0].currencies)[0];
      const currencyInfo = countryData[0].currencies[currencyCode];
      
      // Get exchange rate (using ExchangeRate-API)
      // Note: In a real app, you would use your API key; this is a free endpoint with limitations
      const exchangeResponse = await fetch(
        `https://open.er-api.com/v6/latest/${homeCurrency}`
      );
      const exchangeData = await exchangeResponse.json();
      
      const exchangeRate = exchangeData.rates[currencyCode];
      
      return {
        country: countryData[0].name.common,
        currencyCode,
        currencyName: currencyInfo.name,
        currencySymbol: currencyInfo.symbol,
        exchangeRate: exchangeRate || "Not available",
        homeCurrency
      };
    } catch (error) {
      console.error('Error fetching currency data:', error);
      return {
        error: "Could not fetch currency information"
      };
    }
  };
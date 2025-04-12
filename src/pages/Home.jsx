// import React, { useState, useEffect } from 'react';
// import { Camera } from '@capacitor/camera';
// import { Geolocation } from '@capacitor/geolocation';

// const Home = () => {
//   const [photo, setPhoto] = useState(null);
//   const [coords, setCoords] = useState(null);
//   const [locationName, setLocationName] = useState('');
//   const [unsplashImage, setUnsplashImage] = useState('');

//   const takePhoto = async () => {
//     try {
//       const image = await Camera.getPhoto({
//         resultType: 'dataUrl',
//         source: 'CAMERA',
//         quality: 80,
//       });
//       setPhoto(image.dataUrl);
//     } catch (err) {
//       console.log('Camera error:', err);
//     }
//   };

//   const getLocation = async () => {
//     try {
//       const position = await Geolocation.getCurrentPosition();
//       const { latitude, longitude } = position.coords;
//       setCoords({ lat: latitude, lng: longitude });
//     } catch (err) {
//       console.log('Location error:', err);
//     }
//   };

//   const getPlaceName = async () => {
//     if (!coords) return;
//     try {
//       const apiKey = '92ccd50902fa4696885dd2e879493590';
//       const response = await fetch(
//         `https://api.opencagedata.com/geocode/v1/json?q=${coords.lat}+${coords.lng}&key=${apiKey}`
//       );
//       const data = await response.json();
//       const components = data.results[0].components;
//       const place =
//         components.city ||
//         components.town ||
//         components.village ||
//         components.county;
//       setLocationName(place);
//     } catch (err) {
//       console.log('Geocoding error:', err);
//     }
//   };

//   const getUnsplashImage = async (query) => {
//     try {
//       const unsplashKey = 'z5KROQZRWJmlDxTPeMi03Y_hr1P-HESnQKTkVXZdt-I';
//       const res = await fetch(
//         `https://api.unsplash.com/search/photos?query=${query}&client_id=${unsplashKey}`
//       );
//       const data = await res.json();
//       if (data.results && data.results.length > 0) {
//         setUnsplashImage(data.results[0].urls.small);
//       }
//     } catch (err) {
//       console.log('Unsplash error:', err);
//     }
//   };

//   useEffect(() => {
//     if (locationName) {
//       getUnsplashImage(locationName);
//     }
//   }, [locationName]);

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>📷 Photo Story Journal</h2>

//       <button onClick={takePhoto}>Take Photo</button>
//       <button onClick={getLocation}>Get Location</button>
//       <button onClick={getPlaceName}>Get Place Name</button>

//       {photo && <img src={photo} alt="Your capture" width="100%" />}
//       {coords && (
//         <p>
//           Lat: {coords.lat}, Lng: {coords.lng}
//         </p>
//       )}
//       {locationName && <p>📍 You are in: {locationName}</p>}
//       {unsplashImage && (
//         <div>
//           <p>Inspired by:</p>
//           <img src={unsplashImage} alt="Inspiration" width="100%" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

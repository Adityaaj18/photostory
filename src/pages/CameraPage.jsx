// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { 
//   IonPage, 
//   IonHeader, 
//   IonToolbar, 
//   IonTitle, 
//   IonContent, 
//   IonButton,
//   IonFooter,
//   IonButtons,
//   IonIcon,
//   IonSpinner,
//   IonText
// } from '@ionic/react';
// import { camera, settings } from 'ionicons/icons';
// import { Camera, CameraResultType } from '@capacitor/camera';
// import { Geolocation } from '@capacitor/geolocation';

// const CameraPage = ({ homeCurrency }) => {
//   const history = useHistory();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [locationName, setLocationName] = useState('Tap to capture a moment');
  
//   // Navigate to settings
//   const goToSettings = () => {
//     history.push('/settings');
//   };
  
//   // Take a photo and get location
//   const takePhoto = async () => {
//     try {
//       setLoading(true);
//       setError('');
      
//       // Get current location
//       const position = await Geolocation.getCurrentPosition();
//       const { latitude, longitude } = position.coords;
      
//       // Try to get a readable location name
//       try {
//         const response = await fetch(
//           `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
//         );
//         const locationData = await response.json();
//         setLocationName(locationData.display_name || 'Current Location');
//       } catch (err) {
//         console.error('Error getting location name:', err);
//         setLocationName('Current Location');
//       }
      
//       // Take a photo
//       const image = await Camera.getPhoto({
//         quality: 90,
//         allowEditing: false,
//         resultType: CameraResultType.Uri
//       });
      
//       // Navigate to result page with location and photo data
//       history.push(`/result/${latitude}/${longitude}/${encodeURIComponent(image.webPath)}`);
      
//     } catch (err) {
//       console.error('Error:', err);
//       setError('Error capturing photo or location. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonTitle>Travel Snapshot</IonTitle>
//           <IonButtons slot="end">
//             <IonButton onClick={goToSettings}>
//               <IonIcon icon={settings} />
//             </IonButton>
//           </IonButtons>
//         </IonToolbar>
//       </IonHeader>
      
//       <IonContent className="ion-padding" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//         <div style={{ textAlign: 'center', marginBottom: '20px' }}>
//           <IonText>
//             <h2>{locationName}</h2>
//           </IonText>
//         </div>
        
//         {error && (
//           <div style={{ color: 'red', textAlign: 'center', margin: '20px' }}>
//             {error}
//           </div>
//         )}
        
//         <div style={{ 
//           display: 'flex', 
//           justifyContent: 'center',
//           marginTop: '20px'
//         }}>
//           <IonButton 
//             size="large" 
//             shape="round"
//             color="primary"
//             onClick={takePhoto}
//             disabled={loading}
//           >
//             {loading ? <IonSpinner name="dots" /> : <IonIcon icon={camera} size="large" />}
//           </IonButton>
//         </div>
//       </IonContent>
      
//       <IonFooter>
//         <IonToolbar>
//           <div style={{ textAlign: 'center', padding: '10px' }}>
//             <IonText color="medium">
//               Take a photo to discover facts about your location
//             </IonText>
//           </div>
//         </IonToolbar>
//       </IonFooter>
//     </IonPage>
//   );
// };

// export default CameraPage;
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton,
  IonFooter,
  IonButtons,
  IonIcon,
  IonSpinner,
  IonText,
  isPlatform
} from '@ionic/react';
import { camera, settings } from 'ionicons/icons';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';

const CameraPage = ({ homeCurrency }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [locationName, setLocationName] = useState('Tap to capture a moment');
  
  // Request permissions when component mounts
  useEffect(() => {
    const requestPermissions = async () => {
      try {
        if (isPlatform('android') || isPlatform('ios')) {
          // Request camera permission
          await Camera.requestPermissions();
          
          // Request geolocation permission
          await Geolocation.requestPermissions();
          
          console.log('Permissions requested');
        }
      } catch (err) {
        console.error('Error requesting permissions:', err);
        setError('Please grant camera and location permissions in settings.');
      }
    };
    
    requestPermissions();
  }, []);
  
  // Navigate to settings
  const goToSettings = () => {
    history.push('/settings');
  };
  
  // Take a photo and get location
  const takePhoto = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Get current location
      console.log('Getting location...');
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000
      });
      console.log('Position:', position);
      const { latitude, longitude } = position.coords;
      
      // Try to get a readable location name
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const locationData = await response.json();
        setLocationName(locationData.display_name || 'Current Location');
      } catch (err) {
        console.error('Error getting location name:', err);
        setLocationName('Current Location');
      }
      
      // Take a photo
      console.log('Taking photo...');
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: isPlatform('hybrid') ? 'CAMERA' : 'PROMPT'
      });
      console.log('Photo taken:', image);
      
      // Navigate to result page with location and photo data
      history.push(`/result/${latitude}/${longitude}/${encodeURIComponent(image.webPath)}`);
      
    } catch (err) {
      console.error('Error:', err);
      setError(`Error capturing photo or location: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Travel Snapshot</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={goToSettings}>
              <IonIcon icon={settings} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <IonText>
            <h2>{locationName}</h2>
          </IonText>
        </div>
        
        {error && (
          <div style={{ color: 'red', textAlign: 'center', margin: '20px' }}>
            {error}
          </div>
        )}
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center',
          marginTop: '20px'
        }}>
          <IonButton 
            size="large" 
            shape="round"
            color="primary"
            onClick={takePhoto}
            disabled={loading}
          >
            {loading ? <IonSpinner name="dots" /> : <IonIcon icon={camera} size="large" />}
          </IonButton>
        </div>
      </IonContent>
      
      <IonFooter>
        <IonToolbar>
          <div style={{ textAlign: 'center', padding: '10px' }}>
            <IonText color="medium">
              Take a photo to discover facts about your location
            </IonText>
          </div>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default CameraPage;
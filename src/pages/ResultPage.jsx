import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonBackButton,
  IonButtons,
  IonSpinner,
  IonText
} from '@ionic/react';
import { home, share } from 'ionicons/icons';
import { Share } from '@capacitor/share';

import { getWikipediaInfo } from '../services/wikipedia';
import { getCurrencyInfo } from '../services/currency';

const ResultPage = ({ homeCurrency }) => {
  const { lat, lng, photoPath } = useParams();
  const history = useHistory();
  
  const [wikiData, setWikiData] = useState(null);
  const [currencyData, setCurrencyData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch Wikipedia information
        const wikiInfo = await getWikipediaInfo(lat, lng);
        setWikiData(wikiInfo);
        
        // Fetch currency information
        const currencyInfo = await getCurrencyInfo(lat, lng, homeCurrency);
        setCurrencyData(currencyInfo);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [lat, lng, homeCurrency]);
  
  // Handle sharing
  const shareSnapshot = async () => {
    try {
      await Share.share({
        title: 'My Travel Snapshot',
        text: `Check out what I discovered: ${wikiData?.title} - ${wikiData?.extract?.substring(0, 100)}...`,
        url: photoPath, // This might not work as expected in a real app without hosting the image
        dialogTitle: 'Share your travel snapshot'
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  
  // Go back to camera
  const goToCamera = () => {
    history.push('/camera');
  };
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/camera" />
          </IonButtons>
          <IonTitle>Travel Snapshot</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={shareSnapshot}>
              <IonIcon icon={share} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        {/* Photo display */}
        <div style={{ 
          margin: '0 auto 20px', 
          textAlign: 'center',
          maxHeight: '40vh',
          overflow: 'hidden'
        }}>
          <img 
            src={decodeURIComponent(photoPath)} 
            alt="Snapshot" 
            style={{ 
              width: '100%', 
              objectFit: 'cover',
              borderRadius: '8px'
            }} 
          />
        </div>
        
        {loading ? (
          <div style={{ textAlign: 'center', margin: '20px' }}>
            <IonSpinner />
            <p>Loading location information...</p>
          </div>
        ) : (
          <>
            {/* Wikipedia information */}
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>{wikiData?.title || 'Location Information'}</IonCardTitle>
                {wikiData?.distance && (
                  <IonText color="medium">
                    <small>{wikiData.distance}</small>
                  </IonText>
                )}
              </IonCardHeader>
              <IonCardContent>
                <p>{wikiData?.extract || 'No information available for this location.'}</p>
              </IonCardContent>
            </IonCard>
            
            {/* Currency information */}
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Local Currency</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                {currencyData?.error ? (
                  <p>{currencyData.error}</p>
                ) : (
                  <>
                    <p><strong>Country:</strong> {currencyData?.country}</p>
                    <p><strong>Currency:</strong> {currencyData?.currencyName} ({currencyData?.currencyCode})</p>
                    <p><strong>Symbol:</strong> {currencyData?.currencySymbol}</p>
                    {currencyData?.exchangeRate && (
                      <p><strong>Exchange Rate:</strong> 1 {homeCurrency} = {currencyData.exchangeRate} {currencyData.currencyCode}</p>
                    )}
                  </>
                )}
              </IonCardContent>
            </IonCard>
          </>
        )}
        
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <IonButton 
            expand="block" 
            onClick={goToCamera}
          >
            <IonIcon icon={home} slot="start" />
            Take Another Photo
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ResultPage;
import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonButtons,
  IonBackButton,
  IonButton
} from '@ionic/react';

const SettingsPage = ({ homeCurrency, setHomeCurrency }) => {
  // Common currencies
  const currencies = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'CHF', name: 'Swiss Franc' },
    { code: 'CNY', name: 'Chinese Yuan' },
    { code: 'INR', name: 'Indian Rupee' },
    { code: 'BRL', name: 'Brazilian Real' },
  ];
  
  // Handle currency change
  const handleCurrencyChange = (event) => {
    setHomeCurrency(event.detail.value);
  };
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/camera" />
          </IonButtons>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Home Currency</IonLabel>
            <IonSelect 
              value={homeCurrency} 
              onIonChange={handleCurrencyChange}
              placeholder="Select Currency"
            >
              {currencies.map(currency => (
                <IonSelectOption key={currency.code} value={currency.code}>
                  {currency.name} ({currency.code})
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </IonList>
        
        <div className="ion-padding">
          <p>
            Set your home currency to see exchange rates when you take photos in different countries.
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
import React from "react";
import { useHistory } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { auth, provider, signInWithPopup } from "../firebaseConfig";

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
  IonButton,
} from "@ionic/react";

const SettingsPage = ({ homeCurrency, setHomeCurrency }) => {
  const history = useHistory();
  // Common currencies
  const currencies = [
    { code: "USD", name: "US Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "INR", name: "Indian Rupee" },
    { code: "BRL", name: "Brazilian Real" },
  ];

  // Handle currency change
  const handleCurrencyChange = (event) => {
    setHomeCurrency(event.detail.value);
  };

  const handleLogout = async () => {
    try {
      // Remove user from localStorage
      localStorage.removeItem("user"); // Remove the user item from localStorage [[10]]

      // Sign out from Firebase Auth
      await signOut(auth); // Sign out the current Firebase user
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Redirect to login page
      history.replace("/");
    }
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
              {currencies.map((currency) => (
                <IonSelectOption key={currency.code} value={currency.code}>
                  {currency.name} ({currency.code})
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </IonList>

        <div className="ion-padding">
          <p>
            Set your home currency to see exchange rates when you take photos in
            different countries.
          </p>
        </div>
      </IonContent>
      <div className="ion-padding">
        <IonButton expand="block" color="danger" onClick={handleLogout}>
          Logout
        </IonButton>
      </div>
    </IonPage>
  );
};

export default SettingsPage;

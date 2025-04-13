// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import { auth, provider, signInWithPopup } from "../firebaseConfig";

// const Login = () => {
//   const history = useHistory();

//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     try {
//       setLoading(true);
//       const result = await signInWithPopup(auth, provider);
//       console.log("User Info:", result.user);
//       history.push("/camera"); // Redirect to the "/camera" route after successful login
//     } catch (error) {
//       console.error("Error during login:", error);
//     }finally{
//       setLoading(false)
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>{loading ? "Processing" : "Login"}</h1>
//       <button onClick={handleLogin}>Login with Google</button>
//     </div>
//   );
// };

// export default Login;

// 111111111111111111111111111111111111111111111111

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, provider, signInWithPopup } from "../firebaseConfig";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonSpinner,
  IonText,
} from "@ionic/react";
import { logoGoogle, airplane } from "ionicons/icons";
import "./Login.css"; // You'll need to create this CSS file

const Login = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider).then((result) => {
        const user = result.user;

        const userData = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };

        // Save to localStorage
        localStorage.setItem("user", JSON.stringify(userData));
        console.log("User Info:", result.user);
        history.push("/camera"); // Redirect to the "/camera" route after successful login
      });
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="login-container">
          <div className="logo-container">
            <div className="logo-icon">
              <IonIcon icon={airplane} />
            </div>
            <h1 className="logo-text">TravelStory</h1>
          </div>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle className="ion-text-center">
                <h1>Welcome</h1>
                <p>Sign in to continue</p>
              </IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <div className="ion-text-center ion-margin-vertical">
                <IonButton
                  expand="block"
                  size="large"
                  onClick={handleLogin}
                  disabled={loading}
                  className="google-button"
                >
                  {loading ? (
                    <IonSpinner name="dots" />
                  ) : (
                    <>
                      <IonIcon icon={logoGoogle} slot="start" />
                      <IonText>Login with Google</IonText>
                    </>
                  )}
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;

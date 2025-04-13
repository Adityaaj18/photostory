import React, { useState } from "react";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

import CameraPage from "./pages/CameraPage";
import ResultPage from "./pages/ResultPage";
import SettingsPage from "./pages/SettingsPage";

import Login from "./components/Login"
import { auth } from "./firebaseConfig";

/* Core CSS required for Ionic components */
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS imports */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App = () => {
  console.log(auth.currentUser);
  
  const isAuthenticated = !!auth.currentUser;
  // Store home currency in app-level state
  const [homeCurrency, setHomeCurrency] = useState("USD");

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/camera">
            {/* {isAuthenticated ? ( */}
              <CameraPage homeCurrency={homeCurrency} />
            {/* ) : ( */}
              {/* <Redirect to="/" /> */}
            {/* )} */}
          </Route>
          <Route path="/result/:lat/:lng/:photoPath">
            {/* {isAuthenticated ? ( */}
              <ResultPage homeCurrency={homeCurrency} />
            {/* ) : (
              <Redirect to="/" />
            )} */}
          </Route>
          <Route path="/settings">
            {/* {isAuthenticated ? ( */}
              <SettingsPage
                homeCurrency={homeCurrency}
                setHomeCurrency={setHomeCurrency}
              />
            {/* ) : (
              <Redirect to="/" />
            )} */}
          </Route>
          <Route exact path="/">
            {isAuthenticated ? <Redirect to="/camera" /> : <Login />}
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

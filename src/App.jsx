import React, { useState } from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

import CameraPage from './pages/CameraPage';
import ResultPage from './pages/ResultPage';
import SettingsPage from './pages/SettingsPage';

/* Core CSS required for Ionic components */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS imports */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App = () => {
  // Store home currency in app-level state
  const [homeCurrency, setHomeCurrency] = useState('USD');

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/camera">
            <CameraPage homeCurrency={homeCurrency} />
          </Route>
          <Route path="/result/:lat/:lng/:photoPath">
            <ResultPage homeCurrency={homeCurrency} />
          </Route>
          <Route path="/settings">
            <SettingsPage 
              homeCurrency={homeCurrency} 
              setHomeCurrency={setHomeCurrency} 
            />
          </Route>
          <Route exact path="/">
            <Redirect to="/camera" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
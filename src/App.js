import React, { Component } from 'react';
import { IonApp } from '@ionic/react';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import AppStack from "./pages/AppStack";

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return <Router>
      <div id="app">
        <IonApp>
            <Route path="/" component={AppStack} />
        </IonApp>
      </div>
		</Router>
  }
}

export default App;

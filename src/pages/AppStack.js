import React, { Component } from 'react';
import { IonIcon, IonLabel, IonRouterOutlet, IonPage } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import LandingPage from './LandingPage';
import SignUpPage from './SignUpPage';
import FeedPage from './FeedPage';
import OfferPage from './OfferPage';

class AppStack extends Component {
	render() {
		if(this.loggedIn()) {
			return <IonPage>
					<Route exact path="/" render={() => <Redirect to="/feed"/>}/>
					<Route exact path="/sign-up" render={() => <Redirect to="/feed"/>} />
					<Route exact path="/landing" render={() => <Redirect to="/feed"/>} />
					
					<Route exact path="/feed" component={FeedPage} />
					<Route exact={false} path="/new-offer/:value/:title" component={OfferPage} />
					<Route exact path="/edit-offer" component={OfferPage} />
			  </IonPage>
		} else {
			return <IonPage>
			    <Route exact path="/" render={() => <Redirect to="/landing"/>}/>
					<Route exact path="/feed" render={() => <Redirect to="/landing"/>}/>
					<Route exact path="/new-offer" render={() => <Redirect to="/landing"/>}/>
					<Route exact path="/edit-offer" render={() => <Redirect to="/landing"/>}/>
			
					<Route exact path="/landing" component={LandingPage} />
					<Route exact path="/sign-up" component={SignUpPage} />
			  </IonPage>
		}
	}
	
	loggedIn() {
		var token = localStorage.getItem('token') || '';
		return token.length > 0 && typeof token !== undefined && token !== null && token !== '' && token !== 'null';
	}
}

export default AppStack;
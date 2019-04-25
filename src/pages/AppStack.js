import React, { Component } from 'react';
import { IonTabs, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonPage } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import LandingPage from './LandingPage';
import SignUpPage from './SignUpPage';
import FeedPage from './FeedPage';
import OfferPage from './OfferPage';

class AppStack extends Component {
	render() {
		// logged in
		var token = localStorage.getItem('token') || '';
		if(token.length == 0) {
			return <IonPage>
					<Route exact path="/" render={() => <Redirect to="/landing"/>}/>
					{ this.renderRoutesAndComponents() }
			  </IonPage>
		} else {
			return <IonPage>
			    <Route exact path="/" render={() => <Redirect to="/feed"/>}/>
			    { this.renderRoutesAndComponents() }
			  </IonPage>
		}
	}
	
	renderRoutesAndComponents() {
		return <IonRouterOutlet>
			<Route path="/:tab(landing)" component={LandingPage} exact={true} />
			<Route path="/:tab(sign-up)" component={SignUpPage} exact={true} />
			<Route path="/:tab(feed)" component={FeedPage} exact={true} />
			<Route path="/:tab(new-offer)" component={OfferPage} exact={true} />
			<Route path="/:tab(edit-offer)" component={OfferPage} exact={true} />
		</IonRouterOutlet>;
	}
}

export default AppStack;
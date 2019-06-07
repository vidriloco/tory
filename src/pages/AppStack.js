import React, { Component } from 'react';
import { IonIcon, IonLabel, IonRouterOutlet, IonPage, IonTabs, IonTabBar, IonTabButton } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import LandingPage from './LandingPage';
import SignUpPage from './SignUpPage';
import DiscoverPage from './DiscoverPage';
import OfferPage from './OfferPage';
import ProfilePage from './ProfilePage';
import OfferFormPage from './OfferFormPage';
import CampaignHelpPage from './CampaignHelpPage';

class AppStack extends Component {
	render() {
		if(this.loggedIn()) {
			return <IonPage>
					<Route exact path="/" render={() => <Redirect to="/offer"/>}/>
					<Route exact path="/sign-up" render={() => <Redirect to="/feed"/>} />
					<Route exact path="/landing" render={() => <Redirect to="/feed"/>} />
                    <Route exact path="/campaign" render={() => <Redirect to="/feed"/>} />
                    <Route exact path="/campaign-help" render={() => <Redirect to="/feed"/>} />
					<IonTabs>
						<IonRouterOutlet>
							<Route exact path="/discover" component={DiscoverPage} />
							<Route exact={false} path="/new-offer" component={OfferFormPage} />
							<Route path="/offer" component={OfferPage} />
							<Route exact path="/profile" component={ProfilePage} />
						</IonRouterOutlet>
						<IonTabBar slot="bottom">
							<IonTabButton tab="discover" href="/discover">
								<IonIcon name="search" />
								<IonLabel>Descubre</IonLabel>
							</IonTabButton>
							<IonTabButton tab="offer" href="/offer">
								<IonIcon name="add" />
								<IonLabel>Nuevo</IonLabel>
							</IonTabButton>
							<IonTabButton tab="profile" href="/profile">
								<IonIcon name="contact" />
								<IonLabel>Tú perfil</IonLabel>
							</IonTabButton>
						</IonTabBar>
					</IonTabs>
			  </IonPage>
		} else {
			return <IonPage>
			    <Route exact path="/" render={() => <Redirect to="/landing"/>}/>
					<Route exact path="/feed" render={() => <Redirect to="/landing"/>}/>
					<Route exact path="/new-offer" render={() => <Redirect to="/landing"/>}/>
					<Route exact path="/edit-offer" render={() => <Redirect to="/landing"/>}/>
			
					<Route exact path="/landing" component={LandingPage} />
                    <Route exact path="/campaign" component={LandingPage} />
                    <Route exact path="/campaign-help" component={CampaignHelpPage} />
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
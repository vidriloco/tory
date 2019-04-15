import React, { Component } from 'react';
import { IonTabs, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonPage } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import LandingPage from './LandingPage';
import SignUpPage from './SignUpPage';

class AppStack extends Component {
	render() {
		// logged in
		if(false) {
			return <IonPage>
			    <Route exact path="/" render={() => <Redirect to="/landing"/>}/>
			    {
			    /**
			     * Only render exact matches.  Only destroy on back button click
			     * On history.push keep previous route stored for back button
			     *
			     * TabBar does a push on iontabbutton click.
			     * TabBar updates the tab links based on the current route path.
			     */
			    }

			    <IonTabs>
						{ this.renderRoutesAndComponents() }
			      <IonTabBar slot="bottom">
			        <IonTabButton tab="fishes" href="/">
			          <IonIcon name="sunny" />
			          <IonLabel>Our Fish</IonLabel>
			        </IonTabButton>
			        <IonTabButton tab="branches" href="/sign-up">
			          <IonIcon name="planet" />
			          <IonLabel>Branches</IonLabel>
			        </IonTabButton>
			        <IonTabButton tab="map" href="/map">
			          <IonIcon name="map" />
			          <IonLabel>Map</IonLabel>
			        </IonTabButton>
			        <IonTabButton tab="about" href="/about">
			          <IonIcon name="information-circle" />
			          <IonLabel>About</IonLabel>
			        </IonTabButton>
			      </IonTabBar>
			    </IonTabs>
			  </IonPage>
		} else {
			return <IonPage>
			    <Route exact path="/"/>
			    {
			    /**
			     * Only render exact matches.  Only destroy on back button click
			     * On history.push keep previous route stored for back button
			     *
			     * TabBar does a push on iontabbutton click.
			     * TabBar updates the tab links based on the current route path.
			     */
			    }
			    { this.renderRoutesAndComponents() }
			  </IonPage>
		}
	}
	
	renderRoutesAndComponents() {
		return <IonRouterOutlet>
			<Route path="/:tab(landing)" component={LandingPage} exact={true} />
			<Route path="/:tab(sign-up)" component={SignUpPage} exact={true} />
		</IonRouterOutlet>;
	}
}

export default AppStack;
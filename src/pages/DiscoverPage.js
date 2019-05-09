import React, { Component } from 'react';
import { IonContent, IonCard } from '@ionic/react';
import logo from '../recyclo-logo.svg';

class DiscoverPage extends Component {
	
	render() {
		return <IonContent>
			<div>
				<IonCard>
					<img src={logo} className="App-logo" alt="logo" />
				</IonCard>
			</div>
		</IonContent>
	}
}

export default DiscoverPage;
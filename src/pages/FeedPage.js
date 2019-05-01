import React, { Component } from 'react';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonChip } from '@ionic/react';
import logo from '../recyclo-logo.svg';
import Backend from '../Backend';

class FeedPage extends Component {
	
	constructor(props) {
		super(props);
	}
	
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

export default FeedPage;
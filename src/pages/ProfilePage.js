import React, { Component } from 'react';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonChip } from '@ionic/react';
import logo from '../recyclo-logo.svg';
import Backend from '../Backend';

class ProfilePage extends Component {
	
	constructor(props) {
		super(props);
		
		this.logout = this.logout.bind(this);
	}
	
	userOffers() {
		return <div>
			<h4 className="ion-text-center">Lo que has ofertado</h4>
    		<IonCard>					
    			<IonCardContent>
    				<IonList>
    		      <IonItem>
    		        <IonLabel text-wrap>
    		          Latas - 5 kilos
    		        </IonLabel>
    		      </IonItem>
    					<IonItem>
    		        <IonLabel text-wrap>
    							Te contactaremos en breve para coordinar la recolección de tus reciclables.
    		        </IonLabel>
    		      </IonItem>
    					<IonItem>
    						<IonChip color="primary" className="ion-color ion-color-primary ion-activatable hydrated">
    		          <IonLabel className="sc-ion-label-ios-h sc-ion-label-ios-s hydrated">
    								<ion-icon name="hourglass"></ion-icon> En revisión
    							</IonLabel>
    		        </IonChip>
    						<IonButton color="warning" href="/edit-offer/1"><ion-icon name="create"></ion-icon></IonButton>
    						<IonButton color="danger"><ion-icon name="trash"></ion-icon></IonButton>
    					</IonItem>
    				</IonList>
			
    			</IonCardContent>
        	</IonCard>
    		<IonCard>					
    			<IonCardContent>
    				<IonList>
    		      <IonItem>
    		        <IonLabel text-wrap>
    		          Latas - 10 bolsas
    		        </IonLabel>
    		      </IonItem>
    					<IonItem>
    		        <IonLabel text-wrap>
    							Recolectado hace 2 semanas, gracias!
    		        </IonLabel>
    		      </IonItem>
    					<IonItem>
    						<IonChip color="success" className="ion-color ion-color-primary ion-activatable hydrated">
    		          <ion-icon name="checkmark"></ion-icon> <IonLabel className="sc-ion-label-ios-h sc-ion-label-ios-s hydrated">Recolectado</IonLabel>
    		        </IonChip>
    					</IonItem>
    				</IonList>
			
    			</IonCardContent>
    	    </IonCard>
		</div>
	}
    
	logout() {
		localStorage.setItem('token', '');
		this.props.history.push("/");
	}
    
	renderLogoutButton() {
	    return <div className="ion-padding">
			<IonButton color="dark" size="small" onClick={this.logout}>Cerrar Sesión</IonButton>
		</div>
	}

	render() {
		return <IonContent>
			<div>
				<IonCard>
					<img src={logo} className="App-logo" alt="logo" />
				</IonCard>
			</div>
			{ this.userOffers() }
            { this.renderLogoutButton() }
		</IonContent>
	}
}

export default ProfilePage;
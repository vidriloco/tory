import React, { Component } from 'react';
import { IonIcon, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonChip } from '@ionic/react';
import logo from '../recyclo-logo.svg';
import Backend from '../Backend';

class ProfilePage extends Component {
	
	constructor(props) {
		super(props);
		
		this.logout = this.logout.bind(this);
	}
	
	renderUserActivity() {
		return <IonCard>					
                <IonCardHeader>
                	<IonCardTitle><h4 className="ion-text-center page-title no-vertical-padding">Lo que has ofertado</h4></IonCardTitle>
                </IonCardHeader>
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
	}
    
	logout() {
		localStorage.setItem('token', '');
		this.props.history.push("/");
	}
    
    editUserProfile() {
        
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
            { this.renderUserProfile() }
			{ this.renderUserActivity() }
            { this.renderLogoutButton() }
		</IonContent>
	}
    
    renderUserProfile() {
        return <div className="ion-text-center user-profile">
            <img src="https://media.giphy.com/media/12QMzVeF4QsqTC/giphy.gif" className="user-profile-image" />
            <h2 className="page-title no-vertical-padding">Alejandro Cruz</h2>
            <p className="page-title no-vertical-padding">@vidriloco</p>
            <IonChip color="primary" outline="primary" onClick={ this.editUserProfile.bind(this) }>
                <IonIcon name="create" />
                <IonLabel>Editar</IonLabel>
            </IonChip>
        </div>
    }
}

export default ProfilePage;
import React, { Component } from 'react';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import logo from '../recyclo-logo.svg';

class OfferPage extends Component {
	
	constructor(props) {
		super(props);

		this.state = { 
			material: { value: props.match.params.value, title: props.match.params.title }
		};
	}
	
	renderTypes() {
		return <IonItem>
        <IonLabel>Unidades</IonLabel>
        <IonSelect interface="action-sheet" placeholder="Seleccionar">
          <IonSelectOption value="bags">Bolsas</IonSelectOption>
          <IonSelectOption value="units">Piezas</IonSelectOption>
          <IonSelectOption value="kgs">Kilos</IonSelectOption>
        </IonSelect>
      </IonItem>
	}
	
	renderAvailableAreas() {
		return <IonItem>
        <IonLabel>Zona</IonLabel>
        <IonSelect interface="action-sheet" placeholder="Seleccionar">
          <IonSelectOption value="roma-norte">Roma Norte</IonSelectOption>
          <IonSelectOption value="roma-sur">Roma Sur</IonSelectOption>
          <IonSelectOption value="condesa">Condesa</IonSelectOption>
        </IonSelect>
      </IonItem>
	}
	
	renderOfferForm() {
		return <div>
				<IonCard>
					<img src={logo} className="App-logo" alt="logo" />
				</IonCard>
				<IonCard>					
	      	<IonCardHeader>
	        	<IonCardTitle><p className="ion-text-center">Ofrecer { this.state.material.title }</p></IonCardTitle>
	      	</IonCardHeader>

					<IonCardContent>
						{ this.renderTypes() }
						<ion-input placeholder="Cantidad" type="number"></ion-input>			
					</IonCardContent>
						
					<IonCardContent>
						<ion-label>Selecciona la zona donde podemos recoger los reciclables</ion-label>
						{ this.renderAvailableAreas() }
						<p className="fieldNote">Por ahora estamos operando en estas zonas únicamente. Te contactaremos para acordar hora y dirección para recolectar los reciclables.</p>
					</IonCardContent>
						
					<IonCardContent>
						<IonButton expand="block">Publicar</IonButton>
					</IonCardContent>
	    	</IonCard>
			</div>
	}
	
	renderBackForm() {
		return <IonContent className="ion-padding">
				<IonButton color="dark" size="small" href="/feed"><ion-icon name="arrow-back"></ion-icon> Atrás</IonButton>
			</IonContent>
	}
	
  render() {
    return <IonContent>
		 { this.renderOfferForm() }
		 { this.renderBackForm() }
		</IonContent>
  }
}

export default OfferPage;
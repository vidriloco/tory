import React, { Component } from 'react';
import { IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import HeaderComponent from '../components/HeaderComponent'

class EditOfferPage extends Component {
	
	renderTypes() {
		return <IonItem>
        <IonLabel>Unidades</IonLabel>
        <IonSelect interface="action-sheet" placeholder="Seleccionar">
          <IonSelectOption value="bags">Bolsas</IonSelectOption>
          <IonSelectOption value="units">Latas</IonSelectOption>
          <IonSelectOption value="kgs">Kilos</IonSelectOption>
        </IonSelect>
      </IonItem>
	}
	
	renderAvailableAreas() {
		return <IonItem>
        <IonLabel>Zonas</IonLabel>
        <IonSelect interface="action-sheet" placeholder="Seleccionar">
          <IonSelectOption value="roma-norte">Roma Norte</IonSelectOption>
          <IonSelectOption value="roma-sur">Roma Sur</IonSelectOption>
          <IonSelectOption value="condesa">Condesa</IonSelectOption>
        </IonSelect>
      </IonItem>
	}
	
	renderOfferForm() {
		return <div>
				<HeaderComponent/>
				<IonCard>					
	      	<IonCardHeader>
	        	<IonCardTitle><p className="ion-text-center">Ofrecer latas</p></IonCardTitle>
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

export default EditOfferPage;
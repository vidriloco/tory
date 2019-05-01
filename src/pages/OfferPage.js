import React, { Component } from 'react';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonInput } from '@ionic/react';
import logo from '../recyclo-logo.svg';
import Backend from '../Backend';

class OfferPage extends Component {
	
	constructor(props) {
		super(props);

		this.updateField = this.updateField.bind(this);

		this.state = { quantity: null, zone: null, units: null };
		
		this.publishOffer = this.publishOffer.bind(this);
	}
	
	componentWillMount() {
		this.fetchMaterialTypes();
	}
	
	fetchMaterialTypes() {
		var result = fetch(Backend.materials('list'), {
			headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer '.concat(localStorage.getItem('token'))
        }
    })
		.then(response => {
        if (!response.ok) { throw response }
        return response.json();
    })
		.then(json => {
			this.setState({ materials: json.materials });
    })
		.catch(error => {
			error.json().then(jsonError => {
	      alert(jsonError.error);
	    })
    });
	}
	
	renderOfferPrompt() {
		const materialItems = this.state.materials.filter((material) => material.enabled).map((material) => 
		<IonButton key={ material.value } expand="block" href={ "/new-offer/".concat(material.value).concat("/").concat(material.humanized) }>{ material.humanized }</IonButton>);
				
		return <div>
			<IonCard>
				<img src={logo} className="App-logo" alt="logo" />
			</IonCard>
			<IonCard>					
				<IonCardHeader>
			  	<IonCardTitle><p className="ion-text-center">Ofrecer en Recyclo</p></IonCardTitle>
				</IonCardHeader>
		
				<IonCardContent>
					{ materialItems }
				</IonCardContent>
			</IonCard>
		</div>
	}
	
	renderTypes() {
		return <IonItem>
        <IonLabel>Unidades</IonLabel>
        <IonSelect id="units" interface="action-sheet" placeholder="Seleccionar" value={this.state.units} onIonChange={this.updateField}>
          <IonSelectOption value="bags">Bolsas</IonSelectOption>
          <IonSelectOption value="pieces">Piezas</IonSelectOption>
          <IonSelectOption value="kgs">Kilos</IonSelectOption>
        </IonSelect>
      </IonItem>
	}
	
	renderAvailableAreas() {
		return <IonItem>
        <IonLabel>Zona</IonLabel>
        <IonSelect id="zone" interface="action-sheet" placeholder="Seleccionar" value={this.state.zone} onIonChange={this.updateField}>
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
	        	<IonCardTitle><p className="ion-text-center">Ofrecer</p></IonCardTitle>
	      	</IonCardHeader>

					<IonCardContent>
						<IonInput id="quantity" placeholder="Cantidad" type="number" value={this.state.quantity} onIonChange={this.updateField}></IonInput>
						{ this.renderTypes() }
					</IonCardContent>
						
					<IonCardContent>
						<IonLabel>Selecciona la zona donde podemos recoger los reciclables</IonLabel>
						{ this.renderAvailableAreas() }
						<p className="fieldNote">Por ahora estamos operando en estas zonas únicamente. Te contactaremos para acordar hora y dirección para recolectar los reciclables.</p>
					</IonCardContent>
						
					<IonCardContent>
						<IonButton expand="block" onClick={this.publishOffer}>Publicar</IonButton>
					</IonCardContent>
	    	</IonCard>
			</div>
	}
	
  render() {
    return <IonContent>
		 { this.renderOfferForm() }
		</IonContent>
  }
	
	publishOffer() {
		const data = { 
			offer: { 
				quantity: this.state.quantity, 
				units: this.state.units, 
				zone: this.state.zone, 
				material: this.state.material.value 
			}};
				
		var result = fetch(Backend.offers('create'), {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer '.concat(localStorage.getItem('token'))
        }
    })
		.then(response => {
        if (!response.ok) { throw response }
        return response.json();
    })
		.then(json => {
			alert(json.message);
			this.props.history.push("/feed");
    })
		.catch(error => {
			error.json().then(jsonError => {
	      alert(jsonError.error);
	    })
    });
	}
	
	updateField(event) {
		var newState = {};
		newState[event.target.id] = event.target.value;
		this.setState(newState);
	}
}

export default OfferPage;
import React, { Component } from 'react';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonItem, IonSelect, IonSelectOption, IonInput, IonSlides, IonSlide, IonChip, IonLabel } from '@ionic/react';
import logo from '../recyclo-logo.svg';
import Backend from '../Backend';

class OfferPage extends Component {
	
	constructor(props) {
		super(props);

		this.state = { quantity: null, zone: null, units: null, materials: [], enabledMaterialIndex: 0, material: { humanized: "Lata", value: "aluminium-can" } };
		
		this.publishOffer = this.publishOffer.bind(this);
		this.updateField = this.updateField.bind(this);
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
		return <div>
			<IonCard>
				<img src={logo} className="App-logo" alt="logo" />
			</IonCard>
			<IonCard>					
      	<IonCardHeader>
        	<IonCardTitle><h2 className="page-title no-vertical-padding">Nuevo reciclable</h2></IonCardTitle>
					<p className="page-subtitle no-vertical-padding">Selecciona el tipo de reciclable que vas a ofrecer.</p>
      	</IonCardHeader>
				{ this.renderSlider() }
			</IonCard>
			{ this.renderOfferButton() }
		</div>
	}
	
	renderOfferButton() {
		const selectedMaterialIndex = this.state.enabledMaterialIndex;
		const material = this.state.materials[selectedMaterialIndex];
		
		var url = null;
		var button = <IonButton expand="block" href={ url }>Ofrecer</IonButton>;
		
		if(typeof material !== "undefined") {
			url = "/new-offer/".concat(material.value).concat("/").concat(material.humanized);
			
			if(material.enabled) {
				return <div className="ion-padding">
					<IonButton expand="block" href={ url }>Ofrecer</IonButton>
				</div>;
			} else {
				return <div className="ion-padding">
					<IonButton expand="block" color="medium">Ofrecer</IonButton>
					<p className="fieldNote">Lo sentimos, pero aún no estamos recibiendo este tipo de material</p>
				</div>;
			}
		}
	}
	
	renderSlider() {
		if(this.state.materials.length == 0) {
			return 
		}
		
		const materials = this.state.materials.map((material, index) => {
			var classNameForMaterial = "slide-item-image";
			if(!material.enabled) {
				classNameForMaterial += " disabled-item";
			}
      return <IonSlide key={index}>
				<div className="slide-item-margin">
					<img alt="" className={ classNameForMaterial } src={ material.image } />
					<h1 className="slide-item-title">{ material.humanized }</h1>
				</div>
			</IonSlide>
    })
		
		const thisObject = this;
		return <IonSlides pager={true} onIonSlideTransitionEnd={ this.onSlideTransitionEnd.bind(this, thisObject) }>
			{ materials }
	  </IonSlides>
	}
	
	onSlideTransitionEnd(stateRef, slider) {
		slider.target.getActiveIndex().then(function(index) {
			stateRef.setState({ enabledMaterialIndex: index });
		});
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
	        	<IonCardTitle><h2 className="page-title no-vertical-padding">Nuevo reciclable</h2></IonCardTitle>
						<p className="page-subtitle no-vertical-padding">Para empezar, selecciona un tipo de reciclable.</p>
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
		 { this.renderOfferPrompt() }
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
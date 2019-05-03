import React, { Component } from 'react';
import { IonModal, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonItem, IonSelect, IonSelectOption, IonInput, IonSlides, IonSlide, IonChip, IonLabel } from '@ionic/react';
import logo from '../recyclo-logo.svg';
import Backend from '../Backend';
import OfferFormPage from './OfferFormPage';

class OfferPage extends Component {
	
	constructor(props) {
		super(props);

		this.state = { materials: [], enabledMaterialIndex: 0, material: { }, showModal: false };
		
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
				
		if(typeof material !== "undefined") {
			
			if(material.enabled) {
				return <div className="ion-padding">
					<IonButton expand="block" onClick={() => this.setState(() => ({ showModal: true }))}>Ofrecer</IonButton>
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
	
  render() {		
		const selectedMaterialIndex = this.state.enabledMaterialIndex;
		const material = this.state.materials[selectedMaterialIndex];
		
		var materialDetails = {};
		if(typeof material !== "undefined") {
			materialDetails = { value: material.value, title: material.humanized };
		}
		
    return <IonContent>
		<IonModal isOpen={this.state.showModal}
		          onDidDismiss={() => this.setState(() => ({ showModal: false }))}>
			<IonContent>
			    <OfferFormPage material={ materialDetails } dismiss={ this.dismissNewOfferForm.bind(this) }/>
			</IonContent>
		</IonModal>
		 { this.renderOfferPrompt() }
		</IonContent>
  }
	
	dismissNewOfferForm() {
		this.setState({ showModal: false });
	}
	
	updateField(event) {
		var newState = {};
		newState[event.target.id] = event.target.value;
		this.setState(newState);
	}
}

export default OfferPage;
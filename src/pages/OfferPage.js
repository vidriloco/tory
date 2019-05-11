import React, { Component } from 'react';
import { IonModal, IonContent, IonCard, IonCardHeader, IonCardTitle, IonButton, IonSlides, IonSlide } from '@ionic/react';
import logo from '../recyclo-logo.svg';
import Backend from '../Backend';
import OfferFormPage from './OfferFormPage';

class OfferPage extends Component {
	
	constructor(props) {
		super(props);

		this.state = { materials: [], enabledMaterialIndex: 0, material: { }, showModal: false };
		
		this.updateField = this.updateField.bind(this);
		this.fetchMaterialTypes = this.fetchMaterialTypes.bind(this);
        
        // Nasty hack to make sure this function is called when the view becomes visible
        this.props.history.listen((location, action) => {
            if(location.pathname === "/offer") {
        		this.fetchMaterialTypes();
            }
        });
	}
	
	componentDidMount() {
		this.fetchMaterialTypes();
	}
	
	fetchMaterialTypes() {
        fetch(Backend.materials('list'), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '.concat(localStorage.getItem('token'))
            }
        }).then(response => {
        if (!response.ok) { throw response }
            return response.json();
        }).then(json => {
            this.setState({ materials: json.materials });
        }).catch(error => {
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
			
            var button = <IonButton expand="block" onClick={() => this.setState(() => ({ showModal: true }))}>Ofrecer</IonButton>;
            var messageForNotAllowedMaterial = null;
            
			if(!material.enabled) {
                button = <IonButton expand="block" color="medium">Ofrecer</IonButton>;
                messageForNotAllowedMaterial = <p className="ion-text-center">Uy, aún no estamos recibiendo este tipo de reciclable :(</p>;
			} 
            
			return <div className="ion-padding">
                { messageForNotAllowedMaterial }
                { button }
			</div>;
		}
	}
	
	renderSlider() {
		if(this.state.materials.length === 0) {
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
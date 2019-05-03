import React, { Component } from 'react';
import { IonIcon, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonItem, IonSelect, IonSelectOption, IonInput, IonSlides, IonSlide, IonChip, IonLabel } from '@ionic/react';
import logo from '../recyclo-logo.svg';
import progressHalfImage from '../progress-bg-1.svg';
import progressFullImage from '../progress-bg-2.svg';
import Backend from '../Backend';

class OfferFormPage extends Component {
	
	constructor(props) {
		super(props);

        const zones = [
            { value: "roma-norte", title: "Roma Norte"},
            { value: "roma-sur", title: "Roma Sur"},
            { value: "condesa", title: "Condesa"},
            { value: "juarez", title: "Juárez"},
            { value: "cuauhtemoc", title: "Cuauhtemoc"}
        ]
        
		this.state = { quantity: null, zone: null, units: null, currentStep: 0, zones: zones};
		
		this.publishOffer = this.publishOffer.bind(this);
		this.updateField = this.updateField.bind(this);
	}
	
    render() {
        return <IonContent>
            { this.renderHeader() }
            { this.renderOfferForm() }
            <div className="ion-padding">
                <IonButton expand="block" color="dark" onClick={ this.props.dismiss }>Cancelar</IonButton>
    		</div>
        </IonContent>
    }
    
    renderHeader() {
        return <div>
    		<IonCard>
    			<img src={logo} className="App-logo" alt="logo" />
    		</IonCard>
            <div className="ion-text-end ion-padding-end">
                { this.renderHeaderButtons() }
            </div>
        </div>
    }
    
    renderHeaderButtons() {
        if(this.state.currentStep == 0) {
            if(this.isMaterialPickupZoneValid()) {
                return <IonChip color="primary" outline="primary" onClick={ () => { this.setState({ currentStep: 1 }) } }>
                  <IonLabel>Siguiente</IonLabel>
                  <IonIcon name="arrow-round-forward" />
                </IonChip>
            } else {
                return <IonChip outline="primary">
                  <IonLabel>Llena los campos abajo para continuar</IonLabel>
                </IonChip>
            }
        } else {
            
            var nextButton = <IonChip color="success" outline="success" onClick={ this.publishOffer }>
              <IonLabel>Publicar</IonLabel>
              <IonIcon name="checkmark" />
            </IonChip>;
            
            if(!this.isMaterialTypeFormValid()) {
                nextButton = <IonChip outline="primary">
                  <IonLabel>Tienes campos pendientes por llenar</IonLabel>
                </IonChip>;
            }
            
            return <div>
                <IonChip color="secondary" outline="secondary" onClick={ () => { this.setState({ currentStep: 0 }) } }>
                  <IonIcon name="arrow-round-back" />
                  <IonLabel>Atrás</IonLabel>
                </IonChip>
                { nextButton }
            </div>
        }
    }
    
    renderOfferForm() {
        if(this.state.currentStep == 1) {
            return this.renderMaterialTypeForm();
        } else {
            return this.renderMaterialPickupZone();
        }
    }
    
	renderPresentationCount() {

		return <IonItem>
            <IonLabel>Unidades</IonLabel>
            <IonSelect id="units" interface="action-sheet" placeholder="Seleccionar" value={this.state.units} onIonChange={this.updateField}>
                <IonSelectOption value="bags">Bolsas</IonSelectOption>
                <IonSelectOption value="pieces">Piezas</IonSelectOption>
                <IonSelectOption value="kilos">Kilos</IonSelectOption>
            </IonSelect>
        </IonItem>
	}
	
	renderAvailableAreas() {
		const zones = this.state.zones.map((zone, index) => {
            return <IonSelectOption key={index} value={ zone.value }>{ zone.title }</IonSelectOption>
        })
    
		return <IonItem>
        <IonLabel>Zona</IonLabel>
        <IonSelect id="zone" interface="action-sheet" placeholder="Seleccionar" value={this.state.zone} onIonChange={this.updateField}>
            { zones }
        </IonSelect>
      </IonItem>
	}
    
    isMaterialTypeFormValid() {
        return this.state.quantity !== null && this.state.units !== null && this.state.quantity > 0;
    }
    
	renderMaterialTypeForm() {
		return <IonCard>	
            { this.renderProgressImage() }
          	<IonCardHeader>
                <IonCardSubtitle>CANTIDAD Y PRESENTACION</IonCardSubtitle>
            	<IonCardTitle><h2>Ofertar { this.props.material.title }</h2></IonCardTitle>
          	</IonCardHeader>
    	
        	<IonCardContent>
    			<p className="page-subtitle no-vertical-padding">Selecciona una unidad de medida para contar este reciclable (ej: bolsas, kilos)</p>
                { this.renderPresentationCount() }
        	</IonCardContent>
    
          	<IonCardHeader>
    			<p className="page-subtitle no-vertical-padding">Selecciona el número, según el paso previo (ej: 5 bolsas, 40 latas)</p>
          	</IonCardHeader>
                
			<IonCardContent>
				<IonInput id="quantity" placeholder="Cantidad" type="number" value={this.state.quantity} onIonChange={this.updateField}></IonInput>
			</IonCardContent>
                
			{ this.renderCurrentStep() }
	    </IonCard>
	}
    
    isMaterialPickupZoneValid() {
        return this.state.zone !== null;
    }
    
    renderMaterialPickupZone() {
        return <IonCard>
            { this.renderProgressImage() }
          	<IonCardHeader>
                <IonCardSubtitle>PUNTO DE RECOLECCION</IonCardSubtitle>
            	<IonCardTitle><h2>Ofertar { this.props.material.title }</h2></IonCardTitle>
          	</IonCardHeader>

        	<IonCardContent>
        		<p className="page-subtitle no-vertical-padding">Recoger los reciclables en</p>
        		{ this.renderAvailableAreas() }
        		<p className="fieldNote">Por ahora estamos operando en estas zonas únicamente. Te contactaremos para acordar hora y dirección para recolectar los reciclables.</p>
        	</IonCardContent>
                
            { this.renderCurrentStep() }
        </IonCard>
    }
    
    renderProgressImage() {
        if(this.state.currentStep == 0) {
            return <img src={ progressHalfImage } />;
        } else {
            return <img src={ progressFullImage } />;
        }
    }
    
    renderCurrentStep() {
        return <IonCardContent>
                <h2 className="ion-text-center"><b>Paso { this.state.currentStep+1 } de 2</b></h2>
			</IonCardContent>
    }
	
	publishOffer() {
        
		const data = { 
			offer: { 
				quantity: this.state.quantity, 
				units: this.state.units, 
				zone: this.state.zone, 
				material: this.props.material.value 
			}};
				
		var result = fetch(Backend.offers('create'), {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '.concat(localStorage.getItem('token'))
        }})
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

export default OfferFormPage;
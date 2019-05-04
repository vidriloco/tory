import React, { Component } from 'react';
import { IonAlert, IonIcon, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonItem, IonSelect, IonSelectOption, IonInput, IonSlides, IonSlide, IonChip, IonLabel } from '@ionic/react';

import logo from '../recyclo-logo.svg';
import progressHalfImage from '../progress-bg-1.svg';
import progressFullImage from '../progress-bg-2.svg';
import pin from '../recyclo-map-pin.svg';

import Backend from '../Backend';
import Autocomplete from 'react-google-autocomplete';
import GoogleMapReact from 'google-map-react';

class OfferFormPage extends Component {
	
	constructor(props) {
		super(props);

        const zones = [
            { value: "roma-norte", title: "Roma Norte"},
            { value: "roma-sur", title: "Roma Sur"},
            { value: "condesa", title: "Condesa"},
            { value: "juarez", title: "Juárez"},
            { value: "cuauhtemoc", title: "Cuauhtemoc"},
            { value: "other", title: "Otra zona"}
        ]
        
		this.state = { place: null, quantity: null, zone: null, units: null, currentStep: 0, zones: zones, alertShownForCancellation: false };
		
		this.publishOffer = this.publishOffer.bind(this);
		this.updateField = this.updateField.bind(this);
        this.resetFormState = this.resetFormState.bind(this);
        this.showCancelOfferAlert = this.showCancelOfferAlert.bind(this);
	}
	
    render() {
        return <IonContent>
            { this.renderCancelAlertDialog() }
            { this.renderHeader() }
            { this.renderOfferForm() }
            { this.renderBottomButtons() }
        </IonContent>
    }
    
    renderCancelAlertDialog() {
        return <IonAlert
            isOpen={this.state.alertShownForCancellation}
            onDidDismiss={() => this.setState(() => ({ alertShownForCancellation: false }))}
            header={'Pregunta'}
            subHeader={'Deseas descartar los cambios?'}
            message={'Toda la información de este reciclable se va a perder'}
            buttons={[
              {
                text: 'Cancelar',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                    this.setState({ alertShownForCancellation: false });
                }
              }, {
                text: 'Aceptar',
                handler: () => {
                    this.resetFormState();
                }
              }
            ]} />
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
    
    renderBottomButtons() {
        if(this.state.currentStep == 0) {
            var nextButton = <IonButton expand="block" color="medium">Siguiente</IonButton>;
            
            
            if(this.isMaterialPickupZoneValid() && this.isMaterialPickupAddressGiven()) {
                nextButton = <IonButton expand="block" color="primary" onClick={ this.goNext.bind(this) }>Siguiente</IonButton>;
            }
            
            return <div className="ion-padding">
                { nextButton }
                <IonButton expand="block" color="dark" onClick={ this.showCancelOfferAlert }>Cancelar</IonButton>
    		</div>
        } else {
            var publishButton = <IonButton expand="block" color="medium">Publicar</IonButton>;
            
            if(this.isMaterialTypeFormValid()) {
                publishButton = <IonButton expand="block" color="primary" onClick={ this.publishOffer }>Publicar</IonButton>;
            }
            
            return <div className="ion-padding">
                { publishButton }
                <IonButton expand="block" color="dark" onClick={ this.showCancelOfferAlert }>Cancelar</IonButton>
    		</div>
        }
    }
    
    renderHeaderButtons() {
        if(this.state.currentStep == 0) {
            if(this.isMaterialPickupZoneValid() && this.isMaterialPickupAddressGiven()) {
                return <IonChip color="primary" outline="primary" onClick={ this.goNext.bind(this) }>
                  <IonLabel>Siguiente</IonLabel>
                  <IonIcon name="arrow-round-forward" />
                </IonChip>
            } else {
                return <IonChip outline="primary">
                  <IonLabel>Llena los campos abajo para continuar</IonLabel>
                </IonChip>
            }
        } else {
            
            var nextButton = <IonChip color="primary" outline="primary" onClick={ this.publishOffer }>
              <IonLabel>Publicar</IonLabel>
              <IonIcon name="checkmark" />
            </IonChip>;
            
            if(!this.isMaterialTypeFormValid()) {
                nextButton = <IonChip outline="primary">
                  <IonLabel>Publicar</IonLabel>
                </IonChip>;
            }
            
            return <div>
                <IonChip color="secondary" outline="secondary" onClick={ this.goPrevious.bind(this) }>
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
    
    renderMaterialPickupZone() {
        
        var legend = null;
        var mapFields = null;
        
        if(this.state.zone === "other") {
            legend =  <p className="fieldNote">Por ahora estamos operando únicamente en las zonas propuestas. Te avisaremos cuando ampliemos las zonas de servicio.</p>;
        } else if(this.isMaterialPickupZoneValid()) {
            mapFields = this.renderMapFields();
        }
        
        return <IonCard>
            { this.renderProgressImage() }
          	<IonCardHeader>
                <IonCardSubtitle>PUNTO DE RECOLECCION</IonCardSubtitle>
            	<IonCardTitle><h2>Ofertar { this.props.material.title }</h2></IonCardTitle>
          	</IonCardHeader>

        	<IonCardContent>
        		<p className="page-subtitle no-vertical-padding">Recoger los reciclables en</p>
        		{ this.renderAvailableAreas() }
                { legend }
        	</IonCardContent>
            { mapFields }
            { this.renderCurrentStep() }
        </IonCard>
    }
    
    renderMapFields() {
        var address = "";
        if(this.state.place !== null && typeof this.state.place !== "undefined") {
            address = this.state.place.formatted_address;
        }
        
        return <IonCardContent>
    		<p className="page-subtitle no-vertical-padding">Escribe y selecciona la calle donde podemos recoger los reciclables</p>
            <Autocomplete
                defaultValue={ address }
                onChange={ (event) => { 
                    if(event.target.value.length == 0) {
                        this.setState({ place: null });
                    }
                }}
                style={{width: '100%'}}
                onPlaceSelected={(place) => {
                    console.log(place);
                    this.setState({ place: place });
                }}
                types={[]}
                componentRestrictions={{country: "mx"}} />
                { this.renderMap() }
    	</IonCardContent>
    }
    
    renderMap() {
        const place = this.state.place;
        const greatPlaceStyle = {
          position: 'absolute',
          transform: 'translate(-50%, -50%)'
        }
        
        if(place !== null && typeof place !== "undefined") {
            const mapLocation = place.geometry.location;
            return <div style={{ height: '50vh', width: '100%' }}><GoogleMapReact
                      defaultZoom={19}
                      defaultCenter={ {lat: mapLocation.lat(), lng: mapLocation.lng()} }
                      bootstrapURLKeys={{
                          key: 'AIzaSyCjmOEbx3qs0F2k2Cbb4Z2cdAkdMoQoJTw'
                      }}
                      options={ { draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true} }
                      yesIWantToUseGoogleMapApiInternals>
                      <div style={greatPlaceStyle}>
                          <img width="50" height="50" src={ pin } />
                      </div>
                    </GoogleMapReact></div>
        }
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
    
    isMaterialPickupZoneValid() {
        return this.state.zone !== null && this.state.zone !== "other";
    }
    
    isMaterialPickupAddressGiven() {
        return this.state.place !== null;
    }
    
    resetFormState() {
        this.setState({ place: null, quantity: null, zone: null, units: null, currentStep: 0 }, () => this.props.dismiss() );
    }
    
    goNext() {
        this.setState({ currentStep: 1 });
    }
    
    goPrevious() {
        this.setState({ currentStep: 0 });
    }
    
    showCancelOfferAlert() {
        this.setState({ alertShownForCancellation: true });
    }
	
	publishOffer() {
        
		const data = { 
			offer: { 
				quantity: this.state.quantity, 
				units: this.state.units, 
				zone: this.state.zone, 
				material: this.props.material.value 
			}
        };
				
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
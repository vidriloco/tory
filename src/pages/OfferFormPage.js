import React, { Component } from 'react';
import { IonAlert, IonIcon, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonItem, IonSelect, IonSelectOption, IonInput, IonChip, IonLabel } from '@ionic/react';
import { ClipLoader } from 'react-spinners';

import HeaderComponent from '../components/HeaderComponent';
import progressHalfImage from '../progress-bg-1.svg';
import progressFullImage from '../progress-bg-2.svg';
import pin from '../recyclo-map-pin.svg';
import sadPanda from '../sad-panda.svg';
import shareSocialMedia from '../share.svg';

import Backend from '../Backend';
import Styling from '../Styling';

import Autocomplete from 'react-google-autocomplete';
import GoogleMapReact from 'google-map-react';

class OfferFormPage extends Component {
	
	constructor(props) {
		super(props);

        const zones = [
            { value: "roma-norte", title: "Roma Norte"},
            { value: "roma-sur", title: "Roma Sur"},
            { value: "condesa", title: "Hipódromo Condesa"},
            { value: "juarez", title: "Juárez"},
            { value: "cuauhtemoc", title: "Colonia Cuauhtémoc"},
            { value: "other", title: "Otra zona"}
        ]
        
		this.state = { place: null, quantity: null, zone: null, units: null, currentStep: 0, zones: zones, alertShownForCancellation: false, isBusy: false };
		
		this.publishOffer = this.publishOffer.bind(this);
		this.updateField = this.updateField.bind(this);
        this.resetFormState = this.resetFormState.bind(this);
        this.showCancelOfferAlert = this.showCancelOfferAlert.bind(this);
        this.resetFormState = this.resetFormState.bind(this);
        this.shareOnTwitter = this.shareOnTwitter.bind(this);
        this.shareOnFacebook = this.shareOnFacebook.bind(this);
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
            subHeader={'¿Deseas descartar los cambios?'}
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
    		<HeaderComponent />
            <div className="ion-text-end ion-padding-end">
                { this.renderHeaderButtons() }
            </div>
        </div>
    }
    
    renderBottomButtons() {
        if(this.state.currentStep === 0) {
            var nextButton = <IonButton expand="block" color="medium">Siguiente</IonButton>;
            
            
            if(this.isMaterialPickupZoneValid() && this.isMaterialPickupAddressGiven()) {
                nextButton = <IonButton expand="block" color="primary" onClick={ this.goNext.bind(this) }>Siguiente</IonButton>;
            }
            
            return <div className="ion-padding">
                { nextButton }
                <IonButton expand="block" color="dark" onClick={ this.showCancelOfferAlert }>Cancelar</IonButton>
    		</div>
        } else if(this.state.currentStep === 1) {
            var publishButton = <IonButton expand="block" color="medium">Publicar</IonButton>;
            
            if(this.isMaterialTypeFormValid()) {
                publishButton = <IonButton expand="block" color="primary" onClick={ this.publishOffer }>Publicar</IonButton>;
            }
            
            return <div className="ion-padding">
                { publishButton }
                <IonButton expand="block" color="dark" onClick={ this.showCancelOfferAlert }>Cancelar</IonButton>
    		</div>
        } else {
            return <div className="ion-padding">
                <IonButton expand="block" color="primary" onClick={ this.resetFormState }>Cerrar</IonButton>
    		</div>
        }
    }
    
    renderHeaderButtons() {
        if(this.state.currentStep === 0) {
            if(this.isMaterialPickupZoneValid() && this.isMaterialPickupAddressGiven()) {
                return <IonChip color="primary" outline="primary" onClick={ this.goNext.bind(this) }>
                  <IonLabel>Siguiente</IonLabel>
                  <IonIcon name="arrow-round-forward" />
                </IonChip>
            } else {
                return <IonLabel>Llena los campos abajo para continuar</IonLabel>
            }
        } else if(this.state.currentStep === 1) {
            
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
        if(this.state.currentStep === 0) {
            return this.renderMaterialPickupZone();
        } else if(this.state.currentStep === 1) {
            return this.renderMaterialTypeForm();
        } else if(this.state.currentStep === -1) {
            return this.renderLoadingMessage();
        } else {
            return <div> { this.renderSuccessfulMessage() }{ this.renderShareOnSocialMediaMessage() }</div>
        }
    }
    
	renderPresentationCount() {
		return <IonItem>
            <IonLabel>Unidades</IonLabel>
            <IonSelect style={ Styling.inputField() } id="units" interface="action-sheet" placeholder="Seleccionar" value={this.state.units} onIonChange={this.updateField}>
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
        <IonSelect style={ Styling.inputField() } id="zone" interface="action-sheet" cancelText="Cancelar" okText="Aceptar" placeholder="Seleccionar" value={this.state.zone} onIonChange={this.updateField}>
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
				<IonInput id="quantity" style={ Styling.inputField() } placeholder="Cantidad" type="number" value={this.state.quantity} onIonChange={this.updateField}></IonInput>
			</IonCardContent>
                
			{ this.renderCurrentStep() }
	    </IonCard>
	}
    
    renderMaterialPickupZone() {
        
        var legend = null;
        var mapFields = null;
        
        if(this.state.zone === "other") {
            legend = <div>
                <br/>
                <img className="ion-margin-top ion-margin-bottom" src={ sadPanda } alt="Triste" width="60vw" height="60vh" />
                <p className="ion-margin-top ion-text-center">Por ahora estamos operando únicamente en las zonas propuestas. <br/><b>Por favor, intenta otra ubicación para la recolección</b></p>
            </div>;
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
    
    renderLoadingMessage() {
        return <IonCard>
            <IonCardContent className="ion-text-center">
                <br/>
                <ClipLoader
                    sizeUnit={"px"}
                    size={45}
                    color={'#FC7213'}
                    loading={true} />
                <p className="ion-text-center page-subtitle">Publicando tu oferta ...</p>
            </IonCardContent>
        </IonCard>
    }
    
    renderSuccessfulMessage() {
        return <IonCard>
            <img alt="Muchas gracias" src="https://media.giphy.com/media/1BgsIhVlefrARI6wTE/giphy.gif" />
          	<IonCardHeader>
        	    <IonCardTitle><h2 className="ion-text-center page-title no-vertical-padding">¡Muchas gracias!</h2></IonCardTitle>
          	</IonCardHeader>
        	<IonCardContent>
				<p className="ion-text-center page-subtitle">En breve te contactaremos para acordar la fecha y hora en la que pasaremos por los reciclables.</p>
        	</IonCardContent>
        </IonCard>
    }
    
    renderShareOnSocialMediaMessage() {
        return <IonCard>
            <img alt="Comparte en redes sociales" src={ shareSocialMedia } />
          	<IonCardHeader>
        	    <IonCardTitle><h2 className="ion-text-center page-title no-vertical-padding">Pasa la voz</h2></IonCardTitle>
          	</IonCardHeader>
        	<IonCardContent>                
    			<p className="ion-text-center page-subtitle">No seas el único de tus amigos reciclando. <br/><b>Cuéntales de Recyclo en redes sociales.</b></p>
                <div className="ion-text-center ion-margin">
                    <IonChip color="primary" outline="primary" onClick={ this.shareOnTwitter }>
                        <IonLabel>Compartir en Twitter</IonLabel>
                        <IonIcon name="logo-twitter" />
                    </IonChip>
                    <IonChip color="primary" outline="primary" onClick={ this.shareOnFacebook }>
                        <IonLabel>Compartir en Facebook</IonLabel>
                        <IonIcon name="logo-facebook" />
                    </IonChip>
                </div>
            </IonCardContent>
        </IonCard>
    }
    
    renderMapFields() {
        var address = "";
        if(this.state.place !== null && typeof this.state.place !== "undefined") {
            address = this.state.place.formatted_address;
        }
        
        return <IonCardContent>
    		<p className="page-subtitle no-vertical-padding">Escribe y selecciona la calle y número donde podemos recoger los reciclables</p>
            <Autocomplete
                defaultValue={ address }
                onChange={ (event) => { 
                    if(event.target.value.length === 0) {
                        this.setState({ place: null });
                    }
                }}
                style={{width: '100%'}}
                onPlaceSelected={(place) => {
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
        
        if(place !== null && typeof place !== "undefined" && typeof place.geometry !== "undefined") {
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
                          <img alt="Pin" width="50" height="50" src={ pin } />
                      </div>
                    </GoogleMapReact></div>
        }
    }
    
    renderProgressImage() {
        if(this.state.currentStep === 0) {
            return <img alt="" src={ progressHalfImage } />;
        } else {
            return <img alt="" src={ progressFullImage } />;
        }
    }
    
    renderCurrentStep() {
        return <IonCardContent>
                <h2 className="ion-text-center"><b>Paso { this.state.currentStep+1 } de 2</b></h2>
			</IonCardContent>
    }
    
    socialMediaShare() {
        const appID = "431086961014000";
        const text = "Acabo de publicar mis reciclables en Recyclo. Unete a Recyclo, publica los tuyos y limpiemos México juntos.";
        return { text: encodeURIComponent(text), url: encodeURIComponent("https://recyclo.mx"), appID: appID }
    }
    
    shareOnTwitter() {
        window.open("https://twitter.com/intent/tweet/?text=".concat(this.socialMediaShare().text).concat("&amp;url=").concat(this.socialMediaShare().url), "_blank");
    }
    
    shareOnFacebook() {
        window.open("http://www.facebook.com/dialog/share?app_id=".concat(this.socialMediaShare().appID).concat("&href=").concat(this.socialMediaShare().url).concat("&quote=").concat(this.socialMediaShare().text), "_blank");
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
    
    hasFilledUpDetailsAlready() {
        return this.state.place !== null || this.state.quantity !== null || this.state.zone !== null || this.state.units !== null;
    }
    
    goNext() {
        this.setState({ currentStep: 1 });
    }
    
    goPrevious() {
        this.setState({ currentStep: 0 });
    }
    
    showCancelOfferAlert() {
        if(this.hasFilledUpDetailsAlready()) {
            this.setState({ alertShownForCancellation: true });
        } else {
            this.resetFormState();
        }
    }
	
	publishOffer() {
		const data = { 
			offer: { 
				quantity: this.state.quantity, 
				units: this.state.units, 
				material: this.props.material.value
			},
            location: {
                place: this.state.place,
				zone: this.state.zone
            }
        };
        this.postOfferRequest(data);
	}
    
    postOfferRequest(data) {
        this.setState({ currentStep: -1 });
        
		fetch(Backend.offers('create'), {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '.concat(localStorage.getItem('token'))
            }
        }).then(response => {
        if (!response.ok) { throw response }
            return response.json();
        }).then(json => {
			this.setState({ currentStep: 2 });
        }).catch(error => {
			this.setState({ currentStep: 1 });
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
import React, { Component } from 'react';
import { IonSlide, IonSlides, IonContent, IonCard, IonAlert, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton, IonInput } from '@ionic/react';
import HeaderComponent from '../components/HeaderComponent';
import Backend from '../Backend';
import Styling from '../Styling';

import { ClipLoader } from 'react-spinners';
import queryString from 'query-string';

class SignUpPage extends Component {
	
	constructor(props) {
        super(props);

		this.state = {
			name: null,
			username: null,
			email: null,
			password: null,
			phone: null,
            isSigningUp: false,
            successfullySignedUpMessageShown: false
		}
		
		this.updateField = this.updateField.bind(this);
		this.createUserAccount = this.createUserAccount.bind(this);
        this.slides = React.createRef();
        
        const values = queryString.parse(this.props.location.search);
        if((typeof values.code !== "undefined")) {
            localStorage.setItem('campaign-code', values.code);
        }
    }
    
    render() {
        var loginInvitationCard = null;
        
        if(!this.state.isSigningUp) {
            loginInvitationCard = this.renderLoginInvitationCard();
        }
        
        return (
            <IonContent>
				<HeaderComponent/>
                { this.renderMainCardAccordingToParams() }
                { this.renderCreateAccountCard() }
                { this.renderSuccessfullySignedUpMessageDialog() }
				{ loginInvitationCard }
			</IonContent>
        );
    }
    
    goNext() {
        this.slides.current.slideNext();
    }
    
    goPrevious() {
        this.slides.current.slidePrev();
    }
    
    renderMainCardAccordingToParams() {
        const promoCode = localStorage.getItem('campaign-code') || null;
        if(promoCode === "88") {
            return this.renderPromoSlider();
        }
    }
    
	renderPromoSlider() {
        return <div>
            <div className="swiper-button-next" onClick={ this.goNext.bind(this) }></div>
            <div className="swiper-button-prev" onClick={ this.goPrevious.bind(this) }></div>
            <IonSlides pager={true} ref={this.slides}>
                <IonSlide>
                    <IonCard>
                      	<IonCardHeader>
                        	<IonCardTitle><h4 className="page-title no-vertical-padding">¿Cómo ganar dinero dando lata?</h4></IonCardTitle>
                			<p className="page-subtitle no-vertical-padding">Usa las flechitas o desliza a los lados para saber más</p>
                      	</IonCardHeader>
                        <img alt="Gana lana" src="https://media.giphy.com/media/xUOwGaM5hOLm9xYvTy/giphy.gif" className="recyclo-slider-image" />
                    </IonCard>
                </IonSlide>
                <IonSlide>
                    <IonCard>
                      	<IonCardHeader>
                        	<IonCardTitle><h4 className="page-title no-vertical-padding">Separa y almacena lata</h4></IonCardTitle>
                			<p className="page-subtitle no-vertical-padding">Revisa de que no tenga líquido y aplastala.</p>
                      	</IonCardHeader>
                        <img alt="Tutorial" src="https://media.giphy.com/media/qmcZymbr1WNeU/giphy.gif" className="recyclo-slider-image" />
                      	<IonCardHeader>
                			<p className="page-subtitle no-vertical-padding">Junta <b>5kg</b> o más.</p>
                      	</IonCardHeader>
                    </IonCard>
                </IonSlide>
                <IonSlide>
                    <IonCard>
                      	<IonCardHeader>
                        	<IonCardTitle><h4 className="page-title no-vertical-padding">Publícala en Recyclo</h4></IonCardTitle>
                			<p className="page-subtitle no-vertical-padding">Es muy fácil, solo necesitamos saber donde recogerla.</p>
                      	</IonCardHeader>
                        <img alt="Tutorial" src="https://media.giphy.com/media/13HBDT4QSTpveU/giphy.gif" className="recyclo-slider-image" />
                      	<IonCardHeader>
                			<p className="page-subtitle no-vertical-padding">Por ahora solo estamos operando en algunas colonias de la <b>CDMX</b></p>
                      	</IonCardHeader>
                    </IonCard>
                </IonSlide>
                <IonSlide>
                    <IonCard>
                      	<IonCardHeader>
                        	<IonCardTitle><h4 className="page-title no-vertical-padding">Te pagamos al recogerla</h4></IonCardTitle>
                			<p className="page-subtitle no-vertical-padding">Te pagaremos el kilo de lata al precio del mercado en ese día.</p>
                      	</IonCardHeader>
                        <img alt="Tutorial" src="https://media.giphy.com/media/67ThRZlYBvibtdF9JH/giphy.gif" className="recyclo-slider-image" />
                      	<IonCardHeader>
                			<p className="page-subtitle no-vertical-padding">El precio de la lata ronda por lo regular los <b>$20 MXN por Kilo</b></p>
                      	</IonCardHeader>
                    </IonCard>
                </IonSlide>
                <IonSlide>
                    <IonCard>
                      	<IonCardHeader>
                        	<IonCardTitle><h4 className="page-title no-vertical-padding">Empieza hoy</h4></IonCardTitle>
                			<p className="page-subtitle no-vertical-padding">Crea tu cuenta o inicia sesión</p>
                      	</IonCardHeader>
                        <img alt="Tutorial" src="https://media.giphy.com/media/fsc7c7TYKulQ4lmmAo/giphy.gif" className="recyclo-slider-image" />
                    </IonCard>
                </IonSlide>
    	  </IonSlides>
        </div>
	}
    
    renderLoginInvitationCard() {
        return <IonCard>					
      	    <IonCardHeader>
        	    <IonCardTitle>¿Ya tienes cuenta?</IonCardTitle>
        	    <IonCardSubtitle>No pierdas más tiempo y publica tus reciclables hoy</IonCardSubtitle>
      	    </IonCardHeader>
            
            <IonCardContent>
                <IonButton expand="block" href="/landing" color="secondary">Iniciar Sesión</IonButton>
            </IonCardContent>
    	</IonCard>
    }
	
    renderCreateAccountCard() {
        var defaultCardContent = <div>
            <IonCardContent>
    			<IonInput id="name" style={ Styling.inputField() } placeholder="Tu nombre (Opcional)" value={this.state.name} onIonChange={this.updateField}></IonInput>
    			<IonInput id="username" style={ Styling.inputField() } placeholder="Nombre de usuario" value={this.state.username} onIonChange={this.updateField} required></IonInput>
    			<IonInput id="email" style={ Styling.inputField() } placeholder="Email" type="email" value={this.state.email} onIonChange={this.updateField} required></IonInput>
	
    			<IonInput id="password" style={ Styling.inputField() } placeholder="Contraseña" type="password" value={this.state.password} onIonChange={this.updateField} required></IonInput>

    			<IonInput id="phone" style={ Styling.inputField() } placeholder="Tu What's App (Opcional)" value={this.state.phone} onIonChange={this.updateField}></IonInput>
    			<p className="fieldNote">Nos va a facilitar coordinar la recolección de los reciclables.</p>
            </IonCardContent>
			<IonCardContent>
				<IonButton expand="block" onClick={this.createUserAccount}>Registrate</IonButton>
			</IonCardContent>
        </div>
        
        if(this.state.isSigningUp) {
            defaultCardContent = <div className="ion-text-center">
                <br/><br/>
                <ClipLoader
                    sizeUnit={"px"}
                    size={40}
                    color={'#FC7213'}
                    loading={true} />
        	    <p className="ion-text-center page-subtitle">Creando tu cuenta e iniciando sesión ...</p>
            </div>
        }
        
        
        return <IonCard>					
	      	<IonCardHeader>
	        	<IonCardTitle><p className="ion-text-center">Creación de cuenta</p></IonCardTitle>
	      	</IonCardHeader>

            { defaultCardContent }
        </IonCard>
    }
    
    renderSuccessfullySignedUpMessageDialog() {
        return <IonAlert
            isOpen={this.state.successfullySignedUpMessageShown}
            onDidDismiss={() => this.setState(() => ({ successfullySignedUpMessageShown: false }))}
            header={'Bienvenido a Recyclo'}
            message={'Con tu nueva cuenta podrás publicar reciclables y así ayudar al medio ambiente y a tu ciudad!'}
            buttons={[{
                text: 'Comenzar',
                handler: () => {
                    this.props.history.push("/");
                }
              }
        ]} />
    }
    
	createUserAccount() {
		var campaignCode = localStorage.getItem('campaign-code') || '';
		var campaign = campaignCode !== '';
        
		var data = { user: this.state, campaign: { enabled: campaign, code: campaignCode } };
		
        this.setState({ isSigningUp: true });
        
		fetch(Backend.users('create'), {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (!response.ok) { throw response }
                return response.json();
        }).then(json => {
            this.setState({ isSigningUp: false, successfullySignedUpMessageShown: true });
			var tokenValue = json.token;
			localStorage.setItem('token', tokenValue);
        }).catch(error => {
            this.setState({ isSigningUp: false });
            
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

export default SignUpPage;
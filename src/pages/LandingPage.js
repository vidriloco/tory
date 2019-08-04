import React, { Component } from 'react';
import { IonSlides, IonSlide, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton, IonInput } from '@ionic/react';
import Backend from '../Backend';
import Styling from '../Styling';
import lataPromo from '../banner-lata-promo.jpg';
import queryString from 'query-string';

import HeaderComponent from '../components/HeaderComponent'
import SliderComponent from '../components/SliderComponent'
import AboutComponent from '../components/AboutComponent'

import { ClipLoader } from 'react-spinners';

class LandingPage extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
			login: null,
			password: null
		}
		
		this.updateField = this.updateField.bind(this);
		this.loginAccount = this.loginAccount.bind(this);
        
        this.slides = React.createRef();
        
        const values = queryString.parse(this.props.location.search);
        if((typeof values.code !== "undefined")) {
            localStorage.setItem('campaign-code', values.code);
        }
    }
    
    goNext() {
        this.slides.current.slideNext();
    }
    
    goPrevious() {
        this.slides.current.slidePrev();
    }
    
    render() {
        return (
		    <IonContent>
                <HeaderComponent slogan={ "Facilitamos la recolección de residuos reciclables de manera colaborativa" }/>
                { this.renderMainCardAccordingToParams() }
                { this.renderActionCards() }
            </IonContent>
        );
    }
    
    renderMainCardAccordingToParams() {
        const promoCode = localStorage.getItem('campaign-code') || null;
        if(promoCode === "88") {
            return this.renderCatchyMessage();
        } else {
            return this.renderSlider();
        }
    }
    
    renderCatchyMessage() {
        return <IonCard>
            <img alt="Gana lana" src={ lataPromo } />
          	<IonCardHeader>
            	<IonCardTitle><h4 className="page-title no-vertical-padding">Empieza a ganar dinero hoy</h4></IonCardTitle>
    			<p className="page-subtitle no-vertical-padding">Publica tus latas y te damos el 70% de su valor en el mercado del reciclaje.</p>
          	    <br/>
                <IonButton size="small" href="/register">Crear cuenta</IonButton>
                <IonButton size="small" fill="outline" href="/campaign-help">Más Info</IonButton>
            </IonCardHeader>
        </IonCard>
    }
  
    renderActionCards() {
        var newAccountInvitationCard = null;
        
        if(!this.state.isGettingLoggedIn) {
            newAccountInvitationCard = this.renderNewAccountInvitationCard();
        }
        
        return <div>
            { this.renderLoginCard() }
            { newAccountInvitationCard }
            { this.renderSocialMediaInfo() }
        </div>
    }
    
	renderSlider() {
        
        let sliderData = [
          { title: "¿Cómo funciona Recyclo?", description: "Usa las flechitas o desliza a los lados para saber más", imageSrc: "https://media.giphy.com/media/l1KVcrdl7rJpFnY2s/giphy.gif", imageAlt: "Tutorial", imageClassName: "slider-image" },
          { title: "Publícalos en Recyclo", description: "Especifica tipo, número y presentación", imageSrc: "https://media.giphy.com/media/13HBDT4QSTpveU/giphy.gif", imageAlt: "Tutorial", imageClassName: "slider-image" }
        ];
        
        return <SliderComponent dataSource={ sliderData } />;
	}
    
    renderNewAccountInvitationCard() {
        return <IonCard>
              <IonCardHeader>
                  <IonCardTitle>¿Eres nuevo?</IonCardTitle>
                  <IonCardSubtitle>Empieza a publicar tus reciclables hoy</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                  <IonButton expand="block" href="/sign-up">Crear cuenta</IonButton>
              </IonCardContent>
          </IonCard>
    }
    
    renderLoginCard() {
        var defaultContent = <div>
            <IonCardHeader>
                <IonCardTitle>Iniciar Sesión</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonInput style={ Styling.inputField() } background="red" id="login" placeholder="Nombre de usuario o Email" type="email" value={this.state.login} onIonChange={this.updateField}></IonInput>
                <IonInput style={ Styling.inputField() } id="password" placeholder="Contraseña" type="password" value={this.state.password} onIonChange={this.updateField}></IonInput>
  
                <IonButton expand="block" color="warning" onClick={this.loginAccount}>Entrar</IonButton>
            </IonCardContent>
        </div>
        
        if(this.state.isGettingLoggedIn) {
            defaultContent = <div className="ion-text-center">
                <br/><br/>
                <ClipLoader
                    sizeUnit={"px"}
                    size={40}
                    color={'#FC7213'}
                    loading={true} />
        	    <p className="ion-text-center page-subtitle">Iniciando sesión ...</p>
            </div> 
        }
        
        return <IonCard>
          { defaultContent }
        </IonCard>
    }
    
    renderSocialMediaInfo() {
        const facebook = "https://www.facebook.com/recyclo.mx/";
        const twitter = "https://twitter.com/RecycloMx";
        let socialMedia = { fb: { url: facebook, title: "Recyclo en Facebook" }, tw: {url: twitter, title: 'Recyclo en Twitter' }, email: { url: "contacto@recyclo.mx", title: 'E-mail'} }
        
        return <AboutComponent socialMedia={ socialMedia } headerSeoTitle="Nuestros datos de contacto" title="Acerca de Recyclo" />
    }
  	
	loginAccount() {
		var data = { session: this.state };
        
        this.setState({ isGettingLoggedIn: true });
        
		fetch(Backend.sessions('create'), {
        	method: 'POST',
        	body: JSON.stringify(data),
        	headers: {
            	'Content-Type': 'application/json'
        	}}).then(response => {
        		if (!response.ok) { throw response }
        		return response.json();
			}).then(json => {
                this.setState({ isGettingLoggedIn: false });
				var tokenValue = json.token;
				localStorage.setItem('token', tokenValue);
				this.props.history.push("/");
			}).catch(error => {
                this.setState({ isGettingLoggedIn: false });
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

export default LandingPage;

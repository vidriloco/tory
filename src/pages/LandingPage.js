import React, { Component } from 'react';
import { IonModal, IonChip, IonLabel, IonIcon, IonSlides, IonSlide, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton, IonInput } from '@ionic/react';
import Backend from '../Backend';
import Styling from '../Styling';
import contactUs from '../contact-us.svg';
import PrivacyPolicyPage from './PrivacyPolicyPage';
import lataPromo from '../banner-lata-promo.jpg';
import queryString from 'query-string';

import HeaderComponent from '../components/HeaderComponent'

import { ClipLoader } from 'react-spinners';

class LandingPage extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
			login: null,
			password: null,
            isShowingPrivacyPolicy: false
		}
		
		this.updateField = this.updateField.bind(this);
		this.loginAccount = this.loginAccount.bind(this);
        this.shareTwitter = this.shareTwitter.bind(this);
        this.shareFacebook = this.shareFacebook.bind(this);
        this.shareEmail = this.shareEmail.bind(this);
        this.openPrivacyNotice = this.openPrivacyNotice.bind(this);
        
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
                { this.renderPrivacyPolicyModal() }
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
    
    renderPrivacyPolicyModal() {
        return <IonModal isOpen={this.state.isShowingPrivacyPolicy} 
                onDidDismiss={() => this.setState(() => ({ isShowingPrivacyPolicy: false }))}>
                <IonContent>
                    <PrivacyPolicyPage dismiss={ this.dismissPrivacyPolicyModal.bind(this) }/>
                </IonContent>
            </IonModal>
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
            { this.renderPrivacyPolicy() }
        </div>
    }
    
	renderSlider() {

		return <div>
            <div className="swiper-button-next" onClick={ this.goNext.bind(this) }></div>
            <div className="swiper-button-prev" onClick={ this.goPrevious.bind(this) }></div>
            <IonSlides pager={true} ref={this.slides}>
                <IonSlide>
                    <IonCard>
                      	<IonCardHeader>
                        	<IonCardTitle><h4 className="page-title no-vertical-padding">¿Cómo funciona Recyclo?</h4></IonCardTitle>
                			<p className="page-subtitle no-vertical-padding">Usa las flechitas o desliza a los lados para saber más</p>
                      	</IonCardHeader>
                        <img alt="Tutorial" src="https://media.giphy.com/media/l1KVcrdl7rJpFnY2s/giphy.gif" className="recyclo-slider-image" />
                    </IonCard>
                </IonSlide>
                <IonSlide>
                    <IonCard>
                      	<IonCardHeader>
                        	<IonCardTitle><h4 className="page-title no-vertical-padding">Separa y limpia</h4></IonCardTitle>
                			<p className="page-subtitle no-vertical-padding">Guarda tus reciclables y tenlos listos</p>
                      	</IonCardHeader>
                        <img alt="Tutorial" src="https://media.giphy.com/media/10r895QS3fkzNC/giphy.gif" className="recyclo-slider-image" />
                    </IonCard>
                </IonSlide>
                <IonSlide>
                    <IonCard>
                      	<IonCardHeader>
                        	<IonCardTitle><h4 className="page-title no-vertical-padding">Publícalos en Recyclo</h4></IonCardTitle>
                			<p className="page-subtitle no-vertical-padding">Especifica tipo, número y presentación</p>
                      	</IonCardHeader>
                        <img alt="Tutorial" src="https://media.giphy.com/media/13HBDT4QSTpveU/giphy.gif" className="recyclo-slider-image" />
                    </IonCard>
                </IonSlide>
                <IonSlide>
                    <IonCard>
                      	<IonCardHeader>
                        	<IonCardTitle><h4 className="page-title no-vertical-padding">Los pasamos a recoger</h4></IonCardTitle>
                			<p className="page-subtitle no-vertical-padding">Coordinaremos contigo el lugar y hora</p>
                      	</IonCardHeader>
                        <img alt="Tutorial" src="https://media.giphy.com/media/xTiTnhCc4SeRW74zBK/giphy.gif" className="recyclo-slider-image" />
                    </IonCard>
                </IonSlide>
                <IonSlide>
                    <IonCard>
                      	<IonCardHeader>
                        	<IonCardTitle><h4 className="page-title no-vertical-padding">Empieza hoy</h4></IonCardTitle>
                			<p className="page-subtitle no-vertical-padding">Crea una cuenta o inicia sesión</p>
                      	</IonCardHeader>
                        <img alt="Tutorial" src="https://media.giphy.com/media/fsc7c7TYKulQ4lmmAo/giphy.gif" className="recyclo-slider-image" />
                    </IonCard>
                </IonSlide>
    	  </IonSlides>
        </div>
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
        return <IonCard>
            <img src={ contactUs } alt="Contacto" />
          	<IonCardHeader>
        	    <IonCardTitle><h4 className="page-title no-vertical-padding ion-text-center">Contáctanos</h4></IonCardTitle>
          	</IonCardHeader>
        	<IonCardContent>                
                <div className="ion-text-center ion-margin">
                    <IonChip color="secondary" outline="secondary" onClick={ this.shareTwitter }>
                        <IonLabel>@RecycloMx</IonLabel>
                        <IonIcon name="logo-twitter" />
                    </IonChip>
                    <IonChip color="primary" outline="primary" onClick={ this.shareFacebook }>
                        <IonLabel>RecycloMx</IonLabel>
                        <IonIcon name="logo-facebook" />
                    </IonChip>
                    <IonChip color="success" outline="success" onClick={ this.shareEmail }>
                        <IonLabel>contacto@recyclo.mx</IonLabel>
                        <IonIcon name="at" />
                    </IonChip>
                </div>
            </IonCardContent>
        </IonCard>
    }
    
    renderPrivacyPolicy() {
        return <IonCard>
          	<IonCardHeader>
        	    <IonCardTitle><h4 className="page-title no-vertical-padding ion-text-center">Aviso de Privacidad</h4></IonCardTitle>
          	</IonCardHeader>
        	<IonCardContent>                
                <div className="ion-text-center ion-margin">
                    <IonChip color="sucess" outline="sucess" onClick={ this.openPrivacyNotice }>
                        <IonLabel>Consultar</IonLabel>
                    </IonChip>
                </div>
            </IonCardContent>
        </IonCard>
    }
    
    openPrivacyNotice() {
        this.setState({ isShowingPrivacyPolicy: true });
    }
    
    dismissPrivacyPolicyModal() {
        this.setState({ isShowingPrivacyPolicy: false });
    }
    
    socialMediaShare() {
        const facebook = "https://www.facebook.com/recyclo.mx/";
        const twitter = "https://twitter.com/RecycloMx";
        return { fb: facebook, tw: twitter, mail: "contacto@recyclo.mx" }
    }
    
    shareTwitter() {
        window.open(this.socialMediaShare().tw, "_blank");
    }
    
    shareFacebook() {
        window.open(this.socialMediaShare().fb, "_blank");
    }
    
    shareEmail() {
        window.open("mailto:".concat(this.socialMediaShare().mail));
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

import React, { Component } from 'react';
import { IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton, IonInput } from '@ionic/react';
import logo from '../recyclo-logo.svg';
import Backend from '../Backend';

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
    }
    
    render() {
        return (
		    <IonContent>
			    <IonCard>
				    <img src={logo} className="App-logo" alt="logo" />
			    </IonCard>
                { this.renderActionCards() }
            </IonContent>
        );
    }
  
    renderActionCards() {
        
        var newAccountInvitationCard = null;
        
        if(!this.state.isGettingLoggedIn) {
            newAccountInvitationCard = this.renderNewAccountInvitationCard();
        }
        
        return <div>
            { this.renderLoginCard() }
            { newAccountInvitationCard }
        </div>
    }
    
    renderNewAccountInvitationCard() {
        return <IonCard>
              <IonCardHeader>
                  <IonCardTitle>Nuevo?</IonCardTitle>
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
                <IonCardTitle>Bienvenido</IonCardTitle>
                <IonCardSubtitle>Si ya tienes una cuenta, inicia sesión</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                <IonInput id="login" placeholder="Nombre de usuario o Email" type="email" value={this.state.login} onIonChange={this.updateField}></IonInput>
                <IonInput id="password" placeholder="Contraseña" type="password" value={this.state.password} onIonChange={this.updateField}></IonInput>
  
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
          <img alt="" src="https://media.giphy.com/media/l1KVcrdl7rJpFnY2s/giphy.gif" />

          { defaultContent }
        </IonCard>
    }
  	
	loginAccount() {
		var data = { session: this.state };
        
        this.setState({ isGettingLoggedIn: true });
        
		var result = fetch(Backend.sessions('create'), {
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

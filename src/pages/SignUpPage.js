import React, { Component } from 'react';
import { IonContent, IonCard, IonAlert, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton, IonInput } from '@ionic/react';
import logo from '../recyclo-logo.svg';
import Backend from '../Backend';

import { ClipLoader } from 'react-spinners';

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
    }
    
    render() {
        var loginInvitationCard = null;
        
        if(!this.state.isSigningUp) {
            loginInvitationCard = this.renderLoginInvitationCard();
        }
        
        return (
            <IonContent>
				<IonCard>
                    <img src={logo} className="App-logo" alt="logo" />
				</IonCard>
                { this.renderCreateAccountCard() }
                { this.renderSuccessfullySignedUpMessageDialog() }
				{ loginInvitationCard }
			</IonContent>
        );
    }
    
    renderLoginInvitationCard() {
        return <IonCard>					
      	    <IonCardHeader>
        	    <IonCardTitle>Ya tienes cuenta?</IonCardTitle>
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
    			<IonInput id="name" placeholder="Tu nombre (Opcional)" value={this.state.name} onIonChange={this.updateField}></IonInput>
    			<IonInput id="username" placeholder="Nombre de usuario" value={this.state.username} onIonChange={this.updateField} required></IonInput>
    			<IonInput id="email" placeholder="Email" type="email" value={this.state.email} onIonChange={this.updateField} required></IonInput>
	
    			<IonInput id="password" placeholder="Contraseña" type="password" value={this.state.password} onIonChange={this.updateField} required></IonInput>

    			<IonInput id="phone" placeholder="Tu What's App (Opcional)" value={this.state.phone} onIonChange={this.updateField}></IonInput>
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
		var data = { user: this.state };
		
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
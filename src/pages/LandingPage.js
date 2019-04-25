import React, { Component } from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton } from '@ionic/react';
import logo from '../recyclo-logo.svg';

class LandingPage extends Component {
  render() {
    return (
      <div>
				<IonCard>
					<img src={logo} className="App-logo" alt="logo" />
	      	
				</IonCard>
				<IonCard>
					<img alt="" src="https://media.giphy.com/media/l1KVcrdl7rJpFnY2s/giphy.gif" />
	      	<IonCardHeader>
	        	<IonCardTitle>Bienvenido</IonCardTitle>
						<IonCardSubtitle>Si ya tienes una cuenta, inicia sesión</IonCardSubtitle>
	      	</IonCardHeader>

	      	<IonCardContent>
						<ion-input placeholder="Nombre de usuario o Email" type="email"></ion-input>
					
						<ion-input placeholder="Contraseña" type="password"></ion-input>
						<IonButton expand="block" href="/feed" color="warning">Entrar</IonButton>
					
	      	</IonCardContent>
	    	</IonCard>
					
				<IonCard>
	      	<IonCardHeader>
	        	<IonCardTitle>Nuevo?</IonCardTitle>
						<IonCardSubtitle>Empieza a publicar tus reciclables hoy</IonCardSubtitle>
	      	</IonCardHeader>
					
					<IonCardContent>
						<IonButton expand="block" href="/sign-up">Crear cuenta</IonButton>
					</IonCardContent>
	    	</IonCard>
			</div>
    );
  }
}

export default LandingPage;

import React, { Component } from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton } from '@ionic/react';
import logo from '../recyclo-logo.svg';

class SignUpPage extends Component {
  render() {
    return (
      <div>
				<IonCard>
					<img src={logo} className="App-logo" alt="logo" />
				</IonCard>
				<IonCard>					
	      	<IonCardHeader>
	        	<IonCardTitle><p className="ion-text-center">Creación de cuenta</p></IonCardTitle>
	      	</IonCardHeader>

	      	<IonCardContent>
						<ion-input placeholder="Nombre de usuario"></ion-input>
						<ion-input placeholder="Email" type="email"></ion-input>
					
						<ion-input placeholder="Contraseña" type="password"></ion-input>
			
						<ion-input placeholder="Tu What's App (Opcional)" type="email"></ion-input>
						<p className="fieldNote">Nos va a facilitar coordinar la recolección de los reciclables.</p>
	      	</IonCardContent>
					
					<IonCardContent>
						<IonButton expand="block">Registrate</IonButton>
					</IonCardContent>
	    	</IonCard>
				<IonCard>					
	      	<IonCardHeader>
	        	<IonCardTitle>Ya tienes cuenta?</IonCardTitle>
	        	<IonCardSubtitle>No pierdas más tiempo y publica tus reciclables hoy</IonCardSubtitle>
	      	</IonCardHeader>

					<IonCardContent>
						<IonButton expand="block" href="/landing" color="secondary">Iniciar Sesión</IonButton>
					</IonCardContent>
	    	</IonCard>
			</div>
    );
  }
}

export default SignUpPage;
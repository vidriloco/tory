import React, { Component } from 'react';
import { IonRow, IonCol, IonAlert, IonIcon, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonItem, IonSelect, IonSelectOption, IonInput, IonSlides, IonSlide, IonChip, IonLabel } from '@ionic/react';
import { ClipLoader } from 'react-spinners';

import logo from '../recyclo-logo.svg';

import Backend from '../Backend';

class EditUserProfilePage extends Component {
	
	constructor(props) {
		super(props);
        
        this.saveProfileChanges = this.saveProfileChanges.bind(this);
        this.updateField = this.updateField.bind(this);
        
		this.state = { 
            username: null, 
            name: null, 
            email: null, 
            phone: null, 
            password: null };
	}
    
    componentWillReceiveProps() {
        this.setState({ 
            username: this.props.user.username,
            name: this.props.user.name,
            email: this.props.user.email,
            phone: this.props.user.phone
        });
        console.log(this.state);
    }
    
    saveProfileChanges() {
        const userData = { 
            username: this.state.username,
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password
        }
        
		var result = fetch(Backend.users('update'), {
        method: 'POST',
        body: JSON.stringify({ user: userData }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '.concat(localStorage.getItem('token'))
        }})
		.then(response => {
        if (!response.ok) { throw response }
            return response.json();
        })
		.then(json => {
			alert("Los cambios a tu perfil han sido guardados");
            this.props.dismiss();
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
    
    render() {
        return <IonContent>
            { this.renderHeader() }
            { this.renderUserProfileForm() }
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
    
    renderUserProfileForm() {
        return <div>
            <IonCard>					
	      	    <IonCardHeader>
	        	    <IonCardTitle><p className="ion-text-center">Editar cuenta</p></IonCardTitle>
	      	    </IonCardHeader>

	      	    <IonCardContent>
    				<IonInput id="name" placeholder="Tu nombre (Opcional)" value={ this.state.name } onIonChange={this.updateField}></IonInput>
    				<IonInput id="username" placeholder="Nombre de usuario" value={ this.state.username } onIonChange={this.updateField} required></IonInput>
    				<IonInput id="email" placeholder="Email" type="email" value={ this.state.email } onIonChange={this.updateField} required></IonInput>
			
    				<IonInput id="password" placeholder="Contraseña" type="password" value={this.state.password } onIonChange={this.updateField} required></IonInput>
	
    				<IonInput id="phone" placeholder="Tu What's App (Opcional)" value={ this.state.phone } onIonChange={this.updateField}></IonInput>
    				<p className="fieldNote">Nos va a facilitar coordinar la recolección de los reciclables.</p>
	      	    </IonCardContent>
	    	</IonCard>
            <div className="ion-padding">
				<IonButton expand="block" onClick={ this.saveProfileChanges }>Guardar cambios</IonButton>                
    		</div>
        </div>
    }

    renderHeaderButtons() {
        return <div>
            <IonChip color="danger" outline="danger" onClick={ () => this.props.dismiss() }>
                <IonLabel>Cerrar</IonLabel>
            </IonChip>
            <IonChip color="primary" outline="primary" onClick={ this.saveProfileChanges }>
                <IonLabel>Guardar cambios</IonLabel>
                <IonIcon name="checkmark" />
            </IonChip>
        </div>;
    }
}

export default EditUserProfilePage;
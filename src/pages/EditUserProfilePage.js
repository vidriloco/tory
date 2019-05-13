import React, { Component } from 'react';
import { IonAlert, IonIcon, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonInput, IonChip, IonLabel } from '@ionic/react';
import HeaderComponent from '../components/HeaderComponent'

import { ClipLoader } from 'react-spinners';
import Backend from '../Backend';
import Styling from '../Styling';

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
            password: null,
            successfulProfileUpdateMessageShown: false,
            isUpdatingProfile: false
        };
	}
    
    componentWillReceiveProps() {
        this.setState({ 
            username: this.props.user.username,
            name: this.props.user.name,
            email: this.props.user.email,
            phone: this.props.user.phone
        });
    }
    
    saveProfileChanges() {
        const userData = { 
            username: this.state.username,
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password
        }
                
        this.setState({ isUpdatingProfile: true });
        
		fetch(Backend.users('update'), {
            method: 'POST',
            body: JSON.stringify({ user: userData }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '.concat(localStorage.getItem('token'))
            }
        }).then(response => {
        if (!response.ok) { throw response }
            return response.json();
        }).then(json => {
            this.setState({ successfulProfileUpdateMessageShown: true, isUpdatingProfile: false });
        }).catch(error => {
            this.setState({ isUpdatingProfile: false });
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
            <HeaderComponent/>
            { this.renderUserProfileForm() }
            { this.renderProfileUpdateSuccessAlertDialog() }
        </IonContent>
    }
    
    renderUserProfileForm() {
        if(this.state.isUpdatingProfile) {
            return <div className="ion-text-center">
                <br/><br/>
                <ClipLoader
                    sizeUnit={"px"}
                    size={100}
                    color={'#FC7213'}
                    loading={true} />
        	    <p className="ion-text-center page-subtitle">Actualizando tu perfil, por favor espera</p>
            </div>
        } else {
            return <div>
                <div className="ion-text-end ion-padding-end">
                    { this.renderHeaderButtons() }
                </div>
                <IonCard>					
    	      	    <IonCardHeader>
    	        	    <IonCardTitle><p className="ion-text-center">Editar cuenta</p></IonCardTitle>
    	      	    </IonCardHeader>

    	      	    <IonCardContent>
        				<IonInput id="name" style={ Styling.inputField() } placeholder="Tu nombre (Opcional)" value={ this.state.name } onIonChange={this.updateField}></IonInput>
        				<IonInput id="username" style={ Styling.inputField() } placeholder="Nombre de usuario" value={ this.state.username } onIonChange={this.updateField} required></IonInput>
        				<IonInput id="email" style={ Styling.inputField() } placeholder="Email" type="email" value={ this.state.email } onIonChange={this.updateField} required></IonInput>
			
        				<IonInput id="password" style={ Styling.inputField() } placeholder="Contraseña" type="password" value={this.state.password } onIonChange={this.updateField} required></IonInput>
	
        				<IonInput id="phone" style={ Styling.inputField() } placeholder="Tu What's App (Opcional)" value={ this.state.phone } onIonChange={this.updateField}></IonInput>
        				<p className="fieldNote">Nos va a facilitar coordinar la recolección de los reciclables.</p>
    	      	    </IonCardContent>
    	    	</IonCard>
                <div className="ion-padding">
    				<IonButton expand="block" onClick={ this.saveProfileChanges }>Guardar cambios</IonButton>                
        		</div>
            </div>
        }
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
    
    renderProfileUpdateSuccessAlertDialog() {
        return <IonAlert
            isOpen={this.state.successfulProfileUpdateMessageShown}
            onDidDismiss={() => this.setState(() => ({ successfulProfileUpdateMessageShown: false }))}
            header={'Yupiee'}
            message={'Los cambios a tu perfil han sido guardados'}
            buttons={[{
                text: 'Aceptar',
                handler: () => {
                    this.props.dismiss();
                }
              }
        ]} />
    }
}

export default EditUserProfilePage;
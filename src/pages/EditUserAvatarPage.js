import React, { Component } from 'react';
import { IonRow, IonCol, IonAlert, IonIcon, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonItem, IonSelect, IonSelectOption, IonInput, IonChip, IonLabel } from '@ionic/react';
import { ClipLoader } from 'react-spinners';

import logo from '../recyclo-logo.svg';

import Backend from '../Backend';

class EditUserAvatarPage extends Component {
    
	constructor(props) {
		super(props);
        
        this.saveProfileChanges = this.saveProfileChanges.bind(this);
		this.state = { avatarURL: "", isUpdatingAvatar: false, successfulAvatarUploadMessageShown: false };
	}
    
    componentWillReceiveProps() {
        this.setState({ avatarURL: this.props.userAvatar });
    }
    
    saveProfileChanges() {
        const userData = { 
            avatar: this.state.avatarURL
        }
        
        this.setState({ isUpdatingAvatar: true });
        
		var result = fetch(Backend.users('changeAvatar'), {
            method: 'POST',
            body: JSON.stringify({ user: userData }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '.concat(localStorage.getItem('token'))
            }
        })
		.then(response => {
            if (!response.ok) { throw response }
                return response.json();
            })
		.then(json => {
            this.setState({ isUpdatingAvatar: false, successfulAvatarUploadMessageShown: true });
        })
		.catch(error => {
            this.setState({ isUpdatingAvatar: false });
			error.json().then(jsonError => {
	            alert(jsonError.error);
	        })
        });
    }
    
    selectAvatarWithURL(url) {
        this.setState({ avatarURL: url });
    }
    
    render() {
        return <IonContent>
            { this.renderAvatarUpdateSuccessAlertDialog() }
            { this.renderHeader() }
            { this.renderContent() }
        </IonContent>
    }
    
    renderContent() {
        if(this.state.isUpdatingAvatar) {
            return <div className="ion-text-center">
                <br/><br/>
                <ClipLoader
                    sizeUnit={"px"}
                    size={100}
                    color={'#FC7213'}
                    loading={true} />
        	    <p className="ion-text-center page-subtitle">Cambiando tu avatar, por favor espera</p>
            </div>
        } else {
            return <div>
                <div className="ion-text-end ion-padding-end">
                    { this.renderHeaderButtons() }
                </div>
          	    <IonCardHeader>
            	    <IonCardTitle><h2 className="ion-text-center">Cambiar avatar</h2></IonCardTitle>
            	    <IonCardSubtitle><p className="ion-text-center">Haz tap/click en el avatar que más te guste</p></IonCardSubtitle>
          	    </IonCardHeader>
                <IonCardContent>
                    { this.renderAvatarList() }
                </IonCardContent>
            </div>
        }
    }
    
    renderHeader() {
        return <IonCard> <img src={logo} className="App-logo" alt="logo" /></IonCard>
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
    
    renderAvatarList() {
        const avatars = [
            "https://media.giphy.com/media/GObRHYaUQWf3q/giphy.gif",
            "https://media.giphy.com/media/12QMzVeF4QsqTC/giphy.gif",
            "https://media.giphy.com/media/APPbIpIe0xrVe/giphy.gif",
            "https://media.giphy.com/media/KhlVSyjsbx18A/giphy.gif"
        ];
        
        const avatarList = avatars.map((avatarURL, index) => {
			var avatarClasses = "avatar-small-image";
			if(avatarURL === this.state.avatarURL) {
				avatarClasses = "avatar-small-image avatar-selected";
			}
            return <IonCol size="6" className="ion-text-center hydrated" onClick={ this.selectAvatarWithURL.bind(this, avatarURL) }>
                <img alt="" className={ avatarClasses } src={ avatarURL } />
            </IonCol>
        })
        
        return <IonRow>
            { avatarList }
        </IonRow>
    }
    
    renderAvatarUpdateSuccessAlertDialog() {
        return <IonAlert
            isOpen={this.state.successfulAvatarUploadMessageShown}
            onDidDismiss={() => this.setState(() => ({ successfulAvatarUploadMessageShown: false }))}
            header={'Yupiee'}
            message={'Ya estás estrenando nuevo avatar'}
            buttons={[{
                text: 'Aceptar',
                handler: () => {
                    this.props.dismiss();
                }
              }
        ]} />
    }
}

export default EditUserAvatarPage;
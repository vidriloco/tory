
        
import React, { Component } from 'react';
import { IonRow, IonCol, IonAlert, IonIcon, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonItem, IonSelect, IonSelectOption, IonInput, IonChip, IonLabel } from '@ionic/react';

import logo from '../recyclo-logo.svg';

import Backend from '../Backend';

class EditUserAvatarPage extends Component {
    render() {
        return <IonRow>
          <IonCol size="6">
            <img alt="" className="slide-item-small-image" src="https://media.giphy.com/media/GObRHYaUQWf3q/giphy.gif" />
          </IonCol>
          <IonCol size="6">
            <img alt="" className="slide-item-small-image" src="https://media.giphy.com/media/GObRHYaUQWf3q/giphy.gif" />
          </IonCol>
        </IonRow>
    }
    
	renderSlider() {
		if(this.state.avatars.length == 0) {
			return 
		}
		
		const materials = this.state.avatars.filter((item) => item != null).map((avatarURL, index) => {
			var classNameForMaterial = "slide-item-small-image";
            return <IonSlide key={index}>
				<div className="slide-item-margin">
					<img alt="" className={ classNameForMaterial } src={ avatarURL } />
				</div>
			</IonSlide>
        })
		
		const thisObject = this;
		return <IonSlides pager={true} onIonSlideTransitionEnd={ this.onSlideTransitionEnd.bind(this, thisObject) }>
			{ materials }
	  </IonSlides>
	}
    
    setUserAvatarAsFirstInSlider() {
        const avatar = this.props.user.avatar;
        var avatarList = [
                "https://media.giphy.com/media/GObRHYaUQWf3q/giphy.gif",
                "https://media.giphy.com/media/12QMzVeF4QsqTC/giphy.gif",
                "https://media.giphy.com/media/APPbIpIe0xrVe/giphy.gif",
                "https://media.giphy.com/media/KhlVSyjsbx18A/giphy.gif"
            ];
        
        var index = avatarList.indexOf(avatar);
        if (index > -1) {
          avatarList.splice(index, 1);
        }
        
        this.setState({ avatars: [avatar].concat(avatarList) });
    }
}

export default EditUserAvatarPage;
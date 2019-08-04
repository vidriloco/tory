import React, { Component } from 'react';
import headerImage from '../contact-us.svg';
import { IonContent, IonModal, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonIcon, IonList, IonItem, IonItemSliding } from '@ionic/react';
import PrivacyPolicyComponent from './PrivacyPolicyComponent';

class AboutComponent extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            isShowingPrivacyPolicy: false
		}
        
        this.shareTwitter = this.shareTwitter.bind(this);
        this.shareFacebook = this.shareFacebook.bind(this);
        this.shareEmail = this.shareEmail.bind(this);
        this.openPrivacyNotice = this.openPrivacyNotice.bind(this);
    }
    
    render() {
        return this.renderInformationCard();
    }
    
    renderInformationCard() {
        return <div>
            { this.renderPrivacyPolicyModal() }
            <IonCard>
                { this.renderDecorationHeader() }
              	<IonCardHeader>
            	    <IonCardTitle><h4 className="page-title no-vertical-padding ion-text-center">{ this.props.title }</h4></IonCardTitle>
              	</IonCardHeader>
            	<IonCardContent>                
                    <IonList>
                        <IonItemSliding>
                            <IonItem onClick={ this.shareFacebook }>
                                <IonLabel>{this.props.socialMedia.fb.title }</IonLabel>
                                <IonIcon slot="end" name="logo-facebook" color="primary" />
                            </IonItem>
                            <IonItem onClick={ this.shareTwitter }>
                                <IonLabel>{this.props.socialMedia.tw.title }</IonLabel>
                                <IonIcon slot="end" name="logo-twitter" color="secondary" />
                            </IonItem>
                            <IonItem onClick={ this.shareEmail }>
                                <IonLabel>{this.props.socialMedia.email.title }</IonLabel>
                                <IonIcon slot="end" name="at" color="tertiary" />
                            </IonItem>
                            <IonItem onClick={ this.openPrivacyNotice }>
                                <IonLabel align="center"><b>Aviso de privacidad</b></IonLabel>
                            </IonItem>
                        </IonItemSliding>
                    </IonList>
                </IonCardContent>
            </IonCard>
        </div>
    }
    
    renderDecorationHeader() {
        return <img src={ headerImage } alt={ this.props.headerSeoTitle } />
    }
    
    renderPrivacyPolicyModal() {
        return <IonModal isOpen={this.state.isShowingPrivacyPolicy} 
            onDidDismiss={() => this.setState(() => ({ isShowingPrivacyPolicy: false }))}>
            <IonContent>
                <PrivacyPolicyComponent dismiss={ this.dismissPrivacyPolicyModal.bind(this) }/>
            </IonContent>
        </IonModal>
    }
    
    shareTwitter() {
        window.open(this.props.socialMedia.tw.url, "_blank");
    }
    
    shareFacebook() {
        window.open(this.props.socialMedia.fb.url, "_blank");
    }
    
    shareEmail() {
        window.open("mailto:".concat(this.props.socialMedia.email.url));
    }
    
    openPrivacyNotice() {
        this.setState({ isShowingPrivacyPolicy: true });
    }
    
    dismissPrivacyPolicyModal() {
        this.setState({ isShowingPrivacyPolicy: false });
    }
}

export default AboutComponent;

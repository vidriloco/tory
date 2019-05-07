import React, { Component } from 'react';
import { IonAlert, IonIcon, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonChip } from '@ionic/react';
import { ClipLoader } from 'react-spinners';

import logo from '../recyclo-logo.svg';
import emptyOffersBacket from '../empty-offer-icon.svg';
import Backend from '../Backend';

class ProfilePage extends Component {
	
	constructor(props) {
		super(props);	        
        this.state = { offers: [], isBusy: false, alertShownForDeletion: false, deletionSuccessfulMessageShown: false, deletionFailedMessageShown: true };	
        
		this.fetchUserOffers = this.fetchUserOffers.bind(this);
        
        // Nasty hack to make sure this function is called when the view becomes visible
        this.props.history.listen((location, action) => {
            if(location.pathname === "/profile") {
        		this.fetchUserOffers();
            }
        });
	}
    
    componentDidMount(){
        this.fetchUserOffers();
    }
    
    fetchUserOffers() {
        this.setState({ isBusy: true });
		var result = fetch(Backend.offers('list'), {
			headers: {
			    'Content-Type': 'application/json',
			    'Authorization': 'Bearer '.concat(localStorage.getItem('token'))
            }
        }).then(response => {
    		this.setState({ isBusy: false });
            if (!response.ok) { throw response }
            return response.json();
        }).then(json => {
    		this.setState({ offers: json.offers });
        }).catch(error => {
    		error.json().then(jsonError => {
    	      alert(jsonError.error);
    	    })
        });
    }
    
	logout() {
		localStorage.setItem('token', '');
		this.props.history.push("/");
	}
    
    editUserProfile() {
        
    }
    
    confirmDeletionForItem(selectedItemIndex) {
        this.setState({ alertShownForDeletion: true, selectedItemIndex: selectedItemIndex });
    }
    
    deleteSelectedOffer() {
		var result = fetch(Backend.offers('delete', this.state.selectedItemIndex), {
            method: 'POST',
			headers: {
			    'Content-Type': 'application/json',
			    'Authorization': 'Bearer '.concat(localStorage.getItem('token'))
            }
        }).then(response => {
            if (!response.ok) { throw response }
            return response.json();
        }).then(json => {
    		this.setState({ offers: json.offers, deletionSuccessfulMessageShown: true });
        }).catch(error => {
            this.setState({ deletionFailedMessageShown: true });
    		error.json().then(jsonError => {
    	      alert(jsonError.error);
    	    })
        });
    }

	render() {
		return <IonContent>
            { this.renderDeleteFailureAlertMessage() }
            { this.renderDeleteSuccessAlertDialog() }
            { this.renderDeleteConfirmationAlertDialog() }
            { this.renderHeader() }
            { this.renderUserProfile() }
			{ this.renderOffers() }
		</IonContent>
	}
    
    renderDeleteConfirmationAlertDialog() {
        return <IonAlert
            isOpen={this.state.alertShownForDeletion}
            onDidDismiss={() => this.setState(() => ({ alertShownForDeletion: false }))}
            header={'Confirma por favor'}
            message={'En verdad deseas eliminar esta oferta?'}
            buttons={[
              {
                text: 'No',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                    this.setState({ alertShownForDeletion: false });
                }
              }, {
                text: 'Si, eliminar',
                handler: () => {
                    this.deleteSelectedOffer();
                }
              }
        ]} />
    }
    
    renderDeleteFailureAlertMessage() {
    return <IonAlert
        isOpen={this.state.deletionFailedMessageShown}
        onDidDismiss={() => this.setState(() => ({ deletionFailedMessageShown: false }))}
        header={'Lo sentimos :('}
        message={'No fue posible eliminar esta oferta. Intenta de nuevo más tarde'}
        buttons={['Aceptar']} />
    }
    
    renderDeleteSuccessAlertDialog() {
        return <IonAlert
            isOpen={this.state.deletionSuccessfulMessageShown}
            onDidDismiss={() => this.setState(() => ({ deletionSuccessfulMessageShown: false }))}
            header={'Noticia'}
            message={'La oferta ha sido eliminada'}
            buttons={['Aceptar']} />
    }
    
    renderHeader() {
        return <IonCard> <img src={logo} className="App-logo" alt="logo" /></IonCard>
    }
    
    renderUserProfile() {
        return <div className="ion-text-center user-profile">
            <img src="https://media.giphy.com/media/12QMzVeF4QsqTC/giphy.gif" className="user-profile-image" />
            <h2 className="page-title no-vertical-padding">Alejandro Cruz</h2>
            <p className="page-title no-vertical-padding">@vidriloco</p>
            <br/>
            <IonChip color="primary" outline="primary" onClick={ this.editUserProfile.bind(this) }>
                <IonIcon name="create" />
                <IonLabel>Editar</IonLabel>
            </IonChip>
            <IonChip color="danger" outline="primary" onClick={ this.logout.bind(this) }>
                <IonIcon name="power" />
                <IonLabel>Cerrar Sesión</IonLabel>
            </IonChip>
        </div>
    }
    
	renderUserOffersCard() {
		return <IonCard>					
            <IonCardHeader>
            	<IonCardTitle><h4 className="ion-text-center page-title no-vertical-padding">Lo que has ofertado</h4></IonCardTitle>
            </IonCardHeader>
			
            { this.renderOffers() }
    	</IonCard>
	}
    
    renderOffers() {
        if(this.state.isBusy) {
            return <IonCard>
                <IonCardContent className="ion-text-center">
                    <br/>
                    <ClipLoader
                        sizeUnit={"px"}
                        size={45}
                        color={'#FC7213'}
                        loading={true} />
    			    <p className="ion-text-center page-subtitle">Cargando reciclables ofertados ...</p>
        	    </IonCardContent>
            </IonCard> 
        } else {
            if(this.state.offers.length == 0) {
                return <IonCard>
                    <IonCardContent>
                        <img src={emptyOffersBacket} alt="No hay ofertas" height="60" />
                        <br/>
        			    <p className="ion-text-center page-subtitle">Aún no has publicado ninguna oferta</p>
            	    </IonCardContent>
                    <IonCardContent>
        			    <p className="ion-text-center page-subtitle">Haz tap en <b>Nuevo</b> para publicar tu primer oferta</p>
					
                    </IonCardContent>
                </IonCard>
            } else {
        		const offers = this.state.offers.map((offer, index) => {
                
                    const offerStatus = offer.status === "collected" ? "checkmark-circle" : "hourglass";
                    const offerStatusColor = offer.status === "collected" ? "success" : "primary";
                
        		    return <IonCardContent key={index}>
                        <IonList>
                            <IonItem>
                                <IonLabel text-wrap>{ offer.title } - { offer.zone }</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel text-wrap>{ offer.message }</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonChip color={ offerStatusColor } className="ion-color ion-color-primary ion-activatable hydrated">
                                    <IonLabel className="sc-ion-label-ios-h sc-ion-label-ios-s hydrated">
                                        <IonIcon name={ offerStatus }></IonIcon> { offer.localizedStatus }
        							</IonLabel>
        		                </IonChip>
                                <IonButton color="danger" onClick={ this.confirmDeletionForItem.bind(this, offer.id) }>
                                    <IonIcon name="trash"></IonIcon>
                                </IonButton>
        					</IonItem>
        				</IonList>
		
        			</IonCardContent>
        		}); 
            
                return <IonCard>
                    <IonCardHeader>
                    	<IonCardTitle><h4 className="ion-text-center page-title no-vertical-padding">Lo que has ofertado</h4></IonCardTitle>
                    </IonCardHeader>
                    { offers }
                </IonCard>
            }
        }
    }
}

export default ProfilePage;
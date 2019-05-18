import React, { Component } from 'react';
import { IonContent, IonCard, IonLabel, IonList, IonItem, IonAvatar } from '@ionic/react';
import HeaderComponent from '../components/HeaderComponent'
import Backend from '../Backend';
import { ClipLoader } from 'react-spinners';

import GoogleMapReact from 'google-map-react';


class DiscoverPage extends Component {
	
	constructor(props) {
		super(props);	        
        this.state = { 
            donations: [], 
            isFetchingDonations: false
        };
        
        // Nasty hack to make sure this function is called when the view becomes visible
        this.props.history.listen((location, action) => {
            if(location.pathname === "/discover") {
        		this.fetchDonations();
            }
        });
	}
    
    componentDidMount(){
        this.fetchDonations();
    }
    
    fetchDonations() {
        this.setState({ isFetchingDonations: true });
        
		fetch(Backend.donations('list'), {
			headers: {
			    'Content-Type': 'application/json',
			    'Authorization': 'Bearer '.concat(localStorage.getItem('token'))
            }
        }).then(response => {
            if (!response.ok) { throw response }
            return response.json();
        }).then(json => {
    		this.setState({ donations: json.donations, isFetchingDonations: false });
        }).catch(error => {
    		this.setState({ isFetchingDonations: false });
    		error.json().then(jsonError => {
    	      alert(jsonError.error);
              // Reset session on client-side if token is not authentic
              if(jsonError.reason === "not-authenticated") {
          		this.logout();
              }
    	    })
        });
    }
    
	render() {
        var content = <div className="ion-text-center">
                <br/><br/>
                <ClipLoader
                    sizeUnit={"px"}
                    size={40}
                    color={'#FC7213'}
                    loading={true} />
        	    <p className="ion-text-center page-subtitle">Cargando contenido ...</p>
            </div>
                    
        if(!this.state.isFetchingDonations) {
            content = this.state.donations.map((donation, index) => {
                return this.renderDonation(donation, index);
            });
        }
        
    	return <IonContent>
    		<HeaderComponent/>
            { content }
    	</IonContent>
	}
    
    renderDonation(donation, index) {
        return <IonCard>
            <IonList>
              <IonItem lines="none">
                <IonAvatar>
                    <img alt="Avatar" src={ donation.avatar } className="user-profile-image-small" />
                </IonAvatar>
                <IonLabel>
                    <h2 className="ion-padding-start"><b>{ donation.title }</b></h2>
                    <h3 className="ion-padding-start">{ donation.subtitle }</h3>
                    <p className="ion-padding-start">hace { donation.date }</p>
                </IonLabel>
              </IonItem>
            </IonList>
            { this.renderMapForLocationWith(donation.latitude, donation.longitude, donation.material) }
        </IonCard>
    }
    
    renderMapForLocationWith(latitude, longitude, material) {
        const greatPlaceStyle = {
          position: 'absolute',
          transform: 'translate(-50%, -50%)'
        }
        
        return <div style={{ height: '30vh', width: '100%' }}><GoogleMapReact
          defaultZoom={12}
          defaultCenter={ {lat: latitude, lng: longitude} }
          bootstrapURLKeys={{
              key: 'AIzaSyCjmOEbx3qs0F2k2Cbb4Z2cdAkdMoQoJTw'
          }}
          options={ { draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true} }
          yesIWantToUseGoogleMapApiInternals>
          <div style={greatPlaceStyle}>
              <img width="60" height="60" alt="Avatar" src={ material } className="material-map-image" />
          </div>
        </GoogleMapReact></div>
    }
}

export default DiscoverPage;

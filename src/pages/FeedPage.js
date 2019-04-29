import React, { Component } from 'react';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonChip } from '@ionic/react';
import logo from '../recyclo-logo.svg';
import Backend from '../Backend';

class FeedPage extends Component {
	
	constructor(props) {
		super(props);

		this.state = { 
			materials: [{ value: "aluminium-can", humanized: "Lata", enabled: true }] 
		}
		
		this.logout = this.logout.bind(this);
	}
	
	componentWillMount() {
		this.fetchMaterialTypes();
	}
	
	renderTypes() {
		return <IonItem>
        <IonLabel>Unidades</IonLabel>
        <IonSelect interface="action-sheet" placeholder="Seleccionar">
          <IonSelectOption value="bags">Bolsas</IonSelectOption>
          <IonSelectOption value="units">Latas</IonSelectOption>
          <IonSelectOption value="kgs">Kilos</IonSelectOption>
        </IonSelect>
      </IonItem>
	}
	
	activeItems() {
		return <div>
			<h4 className="ion-text-center">Transacciones abiertas</h4>
			<IonCard>					
				<IonCardContent>
					<IonList>
			      <IonItem>
			        <IonLabel text-wrap>
			          Latas - 5 kilos
			        </IonLabel>
			      </IonItem>
						<IonItem>
			        <IonLabel text-wrap>
								Te contactaremos en breve para coordinar la recolección de tus reciclables.
			        </IonLabel>
			      </IonItem>
						<IonItem>
							<IonChip color="primary" className="ion-color ion-color-primary ion-activatable hydrated">
			          <IonLabel className="sc-ion-label-ios-h sc-ion-label-ios-s hydrated">
									<ion-icon name="hourglass"></ion-icon> En revisión
								</IonLabel>
			        </IonChip>
							<IonButton color="warning" href="/edit-offer/1"><ion-icon name="create"></ion-icon></IonButton>
							<IonButton color="danger"><ion-icon name="trash"></ion-icon></IonButton>
						</IonItem>
					</IonList>
				
				</IonCardContent>
    	</IonCard>
		</div>
	}
	
	inactiveItems() {
		return <div>
			<h4 className="ion-text-center">Transacciones completadas</h4>
			<IonCard>					
				<IonCardContent>
					<IonList>
			      <IonItem>
			        <IonLabel text-wrap>
			          Latas - 10 bolsas
			        </IonLabel>
			      </IonItem>
						<IonItem>
			        <IonLabel text-wrap>
								Recolectado hace 2 semanas, gracias!
			        </IonLabel>
			      </IonItem>
						<IonItem>
							<IonChip color="success" className="ion-color ion-color-primary ion-activatable hydrated">
			          <ion-icon name="checkmark"></ion-icon> <IonLabel className="sc-ion-label-ios-h sc-ion-label-ios-s hydrated">Recolectado</IonLabel>
			        </IonChip>
						</IonItem>
					</IonList>
				
				</IonCardContent>
    	</IonCard>
		</div>
	}
	
	renderOfferPrompt() {
		const materialItems = this.state.materials.filter((material) => material.enabled).map((material) => 
		<IonButton key={ material.value } expand="block" href={ "/new-offer/".concat(material.value).concat("/").concat(material.humanized) }>{ material.humanized }</IonButton>);
				
		return <div>
			<IonCard>
				<img src={logo} className="App-logo" alt="logo" />
			</IonCard>
			<IonCard>					
				<IonCardHeader>
			  	<IonCardTitle><p className="ion-text-center">Ofrecer en Recyclo</p></IonCardTitle>
				</IonCardHeader>
		
				<IonCardContent>
					{ materialItems }
				</IonCardContent>
			</IonCard>
		</div>
	}
	
	fetchMaterialTypes() {
		var result = fetch(Backend.materials('list'), {
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
			this.setState({ materials: json.materials });
    })
		.catch(error => {
			error.json().then(jsonError => {
	      alert(jsonError.error);
	    })
    });
	}
	
	renderBackForm() {
		return <IonContent className="ion-padding">
				<IonButton color="dark" size="small" onClick={this.logout}>Cerrar Sesión</IonButton>
			</IonContent>
	}
	
	logout() {
		localStorage.setItem('token', '');
		this.props.history.push("/");
	}
	
	render() {
		return <IonContent>
			{ this.renderOfferPrompt() }
			{ this.activeItems() }
			{ this.inactiveItems() }
			{ this.renderBackForm() }
		</IonContent>
	}
}

export default FeedPage;
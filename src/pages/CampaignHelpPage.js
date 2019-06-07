import React, { Component } from 'react';
import { IonSlide, IonSlides, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/react';
import HeaderComponent from '../components/HeaderComponent';

class CampaignHelpPage extends Component {
	
	constructor(props) {
        super(props);

        this.slides = React.createRef();
    }
    
    render() {
        return (
            <IonContent>
				<HeaderComponent slogan={ "Facilitamos la recolección de residuos reciclables de manera colaborativa" } />
                { this.renderPromoSlider() }
                { this.renderLoginCard() }
			</IonContent>
        );
    }
    
    goNext() {
        this.slides.current.slideNext();
    }
    
    goPrevious() {
        this.slides.current.slidePrev();
    }
    
	renderPromoSlider() {
        return <div>
            <div className="swiper-button-next" onClick={ this.goNext.bind(this) }></div>
            <div className="swiper-button-prev" onClick={ this.goPrevious.bind(this) }></div>
            <IonSlides pager={true} ref={this.slides}>
                <IonSlide>
                    <IonCard>
                      	<IonCardHeader>
                        	<IonCardTitle><h4 className="page-title no-vertical-padding">¿Cómo ganar dinero dando lata?</h4></IonCardTitle>
                			<p className="page-subtitle no-vertical-padding">Usa las flechitas o desliza a los lados para saber más</p>
                      	</IonCardHeader>
                        <img alt="Gana lana" src="https://media.giphy.com/media/xUOwGaM5hOLm9xYvTy/giphy.gif" className="recyclo-slider-image" />
                    </IonCard>
                </IonSlide>
                <IonSlide>
                    <IonCard>
                      	<IonCardHeader>
                        	<IonCardTitle><h4 className="page-title no-vertical-padding">Separa y almacena lata</h4></IonCardTitle>
                			<p className="page-subtitle no-vertical-padding">Revisa que este lo más seca posible y aplastala.</p>
                      	</IonCardHeader>
                        <img alt="Tutorial" src="https://media.giphy.com/media/qmcZymbr1WNeU/giphy.gif" className="recyclo-slider-image" />
                      	<IonCardHeader>
                			<p className="page-subtitle no-vertical-padding">Junta <b>5kg</b> o más.</p>
                      	</IonCardHeader>
                    </IonCard>
                </IonSlide>
                <IonSlide>
                    <IonCard>
                      	<IonCardHeader>
                        	<IonCardTitle><h4 className="page-title no-vertical-padding">Publícala en Recyclo</h4></IonCardTitle>
                			<p className="page-subtitle no-vertical-padding">Es muy fácil, solamente necesitamos saber donde recogerla.</p>
                      	</IonCardHeader>
                        <img alt="Tutorial" src="https://media.giphy.com/media/13HBDT4QSTpveU/giphy.gif" className="recyclo-slider-image" />
                      	<IonCardHeader>
                			<p className="page-subtitle no-vertical-padding">Por ahora solo estamos operando en algunas colonias de la <b>CDMX</b></p>
                      	</IonCardHeader>
                    </IonCard>
                </IonSlide>
                <IonSlide>
                    <IonCard>
                      	<IonCardHeader>
                        	<IonCardTitle><h4 className="page-title no-vertical-padding">Te pagamos 70% de su valor</h4></IonCardTitle>
                			<p className="page-subtitle no-vertical-padding">Según el precio del kilo de lata el día de la recolección.</p>
                      	</IonCardHeader>
                        <img alt="Tutorial" src="https://media.giphy.com/media/67ThRZlYBvibtdF9JH/giphy.gif" className="recyclo-slider-image" />
                      	<IonCardHeader>
                			<p className="page-subtitle no-vertical-padding">El precio de la lata ronda por lo regular los <b>$20 MXN por Kilo</b></p>
                      	</IonCardHeader>
                    </IonCard>
                </IonSlide>
                <IonSlide>
                    <IonCard>
                      	<IonCardHeader>
                        	<IonCardTitle><h4 className="page-title no-vertical-padding">Empieza hoy</h4></IonCardTitle>
                			<p className="page-subtitle no-vertical-padding">Crea tu cuenta y empieza a publicar</p>
                      	</IonCardHeader>
                        <img alt="Tutorial" src="https://media.giphy.com/media/fsc7c7TYKulQ4lmmAo/giphy.gif" className="recyclo-slider-image" />
                    </IonCard>
                </IonSlide>
    	  </IonSlides>
        </div>
	}
    
    renderLoginCard() {        
        return <IonCard>
            <IonCardContent>
                <IonButton expand="block" href="/sign-up">Crear una cuenta</IonButton>
                <IonButton expand="block" fill="outline" href="/landing">Atrás</IonButton>
            </IonCardContent>
        </IonCard>
    }
}

export default CampaignHelpPage;
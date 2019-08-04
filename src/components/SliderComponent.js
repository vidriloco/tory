import React, { Component } from 'react';
import { IonCard, IonSlides, IonSlide, IonCardHeader, IonCardTitle } from '@ionic/react';

class SliderComponent extends Component {
    
    constructor(props) {
        super(props);
        this.slides = React.createRef();
        
        this.state = {
            slideDefaultClassName: this.props.enabledClassName || "slide-item-image",
            slideDisabledClassName: this.props.disabledClassName || "disabled-item"
        }
    }
    
    goNext() {
        this.slides.current.slideNext();
    }
    
    goPrevious() {
        this.slides.current.slidePrev();
    }
    
    renderSlidesCollection() {
		return this.props.dataSource.map((slide, index) => {
			var classNameForMaterial = this.state.slideDefaultClassName;
			
            if(!slide.enabled) {
				classNameForMaterial += " " + this.state.slideDisabledClassName;
			}
            
            if(typeof slide.description !== null) {
                return <IonSlide key={index}>
                    <IonCard>
                      	<IonCardHeader>
                        	<IonCardTitle><h4 className="page-title no-vertical-padding">{ slide.title }</h4></IonCardTitle>
                			<p className="page-subtitle no-vertical-padding">{ slide.description }</p>
                      	</IonCardHeader>
    					<img alt={ slide.imageAlt } className={ slide.imageClassName } src={ slide.imageSrc } />
                    </IonCard>
    			</IonSlide>
            } else {
                return <IonSlide key={index}>
    				<div className="slide-item-margin">
    					<img alt={ slide.imageAlt } className={ slide.imageClassName } src={ slide.imageSrc } />
    					<h1 className="slide-item-title">{ slide.title }</h1>
    				</div>
    			</IonSlide>
            }
        })
    }
    
    render() {
        return <div>
            <div className="swiper-button-next" onClick={ this.goNext.bind(this) }></div>
            <div className="swiper-button-prev" onClick={ this.goPrevious.bind(this) }></div>
            <IonSlides pager={true} ref={this.slides}>
                { this.renderSlidesCollection() }
            </IonSlides>
        </div>
    }
}

export default SliderComponent;

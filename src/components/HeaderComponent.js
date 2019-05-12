import React, { Component } from 'react';
import { IonCard } from '@ionic/react';

import logo from '../recyclo-logo.png';

class HeaderComponent extends Component {
    render() {
        
        var slogan = null;
        if(typeof this.props.slogan !== "undefined") {
            slogan = <p className="slogan-recyclo">Facilitamos la recolección de residuos reciclables mediante el <i>crowdsourcing</i></p>;
        }
        
        return <IonCard>
    			<img src={logo} className="App-logo" alt="logo" />
                { slogan }
    		</IonCard>
    }
}

export default HeaderComponent;

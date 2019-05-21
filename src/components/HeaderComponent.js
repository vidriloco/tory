import React, { Component } from 'react';
import { IonCard } from '@ionic/react';

import logo from '../recyclo-logo.png';

class HeaderComponent extends Component {
    render() {
        
        var slogan = null;
        if(typeof this.props.slogan !== "undefined") {
            slogan = <h1 className="slogan-recyclo">{ this.props.slogan }</h1>;
        }
        
        return <IonCard>
    			<img src={logo} className="App-logo" alt="logo" />
                { slogan }
    		</IonCard>
    }
}

export default HeaderComponent;

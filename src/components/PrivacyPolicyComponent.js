import React, { Component } from 'react';
import { IonChip, IonLabel, IonCardContent, IonCard, IonCardHeader, IonCardTitle, IonButton } from '@ionic/react';

import HeaderComponent from './HeaderComponent'

class PrivacyPolicyComponent extends Component {
    
    render() {
        return <div>
            <HeaderComponent />
            <div className="ion-text-end ion-padding-end">
                { this.renderHeaderButtons() }
            </div>
            <IonCard>
              	<IonCardHeader>
            	    <IonCardTitle><h2 className="page-title no-vertical-padding ion-text-center">Aviso de Privacidad</h2></IonCardTitle>
              	</IonCardHeader>
            	<IonCardContent>                
                    { this.renderText() }
                </IonCardContent>
            </IonCard>
            <div className="ion-margin">
                <IonButton expand="block" color="primary" onClick={ () => this.props.dismiss() }>Aceptar</IonButton>  
            </div>      
        </div>
    }
    
    renderHeaderButtons() {
        return <div>
        <IonChip color="primary" outline="primary" onClick={ () => this.props.dismiss() }>
              <IonLabel>Cerrar</IonLabel>
            </IonChip>
        </div>
    }
    
    renderText() {
        return <div>
            <p>Fiets Tecnología Móvil SAPI de CV es una sociedad mercantil bajo las leyes mexicanas.<br/>
            Fiets Tecnología Móvil SAPI de CV recolecta tus datos personales, como se explica en esta política, con el propósito de informarte sobre noticias e información diversa relacionada con la recolección de reciclables, el cuidado del medio ambiente y la responsabilidad social, así como para ofrecerte bienes y servicios relacionados con estos temas.<br/>
            La protección de los datos es una preocupación importante para Fiets Tecnología Móvil SAPI de CV. Por esta razón, operamos nuestras actividades en este sitio web de acuerdo a las disposiciones legales aplicables para la protección de datos personales, en particular la Ley Federal de Protección de Datos Personales (LFPDP) mexicana. Una transferencia de tus datos a terceras partes se haría solamente con las bases legales apropiadas y con tu consentimiento.</p>
            <br/>
            <h5><b>CONSENTIMIENTO DEL TITULAR</b></h5><br/>
            <p>Para efectos de lo dispuesto en la LFPDP y en particular en su artículo 17, el titular manifiesta que:</p>
            <ol>
            <li>El presente aviso de privacidad le ha sido dado a conocer por el Responsable.</li>
            <li>Que ha leído, entendido y acordado los términos señalados en este aviso de privacidad, por lo que otorga su consentimiento respecto al tratamiento de sus datos personales conforme lo establece la LFPDP y legislación aplicable.</li>
            <li>Que en caso de que los datos personales recopilados incluyan datos personales sensibles o financieros,  sean estos proporcionados en formato impreso, o utilizando medios electrónicos,  son actos que constituyen su consentimiento expreso como su titular en términos del segundo párrafo del artículo 8 de la LFPDP y demás legislación aplicable.</li>
            <li>Que otorga su consentimiento para que Fiets Tecnología Móvil SAPI de CV o sus encargados realicen transferencias de datos personales a terceros nacionales o extranjeros, en el entendido de que el tratamiento que dichos terceros den a sus datos personales deberá ajustarse a lo establecido en este aviso de privacidad.</li>
            <li>Que en caso de que el titular no se oponga a los términos del aviso de privacidad se considerará acordado y consentido su contenido y que el consentimiento del titular podrá ser revocado en cualquier momento por éste.</li>
            </ol>
            <h5><b>RECOLECCIÓN DE LOS DATOS PERSONALES</b></h5><br/>
            <p>La recolección de datos personales podrá efectuarse, por comunicación vía telefónica con el responsable o con sus encargados, empleados o bien, mediante entrega directa al responsable o mediante el uso de correos electrónicos y/o mensajes cortos de texto, o mediante la utilización de sus sitios web,  mediante el uso de herramientas de captura automática de datos. Las cuales permiten recolectar la información que envía su navegador a dichos sitios web, tales como el tipo de navegador que utiliza, el idioma de usuario, y la dirección IP de sitios web que utilizó para acceder a los sitios del responsable o encargados.<br/>
            Los siguientes son ejemplos, a título enunciativo mas no limitativo, de información que el responsable puede recopilar: nombre y apellidos; fecha de nacimiento; domicilio, sea particular, del trabajo, o fiscal; dirección de correo electrónico, personal o del trabajo; nombre de identificación en redes sociales; número telefónico, particular o del trabajo; número de teléfono celular; número cuentas bancarias; clave del Registro Federal de Contribuyentes (RFC); Clave Única de Registro de Población (CURP).<br/>
            Dentro de la documentación que puede ser recolectada por Fiets Tecnología Móvil SAPI de CV para la verificación de la identidad del titular de los datos personales se encuentra la credencial de elector; la cartilla de identidad del servicio militar nacional liberada; la cédula profesional; pasaporte; forma migratoria; la cédula de registro en el RFC; la cédula de registro con la CURP; el comprobante de domicilio; el informe especial de crédito emitido por una sociedad de información crediticia.</p>
            <br/><h5><b>FINALIDAD DE LOS DATOS PERSONALES</b></h5><br/>
            <p>Los Datos Personales del Titular son recolectados y tratados por el Responsable o sus Encargados con las siguientes finalidades:<br/>
            Enviar información relacionada con la recolección de reciclables, el cuidado del medio ambiente y, en general, el mundo de la responsabilidad social a través de distintos medios; incluyendo de manera enunciativa y no limitativa: correo electrónico, teléfono, sistemas de mensajería digital, correo postal, entre otros.<br/>
            Ofrecer bienes y servicios relacionados con empresas, gobiernos y organizaciones que llevan a cabo labores en materia de medio ambiente y responsabilidad social.<br/>
            Generar  y publicar datos y estadísticas sobre el uso del sitio web de Fiets Tecnología Móvil SAPI de CV.</p><br/>
            <h5><b>RECOLECCIÓN DE DATOS AL NAVEGAR EN SITIOS Y PÁGINAS WEB DE VALOR COLECTIVO SAPI</b></h5><br/>
            <p>Dentro de las herramientas de captura automática de datos utilizadas por Fiets Tecnología Móvil SAPI de CV en sus sitios y páginas web se encuentran las cookies, los web beacons, y los enlaces en los correos electrónicos.<br/>
            Los correos electrónicos que incluyen vínculos que permiten a Fiets Tecnología Móvil SAPI de CV saber si usted activó dicho vínculo y visitó la página web de destino, pudiendo esta información ser incluida en su perfil. En caso de que usted prefiera que Fiets Tecnología Móvil SAPI de CV no recolecte información sobre su interacción con dichos vínculos, usted puede optar por modificar el formato de las comunicaciones de Fiets Tecnología Móvil SAPI de CV (por ejemplo, que el mensaje sea recibido en formato de texto y no en formato HTML) o puede hacer caso omiso del vínculo y no acceder a su contenido.</p>
            <br/><h5><b>TRANSFERENCIAS DE DATOS</b></h5><br/>
            <p>Habiendo leído, entendido y acordado los términos expuestos en este aviso de privacidad, el titular manifiesta su consentimiento para que el responsable o cualquier encargado realicen transferencias de datos personales a terceros nacionales o extranjeros, en el entendido de que el tratamiento que dichos terceros den a los datos personales del titular deberá ajustarse a lo establecido en este aviso de privacidad.</p>
            <br/><h5><b>LIMITACIÓN DE USO Y DIVULGACIÓN DE LA INFORMACIÓN</b></h5><br/>
            <p>Los datos personales del titular recolectados por el responsable y/o sus encargados se encontrarán protegidos por medidas de seguridad administrativas, técnicas y físicas adecuadas contra el daño, pérdida, alteración, destrucción o uso, acceso o tratamiento no autorizados, de conformidad con lo dispuesto en la LFPDP y de la regulación administrativa derivada de la misma. No obstante lo señalado anteriormente, Fiets Tecnología Móvil SAPI de CV no garantiza que terceros no autorizados no puedan tener acceso a los sistemas físicos o lógicos de los titulares o del responsable o en los documentos electrónicos y ficheros almacenados en sus sistemas. En consecuencia, Fiets Tecnología Móvil SAPI de CV no será en ningún caso responsable de los daños y perjuicios que pudieran derivarse de dicho acceso no autorizado.</p>
            <br/><h5><b>DEPARTAMENTO DE DATOS PERSONALES; DOMICILIO</b></h5><br/>
            <p>Para cualquier comunicación acerca de nuestro Aviso de privacidad de Privacidad, por favor contacte a <a href="mailto:contacto@recyclo.mx">contacto@recyclo.mx</a></p>
            <br/><h5><b>PROCEDIMIENTO PARA EJERCER LOS DERECHOS COMO TITULAR DE DATOS PERSONALES</b></h5><br/>
            <p>Usted tiene, en todo momento, derecho de acceder, rectificar y cancelar sus datos personales, así como de oponerse al tratamiento de los mismos o revocar el consentimiento que para tal fin nos haya proporcionado presentando una solicitud con la información y documentación siguiente:</p>
            <ol>
            <li>Nombre del Titular, domicilio, teléfono y dirección de correo electrónico.</li>
            <li>Los documentos que acrediten su identidad (copia simple en formato impreso o electrónico de su credencial de elector, cédula profesional o pasaporte) o, en su caso, la representación legal del titular copia simple en formato impreso o electrónico de la carta poder simple con firma autógrafa del titular, el mandatario y sus correspondientes identificaciones.</li>
            <li>La descripción clara y precisa de los datos personales respecto de los que busca ejercer alguno de los derechos.</li>
            <li>Cualquier otro elemento o documento que facilite la localización de los datos personales del titular.<br/>
            En el caso de las solicitudes de rectificación de datos personales, el titular respectivo deberá también indicar las modificaciones a realizarse y aportar la documentación que sustente su petición.<br/>
            El responsable o sus encargados le responderán al titular respectivo en un plazo máximo de veinte días hábiles, contados desde la fecha en que se recibió la solicitud. Los plazos antes referidos podrán ser ampliados sólo en términos de la LFPDP.<br/>
            La entrega de los datos personales será gratuita, solamente le corresponderá cubrir los gastos justificados de envío o el costo de reproducción en copias u otros formatos.<br/>
            Para efectos de las solicitudes de cancelación de datos personales, además de lo dispuesto por el presente Aviso de privacidad, se estará a lo dispuesto en el artículo 26 de la LFPDP, incluyendo los casos de excepción de cancelación de datos personales ahí señalados.<br/>
            La presentación de una solicitud de oposición del uso de datos personales por el titular de los mismos, dará al responsable la facultad de oponerse al uso de los datos personales que como titular haya entregado al oponente.</li>
            </ol><br/>
            <h5><b>CAMBIOS AL AVISO DE PRIVACIDAD</b></h5><br/>
            <p>Fiets Tecnología Móvil SAPI de CV se reserva el derecho de actualizar periódicamente el presente aviso de privacidad para reflejar los cambios en nuestras prácticas de información. Es responsabilidad del titular revisar periódicamente el contenido del aviso de privacidad en el sitio <a href="http://Recyclo.mx">Recyclo.mx</a> en donde se publicarán los cambios realizados conjuntamente con la fecha de la última actualización. El Responsable entenderá que de no expresar lo contrario, significa que el Titular ha leído, entendido y acordado los términos ahí expuestos, lo que constituye su consentimiento a los cambios y/o actualizaciones respecto al tratamiento de sus datos personales.</p>
        </div>
    }
}

export default PrivacyPolicyComponent;
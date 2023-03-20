import React from 'react';
import tietoaMeistaKuva from "../Images/TMkuva1.jpg"
import tietoaMeistaKuva2 from "../Images/TMkuva2.jpg"
import tietoaMeistaKuva3 from "../Images/TMkuva3.jpg"
import "../css/AboutUs.css"
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';

const AboutUs = () => {

    return(
        <div>
            <section>
                <section>
                    <h1 className="header">Tietoa meistä</h1>
                </section>
                <section>
                    <p className="quote">Korkealaatuisella suomalaisella tekniikalla valmistetut koulutarvikkeet kirkkaissa väreissä ja
                            kestävissä pakkauksissa.
                    </p>
                    <MDBRow>
                    <MDBCol md="6">
                    <h4 className="subheader1">Yrityksemme</h4>
                    <div className="text">
                    <p>Kynä & Kumi on yritys, joka on omistautunut tarjoamaan korkealaatuisia
                    koulutarvikkeita kaiken ikäisille opiskelijoille. Kirjoitusvälineisiin ja kumituotteisiin keskittyvä
                    Kynä & Kumi tarjoaa laajan valikoiman tuotteita opiskelijoiden tarpeisiin päiväkodista yliopistoon.
                    Yritys on ylpeä sitoutumisestaan ​​huippuosaamiseen sekä tuotteiden laadun että asiakaspalvelun suhteen.
                    Etsitpä sitten kyniä, kyniä, pyyhekumia tai muita koulutarvikkeita, Kynä & Kumi on oikea lähde kaikkiin
                    akateemisiin tarpeisiisi. </p> 
                    <p>
                    Olemme yrityksenä sitoutuneet varmistamaan, että kaikki tarjoamamme koulutarvikkeet
                    valmistetaan korkeimpien laatustandardien mukaisesti. Hankimme huolellisesti kaikki materiaalimme luotettavilta
                    toimittajilta ja valmistamme tuotteet uusimmilla tuotantotekniikoilla ja koneilla. Tarjoamamme kynät ja lyijykynät
                    ovat valmistettu käyttäen vain laadukkaimpia materiaaleja, kuten korkealaatuisia muoveja ja kestäviä metalleja.
                    Yrityksen kynät on suunniteltu tarkasti, mikä varmistaa, että jokainen rivi on selkeä ja johdonmukainen.   
                    </p>
                    </div>
                    </MDBCol>
                    <MDBCol md="6">
                    <div className="cell-1">
                        <img src={tietoaMeistaKuva2} alt="Kuva" width="600" height="400" className="kuva1"  />
                    </div>
                    </MDBCol>
                    </MDBRow>
                </section>
                <section>
                <h4 className="subheader2">Mistä kaikki alkoi</h4>
                <p className="text">
                Kynä & Kumin perustivat vuonna 2005 kaksi ystävää, Anna ja Marko, joita jakoi intohimo koulutukseen ja
                halu luoda laadukkaita koulutarvikkeita. Inspiraation yritykselle tuli Annan kokemuksesta opettajana,
                jossa hänellä oli usein vaikeuksia löytää oppilailleen luotettavia ja kestäviä kirjoitusvälineitä ja
                vihkotuotteita. Anna ja Marko huomasivat aukon korkealaatuisten koulutarvikkeiden markkinoilla ja päättivät perustaa oman yrityksen. He aloittivat tekemällä laajaa tutkimusta kynien, kynien, pyyhekumien ja muiden koulutarvikkeiden valmistuksessa käytettävistä materiaaleista ja valmistusprosesseista.
                Heidän tutkimuksensa perusteella he huomasivat, että monet markkinoilla olevat koulutarvikkeet olivat heikkolaatuisia eivätkä vastanneet opettajien ja opiskelijoiden tarpeita. He päättivät keskittyä sellaisten kirjoitusvälineiden ja kumituotteiden valmistukseen, jotka eivät olleet vain kestäviä vaan myös mukavia käyttää.
                Heidän sitoutumisensa laatuun kannatti, ja Kynä & Kumi sai nopeasti mainetta markkinoiden parhaiden koulutarvikkeiden valmistajana. Yrityksen suosio kasvoi, ja se laajensi tuotevalikoimaansa laajaan valikoimaan kirjoitusvälineitä ja kumituotteita.
                Nykyään Kynä & Kumi on yksi markkinoiden johtavista koulutarvikkeiden toimittajista. Yrityksen perustajat ovat edelleen sitoutuneet tuottamaan korkealaatuisia tuotteita ja varmistamaan, että jokaisella opiskelijalla on käytettävissään parhaat mahdolliset työkalut oppimiseen.
                </p>
                <MDBRow>
                    <MDBCol md="6">
                    <div className="cell-2">
                    <img src={tietoaMeistaKuva} alt="Kuva" width="600" height="400" className="kuva2" />
                    </div>
                    </MDBCol>
                    <MDBCol md="6">
                    <div className="cell-3">
                        <img src={tietoaMeistaKuva3} alt="Kuva" width="600" height="400" className="kuva3"  /> 
                    </div>
                    </MDBCol>
                </MDBRow>  
                    
                </section>   
                
            </section>


        </div>
    );

}

export default AboutUs;
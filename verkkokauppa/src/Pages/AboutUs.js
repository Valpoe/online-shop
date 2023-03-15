import React from 'react';
import tietoaMeistaKuva from "../Images/TMkuva1.jpg"
import tietoaMeistaKuva2 from "../Images/TMkuva2.jpg"
import tietoaMeistaKuva3 from "../Images/TMkuva3.jpg"
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';

const AboutUs = () => {

    const headerStyle = {
        color: "white",
        fontFamily: "serif",
        backgroundColor: "rgb(96, 96, 96)",
        padding: "50px 50px 50px 50px",
        
    };

    const pStyle = {
        padding: "50px 50px 50px 50px"
    };

    return(
        <div>
            <section className="bg-info p-3 bg-opacity-25">
                <div className="container">
                    <MDBRow>
                        <h1 style={headerStyle} className="fw-bold text-center fullwidth">Tietoa meistä</h1>
                        <p style={pStyle} class="lh-lg">Kynä & Kumi on yritys, joka on omistautunut tarjoamaan korkealaatuisia
                        koulutarvikkeita kaiken ikäisille opiskelijoille. Kirjoitusvälineisiin ja kumituotteisiin keskittyvä
                        Kynä & Kumi tarjoaa laajan valikoiman tuotteita opiskelijoiden tarpeisiin päiväkodista yliopistoon.
                        Yritys on ylpeä sitoutumisestaan ​​huippuosaamiseen sekä tuotteiden laadun että asiakaspalvelun suhteen.
                        Etsitpä sitten kyniä, kyniä, pyyhekumia tai muita koulutarvikkeita, Kynä & Kumi on oikea lähde kaikkiin
                        akateemisiin tarpeisiisi. Olemme yrityksenä sitoutuneet varmistamaan, että kaikki tarjoamamme koulutarvikkeet
                        valmistetaan korkeimpien laatustandardien mukaisesti. Hankimme huolellisesti kaikki materiaalimme luotettavilta
                        toimittajilta ja valmistamme tuotteet uusimmilla tuotantotekniikoilla ja koneilla. Tarjoamamme kynät ja lyijykynät
                        ovat valmistettu käyttäen vain laadukkaimpia materiaaleja, kuten korkealaatuisia muoveja ja kestäviä metalleja.
                        Yrityksen kynät on suunniteltu tarkasti, mikä varmistaa, että jokainen rivi on selkeä ja johdonmukainen.
                        Kynät on valmistettu korkealaatuisesta grafiitista, joka on erityisesti käsitelty maksimaalisen kestävyyden ja
                        sileyden varmistamiseksi.
                        </p>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6">
                            <img src={tietoaMeistaKuva} alt="Kuva" width="600" height="400"  />
                        </MDBCol>
                        <MDBCol md="6">
                            <img src={tietoaMeistaKuva2} alt="Kuva" width="600" height="400"  />
                        </MDBCol>

                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6">
                            <img src={tietoaMeistaKuva3} alt="Kuva" width="750" height="500"  />
                        </MDBCol>
                    </MDBRow>
                </div>
            </section>


        </div>
    );

}

export default AboutUs;
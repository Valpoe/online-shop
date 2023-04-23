import React from 'react';
import { MDBCarousel, MDBCarouselItem, MDBTypography, MDBBtn, MDBRow, MDBCol, MDBContainer } from 'mdb-react-ui-kit';
import EtusivuKuva1 from "../Images/EtusivuKuva1.jpg"
import EtusivuKuva2 from "../Images/EtusivuKuva2.jpg"
import EtusivuKuva3 from "../Images/EtusivuKuva3.jpg"
import { NavLink } from "react-router-dom";

const Etusivu = () => {

return(
<MDBTypography tag="div" className="pb-5 pt-5" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
<section className="d-flex justify-content-center justify-content-lg-between">
  <MDBContainer>
    <MDBRow>
      <MDBCol >
        <MDBCarousel showIndicators showControls dealy={100}>
          <MDBTypography tag="div" className="min-vw-50 min-vh-50">
            <MDBCarouselItem
              className='w-100 vh-50 d-block'
              itemId={1}
              src={EtusivuKuva1}
              alt='...'
              >
            </MDBCarouselItem>

            <MDBCarouselItem
              className='w-100 vh-50 d-block'
              itemId={2}
              src={EtusivuKuva2}
              alt='...'
              >
            </MDBCarouselItem>

            <MDBCarouselItem
              className='w-100 vh-50 d-block'
              itemId={3}
              src={EtusivuKuva3}
              alt='...'
              >
            </MDBCarouselItem>
          </MDBTypography>
        </MDBCarousel>
      </MDBCol>
      <MDBCol>
        <MDBTypography tag="div" className="pb-1">
          <MDBTypography variant="h1" className="text-dark fw-bold pb-2 text-center">NAPSUKAUPPA</MDBTypography>
          <MDBTypography tag="div" className="text-center">
            <p className="pe-3 ps-3 lh-lg text-dark pb-2">
              Me tarjoamme koulutarvikkeita siksi, että haluamme auttaa oppilaita menestymään koulussa ja tarjota heille laadukkaita tarvikkeita kohtuulliseen hintaan. Haluamme varmistaa, että kaikilla oppilailla on käytettävissään tarvittavat työkalut ja että heillä on pääsy kaikenlaisiin tarvikkeisiin, joita he saattavat tarvita koulussa.
              Meidän tarjoamamme koulutarvikkeet ovat laadukkaita ja kestäviä, joten oppilaat voivat käyttää niitä pitkään. Lisäksi meillä on laaja valikoima erilaisia tarvikkeita, joten oppilaat voivat löytää kaiken, mitä he tarvitsevat yhdeltä paikalta. Tarjoamme myös hyvät hinnat, jotta kaikilla oppilailla on varaa hankkia tarvitsemansa tarvikkeet.
              Kokonaisuudessaan koulutarvikkeet ovat tärkeitä koulunkäynnin kannalta ja me tarjoamme niitä, jotta oppilailla on kaikki tarvittavat työkalut menestyäkseen koulussa.                
            </p>
            <NavLink className="btn btn-success" to={"/tuotteet"}>Ostoksille</NavLink>
          </MDBTypography>
        </MDBTypography>
      </MDBCol>
    </MDBRow>

  </MDBContainer>
</section>
</MDBTypography>


);

}
export default Etusivu;
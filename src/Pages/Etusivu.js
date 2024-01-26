import React, { useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { MDBCarousel, MDBCarouselItem, MDBTypography, MDBRow, MDBCol, MDBContainer } from 'mdb-react-ui-kit';
import EtusivuKuva1 from "../Images/EtusivuKuva1.jpg"
import EtusivuKuva2 from "../Images/EtusivuKuva2.jpg"
import EtusivuKuva3 from "../Images/EtusivuKuva3.jpg"

const Etusivu = () => {
  
  const navigate = useNavigate();
  
  // when refreshing any page navigate to main page

  useEffect(() => {
    navigate('/');
  }, [navigate]);

return(
<MDBTypography tag="div" className="pb-5 pt-5" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
<section className="d-flex justify-content-center justify-content-lg-between">
  <MDBContainer className="text-center text-md-start">
    <MDBRow>
      <MDBCol lg="7" md="8" className="mx-auto mb-5 ps-5 pe-5">
        <MDBCarousel showIndicators showControls dealy={100} className="pt-4 text-center">
          <MDBTypography tag="div" className="vw-100">
            <MDBCarouselItem
              className='w-100 d-block image-container '
              itemId={1}
              src={EtusivuKuva1}
              alt='...'
              >
            </MDBCarouselItem>

            <MDBCarouselItem
              className='w-100 d-block image-container '
              itemId={2}
              src={EtusivuKuva2}
              alt='...'
              >
            </MDBCarouselItem>

            <MDBCarouselItem
              className='w-100 d-block image-container '
              itemId={3}
              src={EtusivuKuva3}
              alt='...'
              >
            </MDBCarouselItem>
          </MDBTypography>
        </MDBCarousel>
      </MDBCol>
      <MDBCol lg="5" md="7" className="mx-auto" >
        <MDBTypography tag="div" className="pb-1">
          <MDBTypography variant="h1" className="text-dark fw-bold pb-2 text-center pt-3">NAPSUKAUPPA</MDBTypography>
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
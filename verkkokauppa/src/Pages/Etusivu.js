import React from 'react';
import { MDBCarousel, MDBCarouselItem, MDBTypography, MDBBtn, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import EtusivuKuva1 from "../Images/EtusivuKuva1.jpg"
import EtusivuKuva2 from "../Images/EtusivuKuva2.jpg"
import EtusivuKuva3 from "../Images/EtusivuKuva3.jpg"

const Etusivu = () => {

return(
<div className="" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
  <MDBRow>
    <MDBCol>
    <MDBCarousel showIndicators showControls fade className="">
      <MDBCarouselItem
        className='w-100 d-block'
        itemId={1}
        src={EtusivuKuva1}
        alt='...'
      >
    
      </MDBCarouselItem>

      <MDBCarouselItem
        className='w-100 d-block'
        itemId={2}
        src={EtusivuKuva2}
        alt='...'
      >

      </MDBCarouselItem>

      <MDBCarouselItem
        className='w-100 d-block'
        itemId={3}
        src={EtusivuKuva3}
        alt='...'
      >

      </MDBCarouselItem>
    </MDBCarousel>
    </MDBCol>
    <MDBCol>
    <MDBTypography variant="h1" className="text-dark fw-bold pt-5 pb-2 text-center">NAPSUKAUPPA</MDBTypography>
    <div className="text-center">
    <p className="pe-3 ps-3 lh-lg text-dark pb-2">
        Me tarjoamme koulutarvikkeita siksi, että haluamme auttaa oppilaita menestymään koulussa ja tarjota heille laadukkaita tarvikkeita kohtuulliseen hintaan. Haluamme varmistaa, että kaikilla oppilailla on käytettävissään tarvittavat työkalut ja että heillä on pääsy kaikenlaisiin tarvikkeisiin, joita he saattavat tarvita koulussa.
        Meidän tarjoamamme koulutarvikkeet ovat laadukkaita ja kestäviä, joten oppilaat voivat käyttää niitä pitkään. Lisäksi meillä on laaja valikoima erilaisia tarvikkeita, joten oppilaat voivat löytää kaiken, mitä he tarvitsevat yhdeltä paikalta. Tarjoamme myös hyvät hinnat, jotta kaikilla oppilailla on varaa hankkia tarvitsemansa tarvikkeet.
        Kokonaisuudessaan koulutarvikkeet ovat tärkeitä koulunkäynnin kannalta ja me tarjoamme niitä, jotta oppilailla on kaikki tarvittavat työkalut menestyäkseen koulussa.                
    </p>
    <MDBBtn color="success" className=" " >Ostoksille</MDBBtn>  
    </div>
    </MDBCol>
  </MDBRow>
</div>

);

}

export default Etusivu;
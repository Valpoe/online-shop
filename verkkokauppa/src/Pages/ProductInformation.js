import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBBtn, MDBInput, MDBCardHeader, MDBCardTitle, MDBCardText, MDBCardFooter, MDBContainer, MDBSpinner, MDBIcon } from 'mdb-react-ui-kit';
import { getKategoriaTuotteet, getTuote, getTuotteet } from '../components/Server/TuoteAPI';
import { NavLink } from "react-router-dom";
import TuotteenTiedot from '../components/TuotteenTiedot';
import SamankaltaisetTuotteet from '../components/SamankaltaisetTuotteet';

const ProductInformation = (props) => {
  const [aktiivinenTuote, setAktiivinenTuote] = useState([]);
  const [tuote, setTuote] = useState([]);
  const [tuotekategoria, setTuotekategoria] = useState([]);
  const { tuoteID } = useParams();
  
  const refreshPage = () => {
    //move to top of page
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    //refresh page
    async function fetchData() {
      //fetch tuote with tuoteID
      const tuoteData = await getTuote(tuoteID);
      setTuote(tuoteData);
    }
    fetchData();
  }, [aktiivinenTuote]);
  
  useEffect(() => {
    async function TuoteKategoriaHaku() {
      if (tuote[0] && tuote[0].kategoriaid) {
        console.log(tuote[0].kategoriaid + "kategoria id haettu!!!");
        setTuotekategoria(await getKategoriaTuotteet(tuote[0].kategoriaid));
      }
    }
    TuoteKategoriaHaku();
  
    if(tuoteID === aktiivinenTuote){
      refreshPage();
    }
  }, [tuote]);

  // Jos tuotteet eivät ole vielä ladattu, näytetään spinneri.
  if (tuote.length === 0) {
    return (
      <div className="text-center m-5">
      <MDBSpinner role="status">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
      </div>
      )
  } else {
    return (
      <section className="d-flex justify-content-center justify-content-lg-between">
      <MDBContainer className="text-center text-md-start">

        <TuotteenTiedot tuote={tuote[0]} items={props.items} setItems={props.setItems} ></TuotteenTiedot>
        
          {tuotekategoria.length === 0 ? (
                  <div className="text-center m-5">
                  <MDBSpinner role="status">
                    <span className="visually-hidden">Loading...</span>
                  </MDBSpinner>
                  </div>
          ) : (
            <MDBCol className="mx-auto mb-5 text-center">
            <div className="text-uppercase fw-bold mb-3 mt-3">
            <h2>Samankaltaisia tuotteita</h2>
            </div>
            <MDBRow className="row-cols-1 row-cols-md-3 g-4">

              <SamankaltaisetTuotteet tuotteet={props.tuotteet} items={props.items} tuotekategoria={tuotekategoria} setAktiivinenTuote={setAktiivinenTuote}/>

            </MDBRow>
            </MDBCol>
          )}
    </MDBContainer>
    </section>
    );
  }
};

export default ProductInformation;
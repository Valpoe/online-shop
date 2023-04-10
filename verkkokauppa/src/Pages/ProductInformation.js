import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBBtn, MDBInput, MDBCardHeader, MDBCardTitle, MDBCardText, MDBCardFooter, MDBContainer, MDBSpinner, MDBIcon } from 'mdb-react-ui-kit';
import { getKategoriaTuotteet, getTuote, getTuotteet } from '../components/Server/TuoteAPI';
import { NavLink } from "react-router-dom";

import Tuote from '../components/TuoteenTiedot';

const ProductInformation = (props) => {
  const [aktiivinenTuote, setAktiivinenTuote] = useState([]);
  const [tuote, setTuote] = useState([]);
  const [tuotekategoria, setTuotekategoria] = useState([]);
  //initialize items with mock data

  const { tuoteID } = useParams();
  //use props to get ostoskori
  //const { addItem } = useContext(OstoskoriContext);
  
  const refreshPage = () => {
    //move to top of page
    window.scrollTo(0, 0);
  }

  const HandleAddToCart = (tuote) => {
    props.setItems([...props.items,{tuotenimi: tuote.tuotenimi, hinta: tuote.hinta, kuva: tuote.kuva, tuoteid: tuote.tuoteID}]);
    console.log(props.items);
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


        <Tuote tuote={tuote[0]} items={props.items} ></Tuote>
        

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
                {tuotekategoria.map((tuotteet) => (
               <MDBCol key={tuotteet.tuoteID}>
               <MDBCard className="h-100">
                 <MDBCardImage
                   src={tuotteet.kuva}
                   position="top"
                   alt="..."
                 />
                 <MDBCardBody>
                   <MDBCardHeader>
                        <MDBCardTitle>{tuotteet.tuotenimi}</MDBCardTitle>
                        </MDBCardHeader>
                      <MDBCardBody>
                        <MDBCardText>
                          Saldo: {tuotteet.varastosaldo}
                        </MDBCardText>
                        <MDBCardText>
                          <NavLink to={`/tuotteet/${tuotteet.tuoteID}`} onClick={() => setAktiivinenTuote(tuotteet.tuoteID)}>
                            Lisätietoja
                          </NavLink>
                        </MDBCardText>
                        <MDBCardText><button className='btn btn-success' onClick={() => HandleAddToCart(tuotteet)}>Lisää ostoskoriin</button></MDBCardText>
                      </MDBCardBody>
                      <MDBCardFooter className="fw-bold">Hinta: {tuotteet.hinta} <MDBIcon fas icon="euro-sign" /></MDBCardFooter>
                 </MDBCardBody>
               </MDBCard>
             </MDBCol>
                ))}

            </MDBRow>
            </MDBCol>
          )}
    </MDBContainer>
    </section>
    );
  }
};

export default ProductInformation;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBSpinner } from 'mdb-react-ui-kit';
import { getKategoriaTuotteet, getTuote, getTuotteet } from '../components/Server/TuoteAPI';

const ProductInformation = () => {
  const [tuote, setTuote] = useState([]);
  const [tuotekategoria, setTuotekategoria] = useState([]);
  const { tuoteID } = useParams();

  useEffect(() => {
    async function fetchData() {
      const tuoteData = await getTuote(tuoteID);
      setTuote(tuoteData);

    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
          //fetch tuotekategoria with tuoteID
          const tuotekategoriaData = await getKategoriaTuotteet(tuote[0].kategoriaid);
          setTuotekategoria(tuotekategoriaData);
    }
    fetchData();
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
      <div className="p-4">
        <h1>{tuote[0].tuotenimi} - tuotenumero: {tuote[0].tuoteID}</h1>
        <MDBRow>
          <MDBCol>
            <div className="">
            <MDBCard className='mb-3'>
              <MDBCardImage src={tuote[0].kuva} alt='...' position='top' />
              <MDBCardBody>
                <MDBCardTitle>{tuote[0].nimi}</MDBCardTitle>
                <MDBCardText>{tuote[0].kuvaus}</MDBCardText>
              </MDBCardBody>
            </MDBCard>
            </div>
          </MDBCol>
          <MDBCol>
            <div className="">
            <MDBCard className='mb-3 p-5'>
              <MDBCardText>Tuotetiedot</MDBCardText>
              <MDBCardText>Koko: tähän mahd. koko</MDBCardText>
              <MDBCardText>Väri: tähän mahd. väri</MDBCardText>
              <MDBCardText>käytetty vihko!</MDBCardText>
              <MDBCardText>{tuote[0].hinta} €</MDBCardText>
              <MDBCardBody>
                <MDBCardTitle>{tuote[0].nimi}</MDBCardTitle>
                <MDBCardText>{tuote[0].kuvaus}</MDBCardText>
                <MDBCardFooter>
                  <MDBCardText><a href="#">Lisää ostoskoriin</a></MDBCardText>
                </MDBCardFooter>
              </MDBCardBody>
            </MDBCard>
            </div>
          </MDBCol>
        </MDBRow>

          {tuotekategoria.length === 0 ? (
            <div>Ladataan tuotteita... hetkinen!</div>
          ) : (
            <div className='p-4'>
              <h1>Samankaltaisia tuotteita:</h1>
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
                   <MDBCardTitle>{tuotteet.tuotenimi}</MDBCardTitle>
                   <MDBCardText>Saldo: {tuotteet.varastosaldo}</MDBCardText>
                   <MDBCardFooter className="text-center">Hinta: {tuotteet.hinta} €</MDBCardFooter>
                 </MDBCardBody>
               </MDBCard>
             </MDBCol>
                ))}

            </MDBRow>
            </div>
          )}
    </div>
    );
  }
};

export default ProductInformation;
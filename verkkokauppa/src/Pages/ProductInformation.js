import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBSpinner } from 'mdb-react-ui-kit';
import { MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBCarousel, MDBSpinner } from 'mdb-react-ui-kit';
import { getKategoriaTuotteet, getTuote, getTuotteet } from '../components/Server/TuoteAPI';
import { NavLink } from "react-router-dom";


const ProductInformation = (props) => {
  const [aktiivinenTuote, setAktiivinenTuote] = useState([]);
  const [tuote, setTuote] = useState([]);
  const [tuotekategoria, setTuotekategoria] = useState([]);
  //initialize items with mock data

  const { tuoteID } = useParams();
  //use props to get ostoskori
  //const { addItem } = useContext(OstoskoriContext);
  
  const refreshPage = () => {
    //window.location.reload();
  }

  const HandleAddToCart = (tuote) => {
    props.setItems([...props.items,{tuotenimi: tuote.tuotenimi, hinta: tuote.hinta}]);
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
    
    async function fetchData() {
          //fetch tuotekategoria with tuoteID
          setTuotekategoria(await getKategoriaTuotteet(tuote[0].kategoriaid));
    }
    fetchData();

    if(tuoteID == aktiivinenTuote){
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
              <MDBCardText></MDBCardText>
              <MDBCardText>{tuote[0].hinta} €</MDBCardText>
              <MDBCardBody>
                <MDBCardTitle>{tuote[0].nimi}</MDBCardTitle>
                <MDBCardText>{tuote[0].kuvaus}</MDBCardText>
                <input type="number" className='form-control' placeholder='1'/>
                <MDBCardText><button className='btn btn-success' onClick={() => HandleAddToCart(tuote[0])}>Lisää ostoskoriin</button></MDBCardText>
                <MDBCardFooter>
                </MDBCardFooter>
              </MDBCardBody>
            </MDBCard>
            </div>
          </MDBCol>
        </MDBRow>

          {tuotekategoria.length === 0 ? (
                  <div className="text-center m-5">
                  <MDBSpinner role="status">
                    <span className="visually-hidden">Loading...</span>
                  </MDBSpinner>
                  </div>
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
                   <NavLink to={`/tuotteet/${tuotteet.tuoteID}`} onClick={() => setAktiivinenTuote(tuotteet.tuoteID)} className="btn btn-primary">Katso lisää</NavLink>
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
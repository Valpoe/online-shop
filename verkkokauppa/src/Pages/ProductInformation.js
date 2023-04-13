import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MDBRow, MDBCol, MDBContainer, MDBSpinner } from 'mdb-react-ui-kit';
import { getKategoriaTuotteet, getTuote } from '../components/Server/TuoteAPI';
import TuotteenTiedot from '../components/TuotteenTiedot';
import SamankaltaisetTuotteet from '../components/SamankaltaisetTuotteet';

const ProductInformation = (props) => {
  const [aktiivinenTuote, setAktiivinenTuote] = useState([]);
  const [tuote, setTuote] = useState([]);
  const [tuotekategoria, setTuotekategoria] = useState([]);
  const { tuoteID } = useParams();
  const [kategoriaID, setKategoriaID] = useState([]);
  

  useEffect(() => {
    //refresh page
    async function fetchData() {
      //fetch tuote with tuoteID
      const tuoteData = await getTuote(tuoteID);
      setTuotekategoria(await getKategoriaTuotteet(tuoteData[0].kategoriaid));
      setKategoriaID(tuoteData[0].kategoriaid);
      setTuote(tuoteData);
    }
    fetchData();
  }, [aktiivinenTuote]);

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
      <div className="pt-5 pb-5" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
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
            <MDBCol className="mx-auto text-center">
              <h6 className='text-uppercase fw-bold mb-5'>Samankaltaisia tuotteita</h6>
            <MDBRow className="row-cols-1 row-cols-md-3 g-4 justify-content-center">
              <SamankaltaisetTuotteet tuote={tuote} items={props.items} tuotekategoria={kategoriaID} setAktiivinenTuote={setAktiivinenTuote} aktiivinenTuote={aktiivinenTuote} setItems={props.setItems}/>
            </MDBRow>
            </MDBCol>
          )}
    </MDBContainer>
    </section>
    </div>
    );
  }
};

export default ProductInformation;
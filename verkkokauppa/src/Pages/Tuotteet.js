import React, { useState, useEffect } from "react";
import { getKategoriat } from "../components/Server/KategoriaAPI";
import { getTuotteet } from "../components/Server/TuoteAPI";
import Tuotehakupalkki from "../components/Tuotehakupalkki";
import TuoteKategoriat from "../components/TuoteKategoriat";
import TuoteKortit from "../components/TuoteKortit";
import {
  MDBRow,
  MDBCol,
  MDBSpinner,
  MDBContainer
} from "mdb-react-ui-kit";

const Tuotteet = (props) => {
  const [searchResults, setSearchResults] = useState([]);
  const [verticalActive, setVerticalActive] = useState("kaikki-tuotteet");

  // Tietokannasta tuotujen tietojen alustukseen:
  const [tuotteet, setTuotteet] = useState([]);
  const [kategoriat, setKategoriat] = useState([]);

  // Haetaan API:sta tietoa, muokataan logiikkaa tarpeen vaatiessa.
  useEffect(() => {
    async function fetchData() {
      const kategoriaData = await getKategoriat();
      const tuoteData = await getTuotteet();
      setKategoriat(kategoriaData);
      setTuotteet(tuoteData);
    }
    fetchData();
  }, []);

  // Jos tuotteet eivät ole vielä ladattu, näytetään spinneri.
  if (tuotteet.length === 0) {
    return (
      <div className="text-center m-5">
        <MDBSpinner role="status">
          <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
      </div>
    );
  }

  return (
    <div className="pb-5 pt-5" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
    <section className="d-flex justify-content-center justify-content-lg-between">
    <MDBContainer className="text-center text-md-start">
      <MDBRow className="justify-content-center">
        <MDBCol size="4">
          <Tuotehakupalkki tuotteet={tuotteet} setVerticalActive={setVerticalActive} setSearchResults={setSearchResults} />
        </MDBCol>
      </MDBRow>
      <MDBRow className="mt-4">
        <MDBCol lg="4" md="8" sm="8" className="mx-auto mb-5">
          <TuoteKategoriat kategoriat={kategoriat} verticalActive={verticalActive} tuotteet={tuotteet} 
          setSearchResults={setSearchResults} setVerticalActive={setVerticalActive} />
        </MDBCol>
        <MDBCol size="8" className="mx-auto text-center">
          <TuoteKortit items={props.items} setItems={props.setItems} tuotteet={tuotteet} kategoriat={kategoriat} searchResults={searchResults} verticalActive={verticalActive} />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </section>
    </div>
  );
};

export default Tuotteet;

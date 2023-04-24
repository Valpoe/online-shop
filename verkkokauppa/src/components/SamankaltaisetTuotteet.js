import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MDBCol,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardHeader,
  MDBCardTitle,
  MDBBtn,
  MDBCardText,
  MDBCardFooter,
} from "mdb-react-ui-kit";
import { getKategoriaTuotteet } from "./Server/TuoteAPI";

function SamankaltaisetTuotteet(props) {
  const HandleAddToCart = (tuote) => {
    props.setItems([
      ...props.items,
      {
        tuotenimi: tuote.tuotenimi,
        hinta: tuote.hinta,
        kuva: tuote.kuva,
        tuoteid: tuote.tuoteID,
      },
    ]);
    console.log(props.items);
  };

  const [tuotekategoria, setTuotekategoria] = useState([props.tuotekategoria]);
  const [valittuTuote, setvalittuTuote] = useState([props.aktiivinenTuote]);

  useEffect(() => {
    async function TuoteKategoriaHaku() {
      if (props.tuotekategoria && props.tuotekategoria) {
        setTuotekategoria(await getKategoriaTuotteet(props.tuotekategoria));
        console.log(tuotekategoria + "  kategoria id haettu!!!");
        setvalittuTuote(props.tuote[0].tuoteID);
        props.setAktiivinenTuote(props.tuote[0].tuoteID);
      }
    }
    TuoteKategoriaHaku();
  }, [props.tuotekategoria]);

  useEffect(() => {}, [valittuTuote]);

  useEffect(() => {
    console.log("filteredtuote: " + props.aktiivinenTuote);
    refreshPage();
  }, [props.aktiivinenTuote]);

  const refreshPage = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      {tuotekategoria
        .filter((tuote) => tuote.tuoteID !== props.aktiivinenTuote)
        .map((tuotteet, index) => (
          <MDBCol key={index}>
            <MDBCard className="h-100 productInformationCardImage">
              <MDBCardImage src={tuotteet.kuva} position="top" alt="..." />
              <MDBCardHeader>
                <MDBCardTitle className="text-muted">
                  {tuotteet.tuotenimi}
                </MDBCardTitle>
              </MDBCardHeader>
              <MDBCardBody>
                <MDBCardText>
                  <span className="fw-bold">Saldo:</span>{" "}
                  {tuotteet.varastosaldo} kpl
                </MDBCardText>
                <MDBCardText>
                  <NavLink
                    to={`/tuotteet/${tuotteet.tuoteID}`}
                    onClick={() => props.setAktiivinenTuote(tuotteet.tuoteID)}
                  >
                    Lisätietoja
                  </NavLink>
                </MDBCardText>
                <MDBCardText>
                  <MDBBtn onClick={() => HandleAddToCart(tuotteet)}>
                    Lisää ostoskoriin
                  </MDBBtn>
                </MDBCardText>
              </MDBCardBody>
              <MDBCardFooter>
                <span className="fw-bold">Hinta: </span>
                {tuotteet.hinta} €
              </MDBCardFooter>
            </MDBCard>
          </MDBCol>
        ))}
    </>
  );
}

export default SamankaltaisetTuotteet;

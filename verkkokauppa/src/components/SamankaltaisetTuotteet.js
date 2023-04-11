import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardHeader, MDBCardTitle, MDBCardText, MDBCardFooter, MDBIcon } from 'mdb-react-ui-kit';
import { getKategoriaTuotteet } from "./Server/TuoteAPI";

function SamankaltaisetTuotteet(props) {

    const HandleAddToCart = (tuote) => {
        props.setItems([...props.items,{tuotenimi: tuote.tuotenimi, hinta: tuote.hinta, kuva: tuote.kuva, tuoteid: tuote.tuoteID}]);
        console.log(props.items);
      }

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

      useEffect(() => {
        console.log("tuotekategoria: " + tuotekategoria + " aktiivinenTuote: " + props.tuote[0].tuoteID)
        //remove valittutuote from tuotekategoria

    }, [valittuTuote]);

      useEffect(() => {
        console.log("filteredtuote: " + props.aktiivinenTuote);
        refreshPage();
    }, [props.aktiivinenTuote]);

      const refreshPage = () => {
        //move to top of page
        window.scrollTo(0, 0);
      }

      return (
        <>
          {tuotekategoria
            .filter((tuote) => tuote.tuoteID !== props.aktiivinenTuote)
            .map((tuotteet, index) => (
              <MDBCol key={index}>
                <MDBCard className="h-100">
                  <MDBCardImage src={tuotteet.kuva} position="top" alt="..." />
                  <MDBCardBody>
                    <MDBCardHeader>
                      <MDBCardTitle>{tuotteet.tuotenimi}</MDBCardTitle>
                    </MDBCardHeader>
                    <MDBCardBody>
                      <MDBCardText>Saldo: {tuotteet.varastosaldo}</MDBCardText>
                      <MDBCardText>
                        <NavLink
                          to={`/tuotteet/${tuotteet.tuoteID}`}
                          onClick={() => props.setAktiivinenTuote(tuotteet.tuoteID)}
                        >
                          Lisätietoja
                        </NavLink>
                      </MDBCardText>
                      <MDBCardText>
                        <button
                          className="btn btn-success"
                          onClick={() => HandleAddToCart(tuotteet)}
                        >
                          Lisää ostoskoriin
                        </button>
                      </MDBCardText>
                    </MDBCardBody>
                    <MDBCardFooter className="fw-bold">
                      Hinta: {tuotteet.hinta} <MDBIcon fas icon="euro-sign" />
                    </MDBCardFooter>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
        </>
      );
}

export default SamankaltaisetTuotteet;
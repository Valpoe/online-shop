import MaaraLaskin from "./MaaraLaskin";
import { NavLink } from "react-router-dom";
import {
  MDBCard,
  MDBCardText,
  MDBCol,
  MDBIcon,
  MDBCardBody,
  MDBRow,
  MDBCardImage,
  MDBBtn,
  MDBCardTitle,
  MDBCardHeader,
} from "mdb-react-ui-kit";

function TuoteenTiedot(props) {
  return (
    <>
    <NavLink to="/tuotteet">
    <MDBBtn className="mb-3" color="primary"><MDBIcon fas className="me-2" icon="long-arrow-alt-left" />Takaisin tuotevalikoimaan</MDBBtn>
    </NavLink>
      <MDBRow className="row-cols-1 row-cols-md-2 g-4 mb-5">
        <MDBCol className="mx-auto text-center">
          <MDBCard className="h-100 productInformationCardImage">
          <MDBCardHeader>
              <MDBCardTitle className="text-uppercase text-center text-muted fw-bold mb-3 mt-3">
              {props.tuote.tuotenimi}
              </MDBCardTitle>
            </MDBCardHeader>
            <MDBCardImage src={props.tuote.kuva} position="top" alt="..." />
          </MDBCard>
        </MDBCol>
        <MDBCol className="mx-auto text-center">
          <MDBCard className="h-100 productInformationCardImage">
            <MDBCardHeader>
              <MDBCardTitle className="text-uppercase text-center text-muted fw-bold mb-3 mt-3">
                Tuotetiedot
              </MDBCardTitle>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBCardText className="fw-bold">Väri: </MDBCardText>
              <MDBBtn
                floating
                href = "#"
                size="md"
                className="mt-n2 mb-2"
                style={{ backgroundColor: props.tuote.vari }}
              ></MDBBtn>
              <MDBCardText className="fw-bold">Tuotteen kuvaus:</MDBCardText>
              <MDBCardText>Tämä kynä on erittäin hyvä kynä.</MDBCardText>
              <MDBCardText>
                <span className="fw-bold">Hinta:</span> {props.tuote.hinta} €
              </MDBCardText>
              {props.tuote.varastosaldo === 0 ? (
                <MDBCardText><MDBIcon fas icon="circle" color="danger" /> Tuote tilapäisesti loppu!</MDBCardText>
              ) : (
              <MDBCardText><MDBIcon fas icon="circle" color="success" className="me-1" /> Varastossa {props.tuote.varastosaldo} kappaletta</MDBCardText>
              )}
              {props.tuote.varastosaldo === 0 ? (
                <MDBCardText><span className="fw-bold">Toimitusaika-arvio:</span> 1-4 viikkoa</MDBCardText>
              ) : (
              <MDBCardText><span className="fw-bold">Toimitusaika-arvio:</span> 1-4 työpäivää</MDBCardText>
              )}
              <MaaraLaskin
                addToCart={props.addToCart}
                items={props.items}
                tuote={props.tuote}
                setItems={props.setItems}
              />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
}

export default TuoteenTiedot;

import MaaraLaskin from "./MaaraLaskin";
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
      <h6 className="text-uppercase fw-bold mb-4">{props.tuote.tuotenimi}</h6>
      <MDBRow>
        <MDBCol className="mx-auto mb-5 text-center">
          <MDBCard className="h-100">
            <MDBCardImage src={props.tuote.kuva} position="top" alt="..." />
          </MDBCard>
        </MDBCol>
        <MDBCol className="mx-auto mb-5 text-center">
          <MDBCard className="h-100">
            <MDBCardHeader>
              <MDBCardTitle className="text-uppercase text-center fw-bold mb-3 mt-3">
                Tuotetiedot
              </MDBCardTitle>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBCardText className="fw-bold">Väri: </MDBCardText>
              <MDBBtn
                floating
                size="md"
                className="mt-n2 mb-2"
                style={{ backgroundColor: props.tuote.vari }}
              ></MDBBtn>
              <MDBCardText className="fw-bold">Tuotteen kuvaus:</MDBCardText>
              <MDBCardText>Tämä kynä on erittäin hyvä kynä.</MDBCardText>
              <MDBCardText>
                Hinta: {props.tuote.hinta} <MDBIcon fas icon="euro-sign" />
              </MDBCardText>
              <MaaraLaskin
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

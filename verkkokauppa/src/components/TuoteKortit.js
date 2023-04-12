import { MDBCard, MDBCardBody, MDBCardFooter, MDBCardHeader, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBIcon, MDBRow, MDBTabsContent, MDBTabsPane } from 'mdb-react-ui-kit';
import { NavLink } from 'react-router-dom';

function TuoteKortit(props) {

  // Tuotteen lisäys ostoskoriin
  const HandleAddToCart = (tuote) => {
    props.setItems([...props.items,{tuotenimi: tuote.tuotenimi, hinta: tuote.hinta, kuva: tuote.kuva, tuoteid: tuote.tuoteID}]);
    console.log(props.items);
  }

  return (
    <>
      <MDBTabsContent>
        <MDBTabsPane show={props.verticalActive === "kaikki-tuotteet"}>
          <MDBRow className="row-cols-1 row-cols-md-3 g-4">
            {props.tuotteet.map((tuotteet) => (
              <MDBCol key={tuotteet.id}>
                <MDBCard className="h-100">
                  <MDBCardImage
                    src={tuotteet.kuva}
                    width="250px"
                    height="250px"
                    position="top"
                    alt="..."
                  />
                  <MDBCardHeader>
                    <MDBCardTitle>{tuotteet.tuotenimi}</MDBCardTitle>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <MDBCardText>Saldo: {tuotteet.varastosaldo}</MDBCardText>
                    <MDBCardText>
                      <NavLink to={`/tuotteet/${tuotteet.tuoteID}`}>
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
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
        </MDBTabsPane>

        {props.kategoriat.map((kategoria) => (
          <MDBTabsPane
            key={kategoria.id}
            show={props.verticalActive === kategoria.kategoriaID}
          >
            <MDBRow className="row-cols-1 row-cols-md-3 g-4">
              {props.tuotteet &&
                props.tuotteet
                  .filter(
                    (tuote) => tuote.kategoriaid === kategoria.kategoriaID
                  )
                  .map((tuotteet) => (
                    <MDBCol key={tuotteet.id}>
                      <MDBCard className="h-100">
                        <MDBCardImage
                          src={tuotteet.kuva}
                          width="250px"
                          height="250px"
                          position="top"
                          alt="..."
                        />
                        <MDBCardHeader>
                          <MDBCardTitle>{tuotteet.tuotenimi}</MDBCardTitle>
                        </MDBCardHeader>
                        <MDBCardBody>
                          <MDBCardText>
                            Saldo: {tuotteet.varastosaldo}
                          </MDBCardText>
                          <MDBCardText>
                            <NavLink to={`/tuotteet/${tuotteet.tuoteID}`}>
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
                          Hinta: {tuotteet.hinta}{" "}
                          <MDBIcon fas icon="euro-sign" />
                        </MDBCardFooter>
                      </MDBCard>
                    </MDBCol>
                  ))}
            </MDBRow>
          </MDBTabsPane>
        ))}
        <MDBTabsPane show={props.verticalActive === "searchResults"}>
          <MDBRow className="row-cols-1 row-cols-md-3 g-4">
            {props.searchResults.map((tuotteet) => (
              <MDBCol key={tuotteet.id}>
                <MDBCard className="h-100">
                  <MDBCardImage
                    src={tuotteet.kuva}
                    width="250px"
                    height="250px"
                    position="top"
                    alt="..."
                  />
                  <MDBCardHeader>
                    <MDBCardTitle>{tuotteet.tuotenimi}</MDBCardTitle>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <MDBCardText>Saldo: {tuotteet.varastosaldo}</MDBCardText>
                    <MDBCardText>
                      <NavLink to={`/tuotteet/${tuotteet.tuoteID}`}>
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
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
        </MDBTabsPane>
      </MDBTabsContent>
    </>
  );
}

export default TuoteKortit;

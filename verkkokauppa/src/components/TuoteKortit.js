import { MDBCard, MDBCardBody, MDBCardFooter, MDBBtn, MDBCardHeader, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBIcon, MDBRow, MDBTabsContent, MDBTabsPane } from 'mdb-react-ui-kit';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import "./CardImageSize.css";

function TuoteKortit(props) {

  // Tuotteen lisäys ostoskoriin
  const HandleAddToCart = (tuote) => {
    props.setItems([...props.items,{tuotenimi: tuote.tuotenimi, hinta: tuote.hinta, kuva: tuote.kuva, tuoteid: tuote.tuoteID}]);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = props.tuotteet.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(props.tuotteet.length / cardsPerPage);
  const totalSearchPages = Math.ceil(props.searchResults.length / cardsPerPage);
  const totalCategoryPages = Math.ceil(6 / cardsPerPage);

  return (
    <>
      <MDBTabsContent>
        <MDBTabsPane show={props.verticalActive === "kaikki-tuotteet"}>
          <MDBRow className="row-cols-1 row-cols-md-3 g-4">
            {currentCards.map((tuotteet) => (
              <MDBCol key={tuotteet.id}>
                <MDBCard className="h-100 align-items-center" data-testid="product-cards">
                  <MDBCardImage
                    src={tuotteet.kuva}
                    className="cardImage"
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
                      <MDBBtn className="mt-auto"
                        onClick={() => HandleAddToCart(tuotteet)}
                      >
                        Lisää ostoskoriin
                      </MDBBtn>
                    </MDBCardText>
                  </MDBCardBody>
                    <MDBCardFooter className="fw-bold">
                    Hinta: {tuotteet.hinta} <MDBIcon fas icon="euro-sign" />
                  </MDBCardFooter>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
          <MDBRow className="d-flex justify-content-center my-4">
          <nav aria-label="Page navigation">
    <ul className="pagination">
      {[...Array(totalPages)].map((_, pageNumber) => (
        <li className={`page-item ${pageNumber + 1 === currentPage ? 'active' : ''}`} key={pageNumber}>
          <button className="page-link" onClick={() => handlePageChange(pageNumber + 1)}>{pageNumber + 1}</button>
        </li>
      ))}
    </ul>
  </nav>
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
                      <MDBCard className="h-100 align-items-center">
                        <MDBCardImage
                          src={tuotteet.kuva}
                          className="cardImage"
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
                          <MDBBtn data-testid="add-to-cart-button"
                        onClick={() => HandleAddToCart(tuotteet)}
                      >
                        Lisää ostoskoriin
                      </MDBBtn>
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
            <MDBRow className="d-flex justify-content-center my-4">
          <nav aria-label="Page navigation">
    <ul className="pagination">
      {[...Array(totalCategoryPages)].map((_, pageNumber) => (
        <li className={`page-item ${pageNumber + 1 === currentPage ? 'active' : ''}`} key={pageNumber}>
          <button className="page-link" onClick={() => handlePageChange(pageNumber + 1)}>{pageNumber + 1}</button>
        </li>
      ))}
    </ul>
  </nav>
</MDBRow>
          </MDBTabsPane>
        ))}
        <MDBTabsPane show={props.verticalActive === "searchResults"}>
          <MDBRow className="row-cols-1 row-cols-md-3 g-4">
            {props.searchResults.slice(indexOfFirstCard, indexOfLastCard).map((tuotteet) => (
              <MDBCol key={tuotteet.id}>
                <MDBCard className="h-100 align-items-center">
                  <MDBCardImage
                    src={tuotteet.kuva}
                    className="cardImage"
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
                    <MDBBtn
                        onClick={() => HandleAddToCart(tuotteet)}
                      >
                        Lisää ostoskoriin
                      </MDBBtn>
                    </MDBCardText>
                  </MDBCardBody>
                  <MDBCardFooter className="fw-bold">
                    Hinta: {tuotteet.hinta} <MDBIcon fas icon="euro-sign" />
                  </MDBCardFooter>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
          <MDBRow className="d-flex justify-content-center my-4">
          <nav aria-label="Page navigation">
    <ul className="pagination">
      {[...Array(totalSearchPages)].map((_, pageNumber) => (
        <li className={`page-item ${pageNumber + 1 === currentPage ? 'active' : ''}`} key={pageNumber}>
          <button className="page-link" onClick={() => handlePageChange(pageNumber + 1)}>{pageNumber + 1}</button>
        </li>
      ))}
    </ul>
  </nav>
</MDBRow>
        </MDBTabsPane>
      </MDBTabsContent>
    </>
  );
}

export default TuoteKortit;

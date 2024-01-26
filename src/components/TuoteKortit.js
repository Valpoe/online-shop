import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBBtn,
  MDBCardHeader,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBRow,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import "./CardImageSize.css";

function TuoteKortit(props) {

  // Tuotteen lisäys ostoskoriin
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
    props.addToCart();
  };

  // Pagination toiminnalisuus
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = props.tuotteet.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(props.tuotteet.length / cardsPerPage);
  const totalSearchPages = Math.ceil(props.searchResults.length / cardsPerPage);
  const totalCategoryPages = Math.ceil(6 / cardsPerPage);

  // Laskee näytettävien tuotteiden määrän ja sivutuksen
  const countProducts = () => {
    let count = 0;
    if (props.verticalActive === "kaikki-tuotteet") {
      count = props.tuotteet.length;
    } else if (props.verticalActive === "searchResults") {
      count = props.searchResults.length;
    } else {
      count = props.tuotteet.filter(
        (tuote) => tuote.kategoriaid === props.verticalActive
      ).length;
    }
  
    const totalPages = Math.ceil(count / cardsPerPage);
    let startIndex = 1;
    let endIndex = count;
  
    if (count === 0) {
      startIndex = 0;
    } else if (totalPages > 0) {
      if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      } else if (currentPage < 1) {
        setCurrentPage(1);
      }
      startIndex = (currentPage - 1) * cardsPerPage + 1;
      endIndex = Math.min(startIndex + cardsPerPage - 1, count);
    }
  
    return `${startIndex}-${endIndex} kaikkiaan ${count} tuotteesta`;
  };
  
  return (
    <>
    <h4><span className="badge badge-secondary rounded-3 p-2">{countProducts()}</span></h4>
    <MDBTabsContent>
      <MDBTabsPane show={props.verticalActive === "kaikki-tuotteet"}>
        <MDBRow className="row-cols-1 row-cols-md-3 rows-cols-sm-2 g-2">
          {currentCards.map((tuotteet, index) => (
            <MDBCol key={index}>
              <MDBCard
                className="h-100 align-items-center"
                data-testid="product-cards"
              >
                <MDBCardImage
                  src={tuotteet.kuva}
                  className="cardImage"
                  position="top"
                  alt="..."
                />
                <div className="move-content-bottom">
                  <div className="card-content">
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
                        <NavLink to={`/tuotteet/${tuotteet.tuoteID}`}>
                          Lisätietoja
                        </NavLink>
                      </MDBCardText>
                        <MDBBtn
                          className="mt-auto"
                          onClick={() => HandleAddToCart(tuotteet)}
                        >
                          Lisää ostoskoriin
                        </MDBBtn>
                    </MDBCardBody>
                  </div>
                  <MDBCardFooter>
                    <span className="fw-bold">Hinta:</span> {tuotteet.hinta} €
                  </MDBCardFooter>
                </div>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
        <MDBRow className="d-flex justify-content-center my-4">
          <nav aria-label="Page navigation">
            <ul className="pagination">
              {[...Array(totalPages)].map((_, pageNumber) => (
                <li
                  className={`page-item ${
                    pageNumber + 1 === currentPage ? "active" : ""
                  }`}
                  key={pageNumber}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(pageNumber + 1)}
                  >
                    {pageNumber + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </MDBRow>
      </MDBTabsPane>
      {props.kategoriat.map((kategoria, index) => (
        <MDBTabsPane
          key={index}
          show={props.verticalActive === kategoria.kategoriaID}
        >
          <MDBRow className="row-cols-1 row-cols-md-3 g-2">
            {props.tuotteet &&
              props.tuotteet
                .filter((tuote) => tuote.kategoriaid === kategoria.kategoriaID)
                .map((tuotteet, index) => (
                  <MDBCol key={index}>
                    <MDBCard className="h-100 align-items-center">
                      <MDBCardImage
                        src={tuotteet.kuva}
                        className="cardImage"
                        position="top"
                        alt="..."
                      />
                      <div className="move-content-bottom">
                        <div className="card-content">
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
                              <NavLink to={`/tuotteet/${tuotteet.tuoteID}`}>
                                Lisätietoja
                              </NavLink>
                            </MDBCardText>
                            <MDBCardText>
                              <MDBBtn
                                data-testid="add-to-cart-button"
                                onClick={() => HandleAddToCart(tuotteet)}
                              >
                                Lisää ostoskoriin
                              </MDBBtn>
                            </MDBCardText>
                          </MDBCardBody>
                        </div>
                        <MDBCardFooter>
                          <span className="fw-bold">Hinta:</span>{" "}
                          {tuotteet.hinta} €
                        </MDBCardFooter>
                      </div>
                    </MDBCard>
                  </MDBCol>
                ))}
          </MDBRow>
          <MDBRow className="d-flex justify-content-center my-4">
            <nav aria-label="Page navigation">
              <ul className="pagination">
                {[...Array(totalCategoryPages)].map((_, pageNumber) => (
                  <li
                    className={`page-item ${
                      pageNumber + 1 === currentPage ? "active" : ""
                    }`}
                    key={pageNumber}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(pageNumber + 1)}
                    >
                      {pageNumber + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </MDBRow>
        </MDBTabsPane>
      ))}
      <MDBTabsPane show={props.verticalActive === "searchResults"}>
        <MDBRow className="row-cols-1 row-cols-md-3 g-2">
          {props.searchResults.length === 0 && (
            <MDBCol>
              <div className="text-center">
                <h3>Ei hakutuloksia</h3>
              </div>
            </MDBCol>
          )}         
          {props.searchResults
            .slice(indexOfFirstCard, indexOfLastCard)
            .map((tuotteet, index) => (
              <MDBCol key={index}>
                <MDBCard className="h-100 align-items-center">
                  <MDBCardImage
                    src={tuotteet.kuva}
                    className="cardImage"
                    position="top"
                    alt="..."
                  />
                  <div className="move-content-bottom">
                    <div className="card-content">
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
                          <NavLink to={`/tuotteet/${tuotteet.tuoteID}`}>
                            Lisätietoja
                          </NavLink>
                        </MDBCardText>
                        <MDBCardText>
                          <MDBBtn onClick={() => HandleAddToCart(tuotteet)}>
                            Lisää ostoskoriin
                          </MDBBtn>
                        </MDBCardText>
                      </MDBCardBody>
                    </div>
                    <MDBCardFooter>
                      <span className="fw-bold">Hinta:</span> {tuotteet.hinta} €
                    </MDBCardFooter>
                  </div>
                </MDBCard>
              </MDBCol>
            ))}
        </MDBRow>
        <MDBRow className="d-flex justify-content-center my-4">
          <nav aria-label="Page navigation">
            <ul className="pagination">
              {[...Array(totalSearchPages)].map((_, pageNumber) => (
                <li
                  className={`page-item ${
                    pageNumber + 1 === currentPage ? "active" : ""
                  }`}
                  key={pageNumber}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(pageNumber + 1)}
                  >
                    {pageNumber + 1}
                  </button>
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

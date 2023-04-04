import React, { useState, useEffect } from "react";
import { getKategoriat } from "../components/Server/KategoriaAPI";
import { getTuotteet } from "../components/Server/TuoteAPI";
import { NavLink } from "react-router-dom";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBRow,
  MDBCol,
  MDBCardFooter,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBIcon,
  MDBInputGroup,
  MDBInput,
  MDBBtnGroup,
  MDBRange,
  MDBSpinner,
} from "mdb-react-ui-kit";

const Tuotteet = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [verticalActive, setVerticalActive] = useState("kaikki-tuotteet");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(400);

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

  // Tuotekategorian valinta
  const handleVerticalClick = (value) => {
    if (value === verticalActive) {
      return;
    }
    setVerticalActive(value);
  };

  // Hakupalkin toiminnallisuus
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);

    if (e.target.value === "") {
      setVerticalActive("kaikki-tuotteet");
    }

    if (e.target.value !== "") {
      const filteredProducts = tuotteet.filter((product) => {
        return product.tuotenimi
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setSearchResults(filteredProducts);
      setVerticalActive("searchResults");
    }
  };

  const uniqueColors = [...new Set(tuotteet.map((product) => product.vari))];

  // Tuotteen värisuodatus
  const handleColorClick = (color) => {
    const filteredProducts = tuotteet.filter((product) => {
      return product.vari === color;
    });
    setSearchResults(filteredProducts);
    setVerticalActive("searchResults");
  };

  // Hinnan minimi arvon haku
  const handleMinSearch = (e) => {
    setMinPrice(e.target.value);

    const filteredProducts = tuotteet.filter((product) => {
      return product.hinta >= e.target.value && product.hinta <= maxPrice;
    });
    setSearchResults(filteredProducts);
    setVerticalActive("searchResults");
  };

  // Hinnan maksimiarvon haku
  const handleMaxSearch = (e) => {
    setMaxPrice(e.target.value);

    const filteredProducts = tuotteet.filter((product) => {
      return product.hinta <= e.target.value && product.hinta >= minPrice;
    }
    );
    setSearchResults(filteredProducts);
    setVerticalActive("searchResults");
  };

  // Halvimman ja kalleimman tuotteen suodatus
  const [sort, setSort] = useState("");
  const handleSortClick = () => {
    if (sort === "cheapest") {
      const filteredProducts = tuotteet.sort((a, b) => b.hinta - a.hinta);
      setSearchResults(filteredProducts);
      setVerticalActive("searchResults");
    } else {
      const filteredProducts = tuotteet.sort((a, b) => a.hinta - b.hinta);
      setSearchResults(filteredProducts);
      setVerticalActive("searchResults");
    }
  };

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
    <div>
      <>
        <MDBRow className="d-flex justify-content-center">
          <MDBCol size="6">
            <MDBInputGroup>
              <MDBIcon className="m-3" icon="search" size="lg" />
              <MDBInput
                label="Etsi tuotteita"
                onChange={handleSearch}
                value={searchInput}
              />
            </MDBInputGroup>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol size="3" className="ms-4">
            <MDBTabs pills className="flex-column text-center">
              <div className="d-none d-lg-block text-uppercase text-center fw-bold mb-3">
                <span>Kategoriat</span>
              </div>
              <MDBTabsItem>
                <MDBTabsLink
                  className="square border border-2"
                  onClick={() => handleVerticalClick("kaikki-tuotteet")}
                  active={verticalActive === "kaikki-tuotteet"}
                >
                  Kaikki tuotteet
                </MDBTabsLink>
              </MDBTabsItem>
              {kategoriat.map((kategoria) => (
                <MDBTabsItem>
                  <MDBTabsLink
                    className="square border border-2"
                    onClick={() => handleVerticalClick(kategoria.kategoriaID)}
                    active={verticalActive === kategoria.kategoriaID}
                  >
                    {kategoria.kuvaus}
                  </MDBTabsLink>
                </MDBTabsItem>
              ))}
            </MDBTabs>
            <div className="d-none d-lg-block text-uppercase text-center fw-bold mb-3 mt-3">
              <span>Suodata tuotteita</span>
            </div>
            <div className="text-center mb-3">
                <MDBBtn className="me-2" color="secondary" outline onClick={() => {handleSortClick(); setSort("cheapest")}}>
                  Halvin ensin
                </MDBBtn>
                <MDBBtn classname="ms-2" color="secondary" outline onClick={() => {handleSortClick(); setSort("expensive")}}>
                  Kallein ensin
                </MDBBtn>
            </div>
            <div className="mb-3">
              <div className="d-none d-lg-block text-center mb-3 mt-3">
                <span>Hinta</span>
              </div>
              <MDBRange min="0" max="200" label="Min" value={minPrice} onChange={handleMinSearch} />
              <MDBRange min="200" max="400" label="Max" value={maxPrice} onChange={handleMaxSearch} />
            </div>
            <div className="text-center mb-3">
              <div className="d-none d-lg-block text-center mb-3 mt-3">
                <span>Väri</span>
              </div>
              {uniqueColors.map((color) => (
                <MDBBtn
                  floating
                  size="lg"
                  className="m-1"
                  key={color}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorClick(color)}
                ></MDBBtn>
              ))}
              {/* {tuotteet &&
                tuotteet
                  .filter(
                    (v, i, a) => a.findIndex((t) => t.vari === v.vari) === i
                  )
                  .map((tuotteet) => (
                    <MDBBtn
                      floating
                      size="lg"
                      className="m-1"
                      key={tuotteet.vari}
                      style={{ backgroundColor: tuotteet.vari }}
                    ></MDBBtn>
                  ))} */}
            </div>
          </MDBCol>
          <MDBCol size="8" className="mt-5">
            <MDBTabsContent>
              <MDBTabsPane show={verticalActive === "kaikki-tuotteet"}>
                <MDBRow className="row-cols-1 row-cols-md-3 g-4">
                  {tuotteet.map((tuotteet) => (
                    <MDBCol key={tuotteet.id}>
                      <MDBCard className="h-100">
                        <MDBCardImage
                          src={tuotteet.kuva}
                          position="top"
                          alt="..."
                        />
                        <MDBCardBody>
                          <MDBCardTitle>{tuotteet.tuotenimi}</MDBCardTitle>
                          <MDBCardText>
                            Saldo: {tuotteet.varastosaldo}
                          </MDBCardText>
                          <MDBCardText>
                            <NavLink to={`/tuotteet/${tuotteet.tuoteID}`}>
                              Lisätietoja
                            </NavLink>
                          </MDBCardText>
                          <MDBCardFooter className="text-center">
                            Hinta {tuotteet.hinta} €
                          </MDBCardFooter>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  ))}
                </MDBRow>
              </MDBTabsPane>

              {kategoriat.map((kategoria) => (
                <MDBTabsPane show={verticalActive === kategoria.kategoriaID}>
                  <MDBRow className="row-cols-1 row-cols-md-3 g-4">
                    {tuotteet &&
                      tuotteet
                        .filter(
                          (tuote) => tuote.kategoriaid === kategoria.kategoriaID
                        )
                        .map((tuotteet) => (
                          <MDBCol key={tuotteet.id}>
                            <MDBCard className="h-100">
                              <MDBCardImage
                                src={tuotteet.kuva}
                                position="top"
                                alt="..."
                              />
                              <MDBCardBody>
                                <MDBCardTitle>
                                  {tuotteet.tuotenimi}
                                </MDBCardTitle>
                                <MDBCardText>
                                  Saldo: {tuotteet.varastosaldo}
                                </MDBCardText>
                                <MDBCardText>
                              <NavLink to={`/tuotteet/${tuotteet.tuoteID}`}>
                                Lisätietoja
                              </NavLink>
                            </MDBCardText>
                                <MDBCardFooter className="text-center">
                                  Hinta: {tuotteet.hinta} €
                                </MDBCardFooter>
                              </MDBCardBody>
                            </MDBCard>
                          </MDBCol>
                        ))}
                  </MDBRow>
                </MDBTabsPane>
              ))}
              <MDBTabsPane show={verticalActive === "searchResults"}>
                <MDBRow className="row-cols-1 row-cols-md-3 g-4">
                  {searchResults.map((tuotteet) => (
                    <MDBCol key={tuotteet.id}>
                      <MDBCard className="h-100">
                        <MDBCardImage
                          src={tuotteet.kuva}
                          position="top"
                          alt="..."
                        />
                        <MDBCardBody>
                          <MDBCardTitle>{tuotteet.tuotenimi}</MDBCardTitle>
                          <MDBCardText>
                            Saldo: {tuotteet.varastosaldo}
                          </MDBCardText>
                          <MDBCardText>
                            <NavLink to={`/tuotteet/${tuotteet.tuoteID}`}>
                              Lisätietoja
                            </NavLink>
                          </MDBCardText>
                          <MDBCardFooter className="text-center">
                            Hinta: {tuotteet.hinta} €
                          </MDBCardFooter>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  ))}
                </MDBRow>
              </MDBTabsPane>
            </MDBTabsContent>
          </MDBCol>
        </MDBRow>
      </>
    </div>
  );
};

export default Tuotteet;

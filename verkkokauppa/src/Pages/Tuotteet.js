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
  MDBRange,
  MDBSpinner,
  MDBCardHeader,
  MDBContainer,
} from "mdb-react-ui-kit";
import Tuotehakupalkki from "../components/Tuotehakupalkki";

const Tuotteet = (props) => {
  const [searchResults, setSearchResults] = useState([]);
  const [verticalActive, setVerticalActive] = useState("kaikki-tuotteet");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(400);

  // Tietokannasta tuotujen tietojen alustukseen:
  const [tuotteet, setTuotteet] = useState([]);
  const [kategoriat, setKategoriat] = useState([]);

  // Lisää tuote ostoskoriin
  const HandleAddToCart = (tuote) => {
    props.setItems([...props.items,{tuotenimi: tuote.tuotenimi, hinta: tuote.hinta, kuva: tuote.kuva, tuoteid: tuote.tuoteID}]);
    console.log(props.items);
  }

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

  // Tuotteen uniikkien värien listaus
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
    });
    setSearchResults(filteredProducts);
    setVerticalActive("searchResults");
  };

  // Halvimman ja kalleimman tuotteen suodatus
  const [sort, setSort] = useState("cheapest");
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
    <section className="d-flex justify-content-center justify-content-lg-between">
    <MDBContainer className="text-center text-md-start">
      <MDBRow className="justify-content-center">
        <MDBCol size="4">
          <Tuotehakupalkki tuotteet={tuotteet} setVerticalActive={setVerticalActive} setSearchResults={setSearchResults} />
        </MDBCol>
      </MDBRow>
      <MDBRow className="mt-3">
        <MDBCol lg="4" md="8" sm="8" className="mx-auto mb-5">
          <MDBTabs pills className="flex-column text-center">
            <div className="text-uppercase text-center fw-bold mb-3">
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
              <MDBTabsItem key={kategoria.id}>
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
          <div className="text-uppercase text-center fw-bold mb-3 mt-3">
            <span>Suodata tuotteita</span>
          </div>
          <div className="text-center mb-3">
            <MDBBtn
              color="secondary"
              outline
              onClick={() => {
                handleSortClick();
                setSort("cheapest");
              }}
            >
              Halvin ensin
            </MDBBtn>
            <MDBBtn
              color="secondary"
              outline
              onClick={() => {
                handleSortClick();
                setSort("expensive");
              }}
            >
              Kallein ensin
            </MDBBtn>
          </div>
          <div className="mb-3">
            <div className="text-center mb-3 mt-3">
              <span>Hinta</span>
            </div>
            <MDBRange
              min="0"
              max="200"
              label="Min"
              value={minPrice}
              onChange={handleMinSearch}
            />
            <MDBRange
              min="200"
              max="400"
              label="Max"
              value={maxPrice}
              onChange={handleMaxSearch}
            />
          </div>
          <div className="text-center mb-3">
            <div className="text-center mb-3 mt-3">
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
          </div>
        </MDBCol>
        <MDBCol size="8" className="mx-auto mb-5 text-center">
          <MDBTabsContent>
            <MDBTabsPane show={verticalActive === "kaikki-tuotteet"}>
              <MDBRow className="row-cols-1 row-cols-md-3 g-4">
                {tuotteet.map((tuotteet) => (
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
                        <MDBCardText><button className='btn btn-success' onClick={() => HandleAddToCart(tuotteet)}>Lisää ostoskoriin</button></MDBCardText>
                      </MDBCardBody>
                      <MDBCardFooter className="fw-bold">Hinta: {tuotteet.hinta} <MDBIcon fas icon="euro-sign" /></MDBCardFooter>
                    </MDBCard>
                  </MDBCol>
                ))}
              </MDBRow>
            </MDBTabsPane>

            {kategoriat.map((kategoria) => (
              <MDBTabsPane key={kategoria.id} show={verticalActive === kategoria.kategoriaID}>
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
                              <MDBCardText><button className='btn btn-success' onClick={() => HandleAddToCart(tuotteet)}>Lisää ostoskoriin</button></MDBCardText>
                            </MDBCardBody>
                              <MDBCardFooter className="fw-bold">Hinta: {tuotteet.hinta} <MDBIcon fas icon="euro-sign" /></MDBCardFooter>
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
                            Lisätietoja</NavLink>
                        </MDBCardText>
                        <MDBCardText><button className='btn btn-success' onClick={() => HandleAddToCart(tuotteet)}>Lisää ostoskoriin</button></MDBCardText>
                      </MDBCardBody>
                      <MDBCardFooter className="fw-bold">Hinta: {tuotteet.hinta} <MDBIcon fas icon="euro-sign" /></MDBCardFooter>
                    </MDBCard>
                  </MDBCol>
                ))}
              </MDBRow>
            </MDBTabsPane>
          </MDBTabsContent>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </section>
  );
};

export default Tuotteet;

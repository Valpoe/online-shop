import React, { useState } from "react";


import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBCardFooter,
} from "mdb-react-ui-kit";

import {
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
  MDBCheckbox,
} from "mdb-react-ui-kit";

import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import ProductInformation from "./ProductInformation";
import { NavLink } from "react-router-dom";


const products_kynat = [
  {
    id: 1,
    name: "Kynä",
    price: 1.5,
    description: "This is a longer card with supporting text below as anatural lead-in to additional content. This content is a little bit longer.",
    image: "https://mdbootstrap.com/img/new/standard/city/044.webp",
    color: "#FF3D00",
  },
  {
    id: 2,
    name: "Kynä",
    price: 1.5,
    description: "Kynä, lead-in to additional content.",
    image: "https://mdbootstrap.com/img/new/standard/city/044.webp",
    color: "#00B0FF",
  },
  {
    id: 3,
    name: "Kynä",
    price: 1.5,
    description: "Kynä, card with supporting text below as anatural lead-in to additional content. This content is a little bit longer",
    image: "https://img.freepik.com/premium-psd/floating-pen-mockup_7956-394.jpg",
    color: "#76FF03",
  },
  {
    id: 4,
    name: "Pensseli",
    price: 1.5,
    description: "Pensseli, lead-in to additional content.",
    image: "http://unblast.com/wp-content/uploads/2020/08/Ballpoint-Pen-Mockup-1.jpg",
    color: "#FF3D00",
  },
  {
    id: 5,
    name: "Pensseli 2.0",
    price: 1.5,
    description: "Pensseli 2.0, card with supporting text below as anatural lead-in to additional content. This content is a little bit longer",
    image: "https://jahtimedia.fi/sites/default/files/styles/meta_image/public/2019-02/Kuva1.jpg?h=56d95d7b&itok=nrPwM20k",
    color: "#00B0FF",
  },
  {
    id: 6,
    name: "Pensseli extreme 3.0",
    price: 1.5,
    description: "Pensseli extreme 3.0, lead-in to additional content.",
    //use pencil_turbo.png from Images folder
    image: "https://suomenluonto.fi/wp-content/uploads/2016/07/Martes_martes_Clunes_Scotland_1.jpg",
    color: "#76FF03",
  }];

  const products_vihko = [
    {
      id: 13,
      name: "Vihko",
      price: 1.5,
      description: "This is a longer card with supporting text below as anatural lead-in to additional content. This content is a little bit longer.",
      image: "https://mdbootstrap.com/img/new/standard/city/044.webp",
      color: "#FF3D00",
    },
    {
      id: 26,
      name: "Vihko",
      price: 1.5,
      description: "Vihko, lead-in to additional content.",
      image: "https://mdbootstrap.com/img/new/standard/city/044.webp",
      color: "#FFEA00",
    }];

    //products_all contains each element from products_kynä and products_vihko
    const products_all = products_kynat.concat(products_vihko);

const Tuotteet = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [verticalActive, setVerticalActive] = useState("kaikki-tuotteet");
  
  const productColors = products_all.map((product) => {
    return { color: product.color };
  }).filter((product, index, self) => {
    return index === self.findIndex((t) => (
      t.color === product.color
    ));
  });

  const handleVerticalClick = (value) => {
    if (value === verticalActive) {
      return;
    }

    setVerticalActive(value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);

    if (e.target.value === "") {
      setVerticalActive("kaikki-tuotteet");
    }

    if (e.target.value !== "") {
      const filteredProducts = products_all.filter((product) => {
        return product.name.toLowerCase().includes(e.target.value.toLowerCase());
      });
      setSearchResults(filteredProducts);
      setVerticalActive("searchResults");
      console.log(productColors);
    }
  };

  return (
    <div>
      <>
        <MDBRow className="d-flex justify-content-center">
          <MDBCol size="6">
          <MDBInputGroup>
            <MDBIcon className="m-3" icon="search" size="lg" />
            <MDBInput label='Etsi tuotteita' onChange={handleSearch} value={searchInput} />
          </MDBInputGroup>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol size="3" className="ms-4">
            <MDBTabs pills className="flex-column">
              <div className="d-none d-lg-block text-uppercase text-center fw-bold mb-3">
                <span>Kategoriat</span>
              </div>
              <MDBTabsItem>
                <MDBTabsLink className="square border border-2"
                  onClick={() => handleVerticalClick("kaikki-tuotteet")}
                  active={verticalActive === "kaikki-tuotteet"}
                >
                  Kaikki tuotteet
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink className="square border border-2"
                  onClick={() => handleVerticalClick("kynat")}
                  active={verticalActive === "kynat"}
                ><i class="fas fa-pen-alt fa-lg me-2"></i>Kynät
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink className="square border border-2"
                  onClick={() => handleVerticalClick("kumit")}
                  active={verticalActive === "kumit"}
                >
                  <i class="fas fa-eraser fa-lg me-2"></i>Kumit
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink className="square border border-2"
                  onClick={() => handleVerticalClick("penaalit")}
                  active={verticalActive === "penaalit"}
                >
                  <i class="fas fa-box-open fa-lg me-2"></i>Penaalit
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink className="square border border-2"
                  onClick={() => handleVerticalClick("vihkot")}
                  active={verticalActive === "vihkot"}
                >
                  <i class="fas fa-book-open fa-lg me-2"></i>Vihkot
                </MDBTabsLink>
              </MDBTabsItem>
            </MDBTabs>
            <div className="d-none d-lg-block text-uppercase text-center fw-bold mb-3 mt-3">
                <span>Suodata tuotteita</span>
              </div>
              <div className="text-center mb-3" >
              <MDBBtnGroup shadow='0'>
      <MDBBtn color='secondary' outline>
        Halvin ensin
      </MDBBtn>
      <MDBBtn color='secondary' outline>
        Kallein ensin
      </MDBBtn>
      <MDBBtn color='secondary' outline>
        Jotain muuta
      </MDBBtn>
    </MDBBtnGroup>
    </div>
              <div className="text-center mb-3" >
              <div className="d-none d-lg-block text-center mb-3 mt-3">
                <span>Hinta</span>
              </div>
              <MDBRange
      defaultValue={10}
      min='0'
      max='20'
      step='1'
      id='customRange1'
    />
    </div>
    <div className="text-center mb-3">
    <div className="d-none d-lg-block text-center mb-3 mt-3">
                <span>Väri</span>
              </div>
        {productColors.map((product) => (
          <MDBBtn floating size="lg" className="m-1" key={product.color} style={{ backgroundColor: product.color }}>
          </MDBBtn>
        ))}
    </div>
          </MDBCol>
          <MDBCol size="8" className="mt-5">       
            <MDBTabsContent>
              <MDBTabsPane show={verticalActive === "kaikki-tuotteet"}>
                <MDBRow className="row-cols-1 row-cols-md-3 g-4">

                  {products_all.map((product) => (
                    <MDBCol key={product.id}>
                      <MDBCard className="h-100">
                        <MDBCardImage
                          src={product.image}
                          position="top"
                          alt="..."
                        />
                        <MDBCardBody>
                          <MDBCardTitle>{product.name}</MDBCardTitle>
                          <MDBCardText>{product.description}</MDBCardText>
                          <MDBCardText><NavLink to={`/productInformation/${product.id}`}>Link to details {product.name}</NavLink></MDBCardText>
                          <MDBCardFooter>{product.price}</MDBCardFooter>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  ))}

                </MDBRow>
              </MDBTabsPane>
              <MDBTabsPane show={verticalActive === "kynat"}>
              <MDBRow className="row-cols-1 row-cols-md-3 g-4">

                {products_kynat.map((product) => (
                  <MDBCol key={product.id}>
                    <MDBCard className="h-100">
                      <MDBCardImage
                        src={product.image}
                        position="top"
                        alt="..."
                      />
                      <MDBCardBody>
                        <MDBCardTitle>{product.name}</MDBCardTitle>
                        <MDBCardText>{product.description}</MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                ))}
                </MDBRow>
                </MDBTabsPane>

              <MDBTabsPane show={verticalActive === "kumit"}>
              <MDBRow className="row-cols-1 row-cols-md-3 g-4">

                        {products_vihko.map((product) => (
                          <MDBCol key={product.id}>
                            <MDBCard className="h-100">
                              <MDBCardImage
                                src={product.image}
                                position="top"
                                alt="..."
                              />
                              <MDBCardBody>
                                <MDBCardTitle>{product.name}</MDBCardTitle>
                                <MDBCardText>{product.description}</MDBCardText>
                              </MDBCardBody>
                            </MDBCard>
                          </MDBCol>
                        ))}
                        </MDBRow>
                        </MDBTabsPane>

              <MDBTabsPane show={verticalActive === "penaalit"}>
              <MDBRow className="row-cols-1 row-cols-md-3 g-4">

                {products_vihko.map((product) => (
                  <MDBCol key={product.id}>
                    <MDBCard className="h-100">
                      <MDBCardImage
                        src={product.image}
                        position="top"
                        alt="..."
                      />
                      <MDBCardBody>
                        <MDBCardTitle>{product.name}</MDBCardTitle>
                        <MDBCardText>{product.description}</MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                ))}
                </MDBRow>
                </MDBTabsPane>

              <MDBTabsPane show={verticalActive === "vihkot"}>
              <MDBRow className="row-cols-1 row-cols-md-3 g-4">
  
                {products_vihko.map((product) => (
                  <MDBCol key={product.id}>
                    <MDBCard className="h-100">
                      <MDBCardImage
                        src={product.image}
                        position="top"
                        alt="..."
                      />
                      <MDBCardBody>
                        <MDBCardTitle>{product.name}</MDBCardTitle>
                        <MDBCardText>{product.description}</MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                ))}
                </MDBRow>
                </MDBTabsPane>
                <MDBTabsPane show={verticalActive === "searchResults"}>
                <MDBRow className="row-cols-1 row-cols-md-3 g-4">

                {searchResults.map((product) => (
                  <MDBCol key={product.id}>
                    <MDBCard className="h-100">
                      <MDBCardImage
                        src={product.image}
                        position="top"
                        alt="..."
                      />
                      <MDBCardBody>
                        <MDBCardTitle>{product.name}</MDBCardTitle>
                        <MDBCardText>{product.description}</MDBCardText>
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

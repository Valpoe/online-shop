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
} from "mdb-react-ui-kit";

import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import ProductInformation from "./ProductInformation";

//create element list for products

//create element list for products
const products_kynat = [
  {
    id: 1,
    name: "Kynä",
    price: 1.5,
    description: "This is a longer card with supporting text below as anatural lead-in to additional content. This content is a little bit longer.",
    image: "https://mdbootstrap.com/img/new/standard/city/044.webp",
  },
  {
    id: 2,
    name: "Kynä",
    price: 1.5,
    description: "Kynä, lead-in to additional content.",
    image: "https://mdbootstrap.com/img/new/standard/city/044.webp",
  },
  {
    id: 3,
    name: "Kynä",
    price: 1.5,
    description: "Kynä, card with supporting text below as anatural lead-in to additional content. This content is a little bit longer",
    image: "https://img.freepik.com/premium-psd/floating-pen-mockup_7956-394.jpg",
  },
  {
    id: 4,
    name: "Pensseli",
    price: 1.5,
    description: "Pensseli, lead-in to additional content.",
    image: "http://unblast.com/wp-content/uploads/2020/08/Ballpoint-Pen-Mockup-1.jpg",
  },
  {
    id: 5,
    name: "Pensseli 2.0",
    price: 1.5,
    description: "Pensseli 2.0, card with supporting text below as anatural lead-in to additional content. This content is a little bit longer",
    image: "https://jahtimedia.fi/sites/default/files/styles/meta_image/public/2019-02/Kuva1.jpg?h=56d95d7b&itok=nrPwM20k",
  },
  {
    id: 6,
    name: "Pensseli extreme 3.0",
    price: 1.5,
    description: "Pensseli extreme 3.0, lead-in to additional content.",
    //use pencil_turbo.png from Images folder
    image: "https://suomenluonto.fi/wp-content/uploads/2016/07/Martes_martes_Clunes_Scotland_1.jpg",
  }];

  const products_vihko = [
    {
      id: 13,
      name: "Vihko",
      price: 1.5,
      description: "This is a longer card with supporting text below as anatural lead-in to additional content. This content is a little bit longer.",
      image: "https://mdbootstrap.com/img/new/standard/city/044.webp",
    },
    {
      id: 26,
      name: "Vihko",
      price: 1.5,
      description: "Vihko, lead-in to additional content.",
      image: "https://mdbootstrap.com/img/new/standard/city/044.webp",
    }];

    //products_all contains each element from products_kynä and products_vihko
    const products_all = products_kynat.concat(products_vihko);

const Tuotteet = () => {
  const [verticalActive, setVerticalActive] = useState("kaikki-tuotteet");

  const handleVerticalClick = (value) => {
    if (value === verticalActive) {
      return;
    }

    setVerticalActive(value);
  };

  const filterCheapest = () => {
    console.log("halvin ensin");
  };

  return (
    <div>
      <>
        <div className="d-flex justify-content-center mt-3 mb-3">
          <MDBDropdown>
            <MDBDropdownToggle>Suodata tuotteita</MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem link onClick={filterCheapest}>
                Halvin ensin
              </MDBDropdownItem>
              <MDBDropdownItem link>Kallein ensin</MDBDropdownItem>
              <MDBDropdownItem link>Something else here</MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </div>
        <MDBRow>
          <MDBCol size="3">
            <MDBTabs pills className="flex-column text-center">
              <div className="d-none d-lg-block text-uppercase fw-bold mb-3 mt-3">
                <span>Kategoriat</span>
              </div>
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleVerticalClick("kaikki-tuotteet")}
                  active={verticalActive === "kaikki-tuotteet"}
                >
                  Kaikki tuotteet
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleVerticalClick("kynat")}
                  active={verticalActive === "kynat"}
                >
                  Kynät
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleVerticalClick("kumit")}
                  active={verticalActive === "kumit"}
                >
                  Kumit
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleVerticalClick("penaalit")}
                  active={verticalActive === "penaalit"}
                >
                  Penaalit
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleVerticalClick("vihkot")}
                  active={verticalActive === "vihkot"}
                >
                  Vihkot
                </MDBTabsLink>
              </MDBTabsItem>
            </MDBTabs>
          </MDBCol>
          <MDBCol size="8" className="mt-5">
            <MDBTabsContent>
              <MDBTabsPane show={verticalActive === "kaikki-tuotteet"}>
                <MDBRow className="row-cols-1 row-cols-md-3 g-4">

                  {products_all.map((product) => (
                    <MDBCol key={product.id}>
                      <MDBCard>
                        <MDBCardImage
                          src={product.image}
                          position="top"
                          alt="..."
                        />
                        <MDBCardBody>
                          <MDBCardTitle>{product.name}</MDBCardTitle>
                          <MDBCardText>{product.description}</MDBCardText>
                          <MDBCardText><a href={`productInformation/${product.id}`}>Link to details {product.name}</a></MDBCardText>
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
                    <MDBCard>
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
                            <MDBCard>
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
                    <MDBCard>
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
                    <MDBCard>
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

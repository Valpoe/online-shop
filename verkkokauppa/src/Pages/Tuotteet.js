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
                  <MDBCol>
                    <MDBCard className="h-100">
                      <MDBCardImage
                        src="https://mdbootstrap.com/img/new/standard/city/041.webp"
                        alt="..."
                        position="top"
                      />
                      <MDBCardBody>
                        <MDBCardTitle>Card title</MDBCardTitle>
                        <MDBCardText>
                          This is a longer card with supporting text below as a
                          natural lead-in to additional content. This content is
                          a little bit longer.
                        </MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                  <MDBCol>
                    <MDBCard className="h-100">
                      <MDBCardImage
                        src="https://mdbootstrap.com/img/new/standard/city/042.webp"
                        alt="..."
                        position="top"
                      />
                      <MDBCardBody>
                        <MDBCardTitle>Card title</MDBCardTitle>
                        <MDBCardText>This is a short card.</MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                  <MDBCol>
                    <MDBCard className="h-100">
                      <MDBCardImage
                        src="https://mdbootstrap.com/img/new/standard/city/043.webp"
                        alt="..."
                        position="top"
                      />
                      <MDBCardBody>
                        <MDBCardTitle>Card title</MDBCardTitle>
                        <MDBCardText>
                          This is a longer card with supporting text below as a
                          natural lead-in to additional content.
                        </MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                  <MDBCol>
                    <MDBCard className="h-100">
                      <MDBCardImage
                        src="https://mdbootstrap.com/img/new/standard/city/044.webp"
                        alt="..."
                        position="top"
                      />
                      <MDBCardBody>
                        <MDBCardTitle>Card title</MDBCardTitle>
                        <MDBCardText>
                          This is a longer card with supporting text below as a
                          natural lead-in to additional content. This content is
                          a little bit longer.
                        </MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBTabsPane>
              <MDBTabsPane show={verticalActive === "kynat"}>Kynät</MDBTabsPane>
              <MDBTabsPane show={verticalActive === "kumit"}>Kumit</MDBTabsPane>
              <MDBTabsPane show={verticalActive === "penaalit"}>
                Penaalit
              </MDBTabsPane>
              <MDBTabsPane show={verticalActive === "vihkot"}>
                Vihkot
              </MDBTabsPane>
            </MDBTabsContent>
          </MDBCol>
        </MDBRow>
      </>
    </div>
  );
};

export default Tuotteet;

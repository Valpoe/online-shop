import { Toast } from "bootstrap";
import { MDBCard, MDBCardText, MDBCol, MDBIcon, MDBTextArea, MDBInput, MDBCardBody, MDBRow, MDBCardImage, MDBBtn, MDBTypography } from "mdb-react-ui-kit";
import { useState, useEffect } from "react";
import "./ScrollableContainer.css"

function Yhteenveto(props) {

  // const getTotal = () => {
  //   if (!props.items) {
  //     return 0;
  //   }
  //   return props.items.reduce((total, item) => total + item.hinta, 0);
  // };

//count each tuoteID ammount in separate number
  const countItem = (itemID) => {
    let count = 0;
    props.items.forEach((item) => {
      if (item.tuoteid === itemID) { count++; }
    });
    return count;
  };

  
  const uniqueItems = [];
  props.items.filter((item) => {
    const index = uniqueItems.findIndex((uItem) => uItem.tuoteid === item.tuoteid);
    if (index === -1) {
      uniqueItems.push(item);
      return true;
    }
    return false;
  });

  
  return (
      <div className="scrollable-container">
          {uniqueItems.map((item) => (
        <MDBCard className="rounded-3 mb-4">
        <MDBCardBody>
          <MDBRow className="justify-content-between align-items-center">
            <MDBCol md="2" lg="2" xl="2">
              <MDBCardImage className="rounded-3" fluid
                src={item.kuva}
                alt={item.tuotenimi} />
            </MDBCol>
            <MDBCol md="3" lg="3" xl="3">
              <p className="lead fw-normal mb-2 text-muted">{item.tuotenimi}</p>
              <p>
                <span className="fw-bold">Tuotenumero:</span> {item.tuoteid}
                <MDBCardText><span className="fw-bold">Määrä:</span> {countItem(item.tuoteid)}</MDBCardText>
              </p>
            </MDBCol>
            <MDBCol md="3" lg="2" xl="2">
              <MDBTypography tag="h5" className="mb-0">
                {item.hinta} €
              </MDBTypography>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
          ))}
  {/* {getTotal() === 0 ? <h3 className="text-center mt-3">Ostoskori on tyhjä</h3> : <h3 className="text-center">Yhteensä: {getTotal()} €</h3>} */}
    </div>
  );
}
export default Yhteenveto;
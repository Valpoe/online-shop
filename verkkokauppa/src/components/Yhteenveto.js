import { Toast } from "bootstrap";
import { MDBCard, MDBCardText, MDBCol, MDBIcon, MDBTextArea, MDBInput, MDBCardBody, MDBRow, MDBCardImage, MDBBtn, MDBTypography } from "mdb-react-ui-kit";
import { useState, useEffect } from "react";

function Yhteenveto(props) {

  const removeItemWithID = (tuoteid) => {
    const newItems = [...props.items];
    console.log("trying to remove:" + tuoteid)

    //remove from list with matching tuoteid
    const index = newItems.findIndex((item) => item.tuoteid === tuoteid);
    if (index !== -1) {
      newItems.splice(index, 1);
      console.log("removed:" + tuoteid + " at index:" + index)
    }
    props.setItems(newItems);
  };

  const getTotal = () => {
    if (!props.items) {
      return 0;
    }
    return props.items.reduce((total, item) => total + item.hinta, 0);
  };

  useEffect(() => {

    async function sortItems() {
      //sort items
      props.setItems(props.items.sort((a, b) => (a.tuotenimi > b.tuotenimi) ? 1 : -1))
      console.log(props.items)
    }
    sortItems();

  }, [props.items]);



  const HandleAddToCart = (tuote) => {
    props.setItems([...props.items,{tuotenimi: tuote.tuotenimi, hinta: tuote.hinta, kuva: tuote.kuva, tuoteid: tuote.tuoteid}]);
    console.log(props.items);
  }

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
    <div className="p-4">
      <div>
        <ul>
          {uniqueItems.map((item) => (
        <MDBCard className="rounded-3 mb-4">
        <MDBCardBody className="p-4">
          <MDBRow className="justify-content-between align-items-center">
            <MDBCol md="2" lg="2" xl="2">
              <MDBCardImage className="rounded-3" fluid
                src={item.kuva}
                alt={item.tuotenimi} />
            </MDBCol>
            <MDBCol md="3" lg="3" xl="3">
              <p className="lead fw-normal mb-2">{item.tuotenimi}</p>
              <p>
                <span className="text-muted">Tuotenumero: {item.tuoteid}</span>
                <MDBCardText className="text-muted">Määrä: {countItem(item.tuoteid)}</MDBCardText>
              </p>
            </MDBCol>
            <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
              <MDBTypography tag="h5" className="mb-0">
                {item.hinta} €
              </MDBTypography>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
          ))}
        </ul>
      </div>
      <div>
        {getTotal() === 0 ? <h3 className="text-center">Ostoskori on tyhjä</h3> : <h3 className="text-center">Yhteensä: {getTotal()} €</h3>}
      </div>
    </div>
  );
}

export default Yhteenveto;
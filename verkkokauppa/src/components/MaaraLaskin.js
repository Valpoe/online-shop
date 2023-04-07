import { useState } from "react";
import { MDBCardText, MDBIcon, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import "./InputTypeNumberStyle.css"

function MaaraLaskin(props) {

  const [quantity, setQuantity] = useState(1);
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < props.tuote.varastosaldo) {
      setQuantity(quantity + 1);
    }
  };

  const HandleAddToCart = (tuote, quantity) => {
    const newItems = [...props.items];
    
    console.log("trying to add:" + tuote.tuoteID + " with quantity:" + quantity)
    for (let i = 0; i < quantity; i++) {
      newItems.push({ tuotenimi: tuote.tuotenimi, hinta: tuote.hinta, kuva: tuote.kuva, tuoteid: tuote.tuoteID });
    }
    props.setItems(newItems);
  }
  
  return (
    <>
      <MDBCardText className="fw-bold">Määrä:</MDBCardText>
      <div className="d-flex align-items-center justify-content-around">
        <MDBBtn color="link" onClick={() => decreaseQuantity()}>
          <MDBIcon fas icon="minus" />
        </MDBBtn>
        <MDBInput className="text-center" min="1" value={quantity} type="number" />
        <MDBBtn color="link" onClick={() => increaseQuantity()}>
          <MDBIcon fas icon="plus" />
        </MDBBtn>
          <button
            className="btn btn-success"
            onClick={() => HandleAddToCart(props.tuote, quantity)}
          >
            Lisää ostoskoriin
          </button>
      </div>
    </>
  );
}

export default MaaraLaskin;

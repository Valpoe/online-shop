import {
  MDBCard,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBCardBody,
  MDBRow,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useEffect } from "react";
import "./ScrollableContainer.css";

function Ostoskori(props) {

  // Poista tuoteid:n mukainen tuote
  const removeItemWithID = (tuoteid) => {
    const newItems = [...props.items];
    console.log("trying to remove:" + tuoteid);

    const index = newItems.findIndex((item) => item.tuoteid === tuoteid);
    if (index !== -1) {
      newItems.splice(index, 1);
      console.log("removed:" + tuoteid + " at index:" + index);
    }
    props.setItems(newItems);
  };

  // Lasketaan yhteishinta
  const getTotal = () => {
    if (!props.items) {
      return 0;
    }
    return props.items.reduce((total, item) => total + item.hinta, 0);
  };

  // Järjestetään tuotteet
  useEffect(() => {
    async function sortItems() {
      props.setItems(
        props.items.sort((a, b) => (a.tuotenimi > b.tuotenimi ? 1 : -1))
      );
      console.log(props.items);
    }
    sortItems();
  }, [props.items]);

  // Ostoskoriin lisäys
  const HandleAddToCart = (tuote) => {
    props.setItems([
      ...props.items,
      {
        tuotenimi: tuote.tuotenimi,
        hinta: tuote.hinta,
        kuva: tuote.kuva,
        tuoteid: tuote.tuoteid,
      },
    ]);
    console.log(props.items);
  };

  // Laskee jokaisen tuoteid:n määrän
  const countItem = (itemID) => {
    let count = 0;
    props.items.forEach((item) => {
      if (item.tuoteid === itemID) {
        count++;
      }
    });
    return count;
  };

  // Listaa kaikki uniikit tuotteet
  const uniqueItems = [];
  props.items.filter((item) => {
    const index = uniqueItems.findIndex(
      (uItem) => uItem.tuoteid === item.tuoteid
    );
    if (index === -1) {
      uniqueItems.push(item);
      return true;
    }
    return false;
  });

  return (
    <div className="p-4 scrollable-container">
      <div>
        {uniqueItems.map((item, index) => (
          <MDBCard key={index} className="rounded-3 mb-4">
            <MDBCardBody className="p-4">
              <MDBRow className="justify-content-between align-items-center">
                <MDBCol md="2" lg="2" xl="2">
                  <MDBCardImage
                    className="rounded-3"
                    fluid
                    src={item.kuva}
                    alt={item.tuotenimi}
                  />
                </MDBCol>
                <MDBCol md="3" lg="3" xl="3">
                  <p className="lead fw-normal mb-2 text-muted">
                    {item.tuotenimi}
                  </p>
                </MDBCol>
                <MDBCol
                  md="3"
                  lg="3"
                  xl="2"
                  className="d-flex align-items-center justify-content-around"
                >
                  <MDBBtn
                    color="link"
                    className="px-2"
                    onClick={() => removeItemWithID(item.tuoteid)}
                  >
                    <MDBIcon fas icon="minus" />
                  </MDBBtn>
                  <MDBInput
                    className="text-center"
                    min={0}
                    value={countItem(item.tuoteid)}
                    size="sm"
                  />
                  <MDBBtn
                    color="link"
                    className="px-2"
                    onClick={() => HandleAddToCart(item)}
                  >
                    <MDBIcon fas icon="plus" />
                  </MDBBtn>
                </MDBCol>
                <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                  <MDBTypography tag="h5" className="mb-0">
                    {item.hinta} €
                  </MDBTypography>
                </MDBCol>
                <MDBCol md="1" lg="1" xl="1" className="text-end">
                  <a href="#!" className="text-danger">
                    <MDBBtn
                      className="btn btn-light"
                      onClick={() => removeItemWithID(item.tuoteid)}
                    >
                      <MDBIcon fas icon="trash text-danger" size="lg" />
                    </MDBBtn>
                  </a>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        ))}
      </div>
      <div className="d-flex align-items-center justify-content-center">
        {getTotal() === 0 ? (
          <div className="text-center">
            <MDBIcon size="7x" fas icon="shopping-cart" />
          <h3 className="mt-3">Ostoskori on tyhjä</h3>
          </div>
        ) : (
          <h3 className="text-center">Yhteensä: {getTotal()} €</h3>
        )}
      </div>
    </div>
  );
}

export default Ostoskori;

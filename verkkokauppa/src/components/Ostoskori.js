import { MDBCard, MDBCardText, MDBCol, MDBIcon, MDBTextArea, MDBInput, MDBCardBody, MDBRow, MDBCardImage, MDBBtn, MDBTypography } from "mdb-react-ui-kit";

function Ostoskori(props) {

  const removeItem = (index) => {
    console.log(index);
    props.removeItem(index);
  };

  const getTotal = () => {
    if (!props.items) {
      return 0;
    }
    return props.items.reduce((total, item) => total + item.hinta, 0);
  };

  

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
        <MDBCardText>tuotteet</MDBCardText>
        <ul>
          {uniqueItems.map((item, index) => (
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
                <span className="text-muted">Määrä: {countItem(item.tuoteid)}   </span>
                <span className="text-muted">ItemID: {item.tuoteid}</span>
              </p>
            </MDBCol>
            <MDBCol md="3" lg="3" xl="2"
              className="d-flex align-items-center justify-content-around">
              <MDBBtn color="link" className="px-2">
                <MDBIcon fas icon="minus" />
              </MDBBtn>

              <MDBInput min={0} value={countItem(item.tuoteid)} type="number" size="sm" />

              <MDBBtn color="link" className="px-2">
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
               <MDBBtn className="btn btn-light" onClick={() => removeItem(index)} ><MDBIcon fas icon="trash text-danger" size="lg" /></MDBBtn> 
              </a>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
          ))}
        </ul>
      </div>
      <div>
        <h3>Yhteensä: {getTotal()} €</h3>
      </div>
    </div>
  );
}

export default Ostoskori;
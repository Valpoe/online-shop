import { MDBCardText, MDBTextArea } from "mdb-react-ui-kit";

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

  return (
    <div className="p-4">
      <div>
        <MDBCardText>tuotteet</MDBCardText>
        <ul>
          {props.items.map((item, index) => (
            <li key={index}>
              {item.tuotenimi} - {item.hinta} €
              <button className="btn btn-success p-2" onClick={() => removeItem(index)}>Remove Item</button>
            </li>
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
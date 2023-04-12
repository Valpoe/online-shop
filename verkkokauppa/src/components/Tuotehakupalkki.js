import { MDBInputGroup, MDBIcon, MDBInput } from "mdb-react-ui-kit";
import { useState } from "react";

function Tuotehakupalkki(props) {

  const [searchInput, setSearchInput] = useState("");

  // Hakupalkin toiminnallisuus
  const handleSearch = (e) => {
    e.preventDefault();
   setSearchInput(e.target.value);

    if (e.target.value === "") {
      props.setVerticalActive("kaikki-tuotteet");
    }

    if (e.target.value !== "") {
      const filteredProducts = props.tuotteet.filter((product) => {
        return product.tuotenimi
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      props.setSearchResults(filteredProducts);
      props.setVerticalActive("searchResults");
    }
  };

return (
 <>
 <MDBInputGroup>
            <MDBIcon className="m-3" icon="search" size="lg" />
            <MDBInput
              label="Etsi tuotteita"
              onChange={handleSearch}
              value={searchInput}
            />
          </MDBInputGroup>
     </>
 )
}

export default Tuotehakupalkki;
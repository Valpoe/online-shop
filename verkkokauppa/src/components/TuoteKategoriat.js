import {
  MDBBtn,
  MDBRange,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
} from "mdb-react-ui-kit";
import { useState, useEffect } from "react";

function TuoteKategoriat(props) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(400);

  // Tuotteen uniikkien värien listaus
  const uniqueColors = [
    ...new Set(props.tuotteet.map((product) => product.vari)),
  ];

  // Tuotekategorian valinta
  const handleVerticalClick = (value) => {
    if (value === props.verticalActive) {
      return;
    }
    props.setVerticalActive(value);
  };

  // Tuotteen värisuodatus
  const handleColorClick = (color) => {
    const filteredProducts = props.tuotteet.filter((product) => {
      return product.vari === color;
    });
    props.setSearchResults(filteredProducts);
    props.setVerticalActive("searchResults");
  };

  // Hinnan minimi arvon haku
  const handleMinSearch = (e) => {
    setMinPrice(e.target.value);

    const filteredProducts = props.tuotteet.filter((product) => {
      return product.hinta >= e.target.value && product.hinta <= maxPrice;
    });
    props.setSearchResults(filteredProducts);
    props.setVerticalActive("searchResults");
  };

  // Hinnan maksimiarvon haku
  const handleMaxSearch = (e) => {
    setMaxPrice(e.target.value);

    const filteredProducts = props.tuotteet.filter((product) => {
      return product.hinta <= e.target.value && product.hinta >= minPrice;
    });
    props.setSearchResults(filteredProducts);
    props.setVerticalActive("searchResults");
  };

  // Halvimman ja kalleimman tuotteen suodatus
  const [sort, setSort] = useState("cheapest");
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
  }, [sort]);

  const handleSortClick = (newSort) => {
    setSort(newSort);
  };

  useEffect(() => {
    const sortedProducts = props.tuotteet.slice().sort((a, b) => {
      if (sort === "cheapest") {
        return a.hinta - b.hinta;
      } else {
        return b.hinta - a.hinta;
      }
    });
    setSortedProducts(sortedProducts);
    props.setSearchResults(sortedProducts);
    props.setVerticalActive("searchResults");
  }, [sort, props.tuotteet]);

  return (
    <>
      <MDBTabs pills className="flex-column text-center">
        <div className="text-uppercase text-center fw-bold mb-3">
          <span>Kategoriat</span>
        </div>
        <MDBTabsItem>
          <MDBTabsLink
            className="square border border-2"
            onClick={() => handleVerticalClick("kaikki-tuotteet")}
            active={props.verticalActive === "kaikki-tuotteet"}
          >
            Kaikki tuotteet
          </MDBTabsLink>
        </MDBTabsItem>
        {props.kategoriat.map((kategoria) => (
          <MDBTabsItem key={kategoria.id}>
            <MDBTabsLink
              className="square border border-2"
              onClick={() => handleVerticalClick(kategoria.kategoriaID)}
              active={props.verticalActive === kategoria.kategoriaID}
            >
              {kategoria.kuvaus}
            </MDBTabsLink>
          </MDBTabsItem>
        ))}
      </MDBTabs>
      <div className="text-uppercase text-center fw-bold mb-3 mt-3">
        <span>Suodata tuotteita</span>
      </div>
      <div className="text-center mb-3">
        <MDBBtn
          color="secondary"
          outline
          onClick={() => {
            handleSortClick("cheapest");
          }}
        >
          Halvin ensin
        </MDBBtn>
        <MDBBtn
          color="secondary"
          outline
          onClick={() => {
            handleSortClick("expensive");
          }}
        >
          Kallein ensin
        </MDBBtn>
      </div>
      <div className="mb-3">
        <div className="text-center mb-3 mt-3">
          <span>Hinta</span>
        </div>
        <MDBRange
          min="0"
          max="200"
          label="Min"
          value={minPrice}
          onChange={handleMinSearch}
        />
        <MDBRange
          min="200"
          max="400"
          label="Max"
          value={maxPrice}
          onChange={handleMaxSearch}
        />
      </div>
      <div className="text-center mb-3">
        <div className="text-center mb-3 mt-3">
          <span>Väri</span>
        </div>
        {uniqueColors.map((color) => (
          <MDBBtn
            floating
            data-testid="colorButton"
            size="lg"
            className="m-1"
            key={color}
            style={{ backgroundColor: color }}
            onClick={() => handleColorClick(color)}
          ></MDBBtn>
        ))}
      </div>
    </>
  );
}

export default TuoteKategoriat;

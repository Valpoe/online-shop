import { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBRange,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
} from "mdb-react-ui-kit";

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

  // Hinnan minimiarvon haku
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

  useEffect(() => {}, [sort]);

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
    <div className="square border border-2 ms-2 p-2">
        <h6 className="text-uppercase fw-bold mb-4 mt-4">Kategoriat</h6>
        <MDBTabsItem>
          <MDBTabsLink
            className="square border border-2"
            onClick={() => handleVerticalClick("kaikki-tuotteet")}
            active={props.verticalActive === "kaikki-tuotteet"}
          >
            Kaikki tuotteet
          </MDBTabsLink>
        </MDBTabsItem>
        {props.kategoriat.map((kategoria, index) => (
          <MDBTabsItem key={index}>
            <MDBTabsLink
              className="square border border-2"
              onClick={() => handleVerticalClick(kategoria.kategoriaID)}
              active={props.verticalActive === kategoria.kategoriaID}
            >
              {kategoria.kuvaus}
            </MDBTabsLink>
          </MDBTabsItem>
        ))}
      </div>
      </MDBTabs>
      <div className="square border border-2 p-2 mt-3">
      <h6 className="text-uppercase fw-bold mb-4 text-center mt-4">
        Suodata tuotteita
      </h6>
      <div className="text-center mb-4">
        <MDBBtn
          className="me-2"
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
      <div className="mb-4 divWidth">
        <p className="text-center">Hinta</p>
        <div style={{ position: 'relative' }}>
        <MDBRange
          min="0"
          max="200"
          label="Min"
          value={minPrice}
          onChange={handleMinSearch}
        />
          <div style={{ position: 'absolute', right: 0}} className="badge badge-secondary p-2 rounded-3">{minPrice}</div>
          </div>
          <div style={{ position: 'relative' }}>
        <MDBRange
          min="200"
          max="400"
          label="Max"
          value={maxPrice}
          onChange={handleMaxSearch}
          />
        <div style={{ position: 'absolute', right: 0 }} className="badge badge-secondary p-2 rounded-3">{maxPrice}</div>
          </div>
      </div>
      <div className="mb-4 divWidth text-center">
        <p>Väri</p>
        {uniqueColors.map((color, index) => (
          <MDBBtn
            floating
            data-testid="colorButton"
            size="lg"
            className="m-1"
            key={index}
            style={{ backgroundColor: color }}
            onClick={() => handleColorClick(color)}
          ></MDBBtn>
        ))}
      </div>
      </div>
    </>
  );
}

export default TuoteKategoriat;

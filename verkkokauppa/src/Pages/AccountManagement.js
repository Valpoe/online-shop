
import { useEffect } from "react";
import { getAsiakkaatEmail, getTuote, getTuotteet } from "../components/Server/TuoteAPI";
import React, { useState } from "react";
import { editOrder } from "../components/Server/editTilausAPI";
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBFooter,
  MDBCardText,
} from "mdb-react-ui-kit";

const OrderManagement = (props) => {

  const [sahkopostit, setSahkopostit] = useState([]);
  const [tuotteet, setTuotteet] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // set isLoading to true when data is not available


  useEffect(() => {
    const fetchTuotteet = async () => {
      const data = await getTuotteet();
      setTuotteet(data);
      setIsLoading(false); // set isLoading to false when data is available
    };
    fetchTuotteet();
  }, []);


  //get tuotenimi with tuoteID from tuotteet
  const getTuotenimi = (tuoteID) => {
    if (tuotteet.length === 0) {
      return "Ladataan tuotteita...";
    }

    const tuote = tuotteet.find((tuote) => tuote.tuoteID === tuoteID);
    return tuote.tuotenimi;
  };
  //rest of the component code


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });

  useEffect(() => {
    setSahkopostit(getAsiakkaatEmail);
    
  }, []);

  useEffect(() => {

    props.userID !== null && props.userID !== undefined
      ? setFormData({
        ...formData,
        email: props.asiakasTiedot.customer.email,
        firstName: props.asiakasTiedot.customer.nimi.split(" ")[0],
        lastName: props.asiakasTiedot.customer.nimi.split(" ")[1],
        phone: props.asiakasTiedot.customer.puhelinnro,
        address: props.asiakasTiedot.customer.osoite.split(", ")[0],
        city: props.asiakasTiedot.customer.osoite.split(", ")[2],
        zip: props.asiakasTiedot.customer.osoite.split(", ")[1],
      })
      : setFormData({
        ...formData,
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        city: "",
        zip: "",
      });
  }, [props.userID]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [failedSubmit, setFailedSubmit] = useState(false);
  
  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (event) => {
    console.log("Form submitted" + JSON.stringify(formData));
    //clear ostoskori after submit and set tilaus to true
    //prevent page reload
    event.preventDefault();
  
    //scroll up
    window.scrollTo(0, 0);
    setIsSubmitting(true);
  
    // Perform form validation
    let errors = {};
    if (!formData.firstName) {
      errors.firstName = "Etunimi on pakollinen";
    }
    if (!formData.lastName) {
      errors.lastName = "Sukunimi on pakollinen";
    }
    if (!formData.email) {
      errors.email = "Sähköposti on pakollinen";
    } 
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "sähköposti on virheellinen";
    }
    //if sahkoposti is already in database
    if (formData.email && props.userID === null) {

      //if formEmail in sahkopostit;
      const isEmailInDatabase = sahkopostit.some(
        (email) => email === formData.email
      );
      
      if (isEmailInDatabase === true) {
        errors.email = "sähköposti on jo käytössä";
      }
    }
  
    if (!formData.phone) {
      errors.phone = "Puhelinnumero on pakollinen";
    }
    if (!formData.address) {
      errors.address = "Osoite on pakollinen";
    }
    if (!formData.city) {
      errors.city = "Kaupunki on pakollinen";
    }
    if (!formData.zip) {
      errors.zip = "Postinumero on pakollinen";
    } else if (!/^\d{5}(?:[-\s]\d{4})?$/.test(formData.zip)) {
      errors.zip = "Postinumero on virheellinen";
    }
    if(!formData.password && !formData.ATchecked === false){
      errors.password = "Salasana on pakollinen";
    }
    setFormErrors(errors);
  
    console.log("Form errors" + JSON.stringify(errors));
    console.log("Form data" + JSON.stringify(props.asiakasTiedot));
    //edit the form before pasting back
    props.asiakasTiedot.customer.email = formData.email;
    props.asiakasTiedot.customer.nimi = formData.firstName + " " + formData.lastName;
    props.asiakasTiedot.customer.puhelinnro = formData.phone;
    props.asiakasTiedot.customer.osoite = formData.address + ", " + formData.zip + ", " + formData.city;


    const editoredit = formData;
    //const userData = await editOrder(editoredit);

    //editAsiakas(JSON.stringify(props.asiakasTiedot.customer));
    //console.log(JSON.stringify(props.asiakasTiedot.customer));
    
    // If there are no errors, submit the form
    console.log("Kokeillaan PUT")

    //editOrder.();


    if (Object.keys(errors).length === 0 && props.items.length > 0) {
      // Perform form submission
      setIsSubmitting(false);
      setFailedSubmit(false);
      
  
      if(props.userID === null){
      //createTilaus.newTilaus(formData, uniqueItemsWithQuantity);
      }

      //print ostoskori json
      //Form output and filtered ostoskori output with quantyties
      console.log(formData);
      //console.log(JSON.stringify(uniqueItemsWithQuantity));
      alert('Form submitted successfully!');
    } else {
      //alert('Form submission failed!\n' + JSON.stringify(errors));
      console.log(errors);
      setIsSubmitting(false);
      setFailedSubmit(true);
    }
  };

  //sort tilaukset by ID
  function QuantityInput({ quantity, onChange }) {
    const [value, setValue] = useState(quantity);
  
    const increment = () => {
      setValue(value + 1);
      onChange(value + 1);
    };
  
    const decrement = () => {
      if (value > 0) {
        setValue(value - 1);
        onChange(value - 1);
      }
    };
  
    return (
      <div className="quantity-input">
        <button onClick={decrement}>-</button>
        <input
          type="number"
          min="0"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
        />
        <button onClick={increment}>+</button>
      </div>
    );
  }


  if(setIsLoading === true) {
    return (
      <div className="pb-5 pt-5" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
        <p>Its loading..</p>
      </div>
   )
}

  return (
    <div
      className="pb-5 pt-5"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
    >
      <section className="d-flex justify-content-center justify-content-lg-between">
        <MDBContainer className="text-center text-md-start">
          <MDBRow className="mb-4">
            <MDBCol className="mx-auto ps-5 pe-5">
              <form onSubmit={handleSubmit}>
                <h6 className="text-uppercase fw-bold mb-4">Omat tiedot</h6>

                <MDBInput className="mb-3"
                    label="Etunimi"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={formErrors.firstName}
                    outline="true"
                  />
                  {formErrors.firstName && (
                    <div className="text-danger mb-2">
                      *{formErrors.firstName}
                    </div>
                  )}
                  <MDBInput className="mb-3"
                    label="Sukunimi"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={formErrors.lastName}
                    outline="true"
                  />
                  {formErrors.lastName && (
                    <div className="text-danger mb-2">
                      *{formErrors.lastName}
                    </div>
                  )}

                  <MDBInput className="mb-3"
                    label="Sähköposti"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={formErrors.email}
                    outline="true"
                    disabled={true}
                  />
                  {formErrors.email && (
                    <div className="text-danger mb-2">*{formErrors.email}</div>
                  )}

                  <MDBInput className="mb-3"
                    label="Puhelinnumero"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={formErrors.phone}
                    outline="true"
                  />
                  {formErrors.phone && (
                    <div className="text-danger mb-2">*{formErrors.phone}</div>
                  )}

                  <MDBInput className="mb-3"
                    label="Osoite"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    error={formErrors.address}
                    outline="true"
                  />
                  {formErrors.address && (
                    <div className="text-danger mb-2">*{formErrors.address}</div>
                  )}

                  <MDBInput className="mb-3"
                    label="Kaupunki"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    error={formErrors.city}
                    outline="true"
                  />
                  {formErrors.city && (
                    <div className="text-danger mb-2">*{formErrors.city}</div>
                  )}

                  <MDBInput
                    label="Postinumero"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    error={formErrors.zip}
                    outline="true"
                  />

                  <MDBBtn
                    className="btn btn-primary btn-lg mt-4 mb-4"
                    color="primary"
                    type="submit"
                  >
                    Tallenna tiedot
                  </MDBBtn>
              </form>
            </MDBCol>

            <MDBCol className="mx-auto">
  <div className="scrollable-container table-container">
    <h6 className="text-uppercase fw-bold mb-4">Omat tilaukset</h6>
    {props.asiakasTiedot.orders.length === 0 && (
      <p className="text-center">Ei tilauksia</p>
    )}
    {props.asiakasTiedot.orders.map((order, index) => {
      const orderItems = props.asiakasTiedot.orderItems.filter(
        (orderItem) => orderItem.tilausid === order.tilausID
      );
      const formattedDate = new Date(order.tilauspvm).toLocaleDateString(
        "fi-FI"
      );

     // Check if this is the latest order with the highest orderID and orderItem.kpl
      const latestOrder = props.asiakasTiedot.orders.reduce((acc, curr) => {
        return acc.tilausID > curr.tilausID ? acc : curr;
      });
      
      const isLatestOrder = order.tilausID === latestOrder.tilausID && orderItems.some((orderItem) => orderItem.kpl > 0);
      
      return (
        <MDBTable hover>
          <React.Fragment key={order.tilausID}>
            <MDBTableHead>
              <tr>
                <th scope="col">Tilaus ID</th>
                <th scope="col">Tilauspäivämäärä</th>
                <th scope="col">Summa</th>
              </tr>
              <tr>
                <td>{order.tilausID}</td>
                <td>{formattedDate}</td>
                <td>{order.summa} €</td>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              <tr>
                <th>Tuotenimi</th>
                <th>Hinta</th>
                {isLatestOrder ? <th>Kpl</th> : null}
              </tr>
              {orderItems.map((orderItem) => {
                return (
                  <tr key={orderItem.tuoteid}>
                    <td>{getTuotenimi(orderItem.tuoteid)}</td>
                    <td>{orderItem.summa} €</td>
                    {isLatestOrder ? (
                        <td>
                          <QuantityInput
                            quantity={orderItem.kpl}
                            onChange={(quantity) =>
                              props.editOrderItem(
                                order.tilausID,
                                orderItem.tuoteid,
                                Number(quantity)
                              )
                            }
                          />
                        </td>
                    ) : (
                      <td>{orderItem.kpl}</td>
                    )}
                  </tr>
                );
              })}
            </MDBTableBody>
          </React.Fragment>
        </MDBTable>
      );
    })}
  </div>
</MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </div>
  );
};

export default OrderManagement;

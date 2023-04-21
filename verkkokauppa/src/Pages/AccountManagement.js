import { getTuote } from "../components/Server/TuoteAPI";
import { useEffect } from "react";
import { getAsiakkaatEmail } from "../components/Server/TuoteAPI";
import React, { useState } from "react";
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
      const isEmailInDatabase = await getAsiakkaatEmail(formData.email);
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
    // If there are no errors, submit the form
    if (Object.keys(errors).length === 0 && props.items.length > 0) {
      // Perform form submission

      setFailedSubmit(false);
      setIsSubmitting(false);
      

      if( props.userID !== null){
        console.log("asiakas ID:llä :" + props.userID + " teki tilauksen")
      }
  
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
                    disabled="true"
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

                  <MDBInput className="mb-3"
                    label="Postinumero"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    error={formErrors.zip}
                    outline="true"
                  />

                  <MDBBtn
                    className="btn btn-primary btn-lg btn-block mt-4"
                    color="primary"
                    type="submit"
                  >
                    Tallenna tiedot
                  </MDBBtn>
              </form>
            </MDBCol>

            <MDBCol className="mx-auto ps-5 pe-5">
              <h6 className="text-uppercase fw-bold mb-4">Omat tilaukset</h6>
              <MDBTable hover className="btn btn-success">
                <MDBTableHead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Tilaus ID</th>
                    <th scope="col">Tilauspäivämäärä</th>
                    <th scope="col">Summa</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody > 
                  {props.asiakasTiedot.orders.map((order) => {
                    const orderItems = props.asiakasTiedot.orderItems.filter((orderItem) => orderItem.tilausid === order.tilausID);
                    let tuote;
                    return (
                      <React.Fragment key={order.tilausID}>
                        <tr>
                          <th scope="col"></th>
                          <td>{order.tilausID}</td>
                          <td>{order.tilauspvm}</td>
                          <td>{order.summa} €</td>
                        </tr>
                        <tr>
                          <td colSpan="4">
                            <MDBTable hover>
                              <MDBTableBody className="btn btn-primary">
                              {orderItems.map((orderItem) => {
                                const tuote = getTuote(orderItem.tuoteid);
                                return (
                                  <tr key={orderItem.tuoteid}>
                                    <td>tuoteid: {orderItem.tuoteid}</td>
                                    <td>tuotenimi: {tuote.tuotenimi}</td>
                                    <td>summa: {orderItem.summa} €</td>
                                    <td>kpl: {orderItem.kpl}</td>
                                  </tr>
                                );
                              })}
                              </MDBTableBody>
                            </MDBTable>
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </MDBTableBody>
              </MDBTable>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </div>
  );
};

export default OrderManagement;

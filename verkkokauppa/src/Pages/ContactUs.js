import React, { useState } from "react";
import { MDBInput, MDBTextArea, MDBBtn } from "mdb-react-ui-kit";
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdb-react-ui-kit";
import koulutarvikekuva from "../Images/koulu-koulutarvikkeet-optimoitu.jpg";

const ContactUs = () => {
  const [status, setStatus] = useState("Lähetä");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Lähetetään...");
    const { name, email, message } = e.target.elements;
    let details = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    let response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });
    setStatus("Submit");
    let result = await response.json();
    alert(result.status);
    e.target.reset();
  };

  return (
    <div className="pt-5 pb-5" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
    <section className="d-flex justify-content-center justify-content-lg-between">
      <MDBContainer className="text-center text-md-start">
        <MDBRow>
          <MDBCol lg="4" md="5" className="mx-auto mb-5 ps-5 pe-5">
            <form onSubmit={handleSubmit}>
              <h6 className="text-uppercase fw-bold mb-4">Ota yhteyttä</h6>
              <p>
                <MDBInput label="Nimi" id="name" type="text" />
              </p>
              <p>
                <MDBInput label="Sähköposti" id="email" type="email" />
              </p>
              <p>
                <MDBTextArea label="Viesti" id="message" rows={4} />
              </p>
              <div className="d-flex justify-content-center">
                <MDBBtn type="submit" className="me-1">
                  {status}
                </MDBBtn>
              </div>
            </form>
          </MDBCol>
          <MDBCol lg="4" sm="8" md="5" className="mx-auto">
            <h6 className="text-uppercase fw-bold mb-4">Yhteystiedot</h6>
            <p>
              <MDBIcon icon="home" className="me-3" />
              Umpikuja 3, 12345 Kaupunki
            </p>
            <p>
              <MDBIcon icon="envelope" className="me-3" />
              ohj2ryhmaf@gmail.com
            </p>
            <p>
              <MDBIcon icon="phone" className="me-3" />
              + 01 234 567 88
            </p>
            <p>
              <MDBIcon icon="print" className="me-3" />
              + 01 234 567 89
            </p>
            <img src={koulutarvikekuva} alt="koulutarvikekuva" width="300" height="400" className="mt-3"/>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
    </div>
  );
};

export default ContactUs;

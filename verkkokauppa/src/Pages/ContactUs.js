import React, { useState } from "react";
import { MDBInput, MDBTextArea, MDBBtn } from "mdb-react-ui-kit";
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdb-react-ui-kit";

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
    <section className="">
      <MDBContainer className="text-center text-md-start mt-5">
        <MDBRow className="mt-3">
          <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
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
          <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Yhteystiedot</h6>
            <p>
              <MDBIcon icon="home" className="me-2" />
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
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default ContactUs;

import Logout from "../components/Logout";
import { logIn } from "../components/Server/LogInAPI";

import React from "react";
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";

const OrderManagement = (props) => {



  return (
    <div
      className="pb-5 pt-5"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
    >
      <section className="d-flex justify-content-center justify-content-lg-between">
        <MDBContainer className="text-center text-md-start">
          <MDBRow className="mb-4">
            <MDBCol className="mx-auto ps-5 pe-5">
              <form>
                <h6 className="text-uppercase fw-bold mb-4">Omat tiedot</h6>
                <MDBInput 
                wrapperClass="mb-4" 
                id="form6Example3"
                label="Nimi"
                >{props.asiakasTiedot.customer.nimi}</MDBInput>
                <MDBInput
                  wrapperClass="mb-4"
                  id="form6Example3"
                  label="Sähköposti"
                >{props.asiakasTiedot.customer.email}</MDBInput>
                <MDBInput
                  wrapperClass="mb-4"
                  id="form6Example3"
                  label="Osoite"
                >{props.asiakasTiedot.customer.osoite}</MDBInput>
                <MDBInput
                  wrapperClass="mb-4"
                  id="form6Example4"
                  label="Puhelinnumero"
                >{props.asiakasTiedot.customer.puhelinnro}</MDBInput>

                <MDBBtn type="submit">
                  Tallenna
                </MDBBtn>
              </form>
            </MDBCol>

            <MDBCol className="mx-auto ps-5 pe-5">
              <h6 className="text-uppercase fw-bold mb-4">Omat tilaukset</h6>
              <MDBTable hover>
                <MDBTableHead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Tilaus ID</th>
                    <th scope="col">Tilaus päivämäärä</th>
                    <th scope="col">Summa</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {props.asiakasTiedot.orders.map((order) => {
                    return (
                      <tr>
                        <th scope="row"></th>
                        <td>{order.tilausID}</td>
                        <td>{order.tilauspvm}</td>
                        <td>{order.summa} €</td>
                      </tr>
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

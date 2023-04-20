import Logout from "../components/Logout";
import { logIn } from "../components/Server/LogInAPI";
import { getTuote } from "../components/Server/TuoteAPI";

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
  MDBFooter,
  MDBCardText,
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
                value = {props.asiakasTiedot.customer.nimi}
                ></MDBInput>
                <MDBInput
                  wrapperClass="mb-4"
                  id="form6Example3"
                  label="Sähköposti"
                  value = {props.asiakasTiedot.customer.email}
                ></MDBInput>
                <MDBInput
                  wrapperClass="mb-4"
                  id="form6Example3"
                  label="Osoite"
                  value = {props.asiakasTiedot.customer.osoite}
                ></MDBInput>
                <MDBInput
                  wrapperClass="mb-4"
                  id="form6Example4"
                  label="Puhelinnumero"
                  value={props.asiakasTiedot.customer.puhelinnro}

                ></MDBInput>

                <MDBBtn type="submit">
                  Tallenna
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

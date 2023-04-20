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
                <MDBInput wrapperClass="mb-4" id="form6Example3" label="Nimi" />
                <MDBInput
                  wrapperClass="mb-4"
                  id="form6Example3"
                  label="Sähköposti"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  id="form6Example3"
                  label="Osoite"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  id="form6Example4"
                  label="Puhelinnumero"
                />

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
                  <tr>
                    <th scope="row">1</th>
                    <td>60</td>
                    <td>21.03.2023</td>
                    <td>400 egee</td>
                  </tr>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Tuote</th>
                    <th scope="col">Määrä</th>
                    <th scope="col">Hinta</th>
                  </tr>
                  <tr>
                    <td></td>
                    <td>paskapaperi</td>
                    <td>6 kpl</td>
                    <td>6 egee</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
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

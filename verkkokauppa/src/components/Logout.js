import { useState } from "react";
import { MDBCardText, MDBIcon, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import "./InputTypeNumberStyle.css"

function Logout(props) {

    const LogoutUser = () => {
        props.setUser(null);
    }

  return (
    <>
        <MDBBtn className="btn btn-primary" onClick={() => LogoutUser()}> Logout
        </MDBBtn>
    </>
  );
}

export default Logout;

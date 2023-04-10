import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBBtn, MDBInput, MDBCardHeader, MDBCardTitle, MDBCardText, MDBCardFooter, MDBContainer, MDBSpinner, MDBIcon } from 'mdb-react-ui-kit';


function SamankaltaisetTuotteet(props) {

    const HandleAddToCart = (tuote) => {
        props.setItems([...props.items,{tuotenimi: tuote.tuotenimi, hinta: tuote.hinta, kuva: tuote.kuva, tuoteid: tuote.tuoteID}]);
        console.log(props.items);
      }

return (
    <>
        {props.tuotekategoria.map((tuotteet) => (
                    <MDBCol key={props.tuotteet.tuoteID}>
                    <MDBCard className="h-100">
                        <MDBCardImage
                        src={props.tuotteet.kuva}
                        position="top"
                        alt="..."
                        />
                        <MDBCardBody>
                        <MDBCardHeader>
                                <MDBCardTitle>{props.tuotteet.tuotenimi}</MDBCardTitle>
                                </MDBCardHeader>
                            <MDBCardBody>
                                <MDBCardText>
                                Saldo: {props.tuotteet.varastosaldo}
                                </MDBCardText>
                                <MDBCardText>
                                <NavLink to={`/tuotteet/${props.tuotteet.tuoteID}`} onClick={() => props.setAktiivinenTuote(props.tuotteet.tuoteID)}>
                                    Lisätietoja
                                </NavLink>
                                </MDBCardText>
                                <MDBCardText><button className='btn btn-success' onClick={() => HandleAddToCart(props.tuotteet)}>Lisää ostoskoriin</button></MDBCardText>
                            </MDBCardBody>
                            <MDBCardFooter className="fw-bold">Hinta: {props.tuotteet.hinta} <MDBIcon fas icon="euro-sign" /></MDBCardFooter>
                        </MDBCardBody>
                    </MDBCard>
                    </MDBCol>
                        ))}
    </>
 )
}

export default SamankaltaisetTuotteet;
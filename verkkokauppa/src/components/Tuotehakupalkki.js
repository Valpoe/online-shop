import { MDBCard, MDBCardText, MDBCol, MDBIcon,
  MDBInput, MDBCardBody, MDBRow, MDBCardImage, MDBBtn, MDBTypography, MDBCardTitle, MDBCardHeader } from "mdb-react-ui-kit";
import { useState, useEffect } from "react";
import Tuotteet from './Pages/Tuotteet';

function Tuotehakupalkki(props) {

return (
 <>
 <div className="text-uppercase fw-bold mb-3 mt-3">
     <h2>{props.tuote.tuotenimi}</h2>
   </div>
     <MDBRow>
       <MDBCol className="mx-auto mb-5 text-center">
         <div className="">
         <MDBCard className='h-100'>
           <MDBCardImage src={props.tuote.kuva}
                     position="top"
                     alt="..." />
           <MDBCardBody>
             <MDBCardTitle>{props.tuote.nimi}</MDBCardTitle>
             <MDBCardText>{props.tuote.kuvaus}</MDBCardText>
           </MDBCardBody>
         </MDBCard>
         </div>
       </MDBCol>
       <MDBCol className="mx-auto mb-5 text-center">
         <div className="">
         <MDBCard className='mb-3 p-5'>
           <MDBCardHeader>
             <MDBCardTitle className="text-uppercase text-center fw-bold mb-3 mt-3">Tuotetiedot</MDBCardTitle>
           </MDBCardHeader>
           <MDBCardBody>
           <MDBCardText className="fw-bold">Väri: </MDBCardText>
           <div className="text-center">
           <MDBBtn
             floating
             size="md"
             className="mt-n2 mb-2"
             style={{ backgroundColor: props.tuote.vari}}
           ></MDBBtn>
           </div>
           <MDBCardText className="fw-bold">Tuotteen kuvaus:</MDBCardText>
           <MDBCardText>Tämä kynä on erittäin hyvä kynä.</MDBCardText>
           <MDBCardText>Hinta: {props.tuote.hinta} <MDBIcon fas icon="euro-sign" /></MDBCardText>
           <MaaraLaskin items={props.items} tuote={props.tuote} setItems={props.setItems}/>
             </MDBCardBody>
         </MDBCard>
         </div>
       </MDBCol>
     </MDBRow>
     </>
 )
}

export default Tuotehakupalkki;
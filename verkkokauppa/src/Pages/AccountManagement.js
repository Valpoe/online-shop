import React, { useState, useEffect } from 'react';
import Logout from '../components/Logout';
import { MDBCard, MDBCardBody, MDBContainer, MDBInput, MDBRow } from 'mdb-react-ui-kit';
import { LogIn } from "../components/Server/LogInAPI";

//get user details from database with userID
//display user details
//display order history
//display order details
//display order status

const OrderManagement = (props) => {

    return (
        <div>
            <div className='p-2'>
            <Logout userID={props.userID} setUser={props.setUser}></Logout>
            </div>
            <MDBCard>
                <MDBCardBody>
                <MDBRow>
                    <MDBContainer>
                        <h1>Hello customer...</h1>
                        <MDBInput label="First name" id="form1Example1" />
                        <MDBInput label="Last name" id="form1Example2" />
                        <MDBInput label="Your email" id="form1Example3" />
                    </MDBContainer>
                    <div>place holder for tilaushistoria</div>

                </MDBRow>
                    
                </MDBCardBody>                
            </MDBCard>            
        </div>
    );
  }

export default OrderManagement;
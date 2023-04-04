import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBIcon,
    MDBCollapse,  
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
  } from 'mdb-react-ui-kit';

const Header = () => {
    const [showNavCentred, setShowNavCentred] = useState(false);
    const [basicModal, setBasicModal] = useState(false);

    const toggleShow = () => setBasicModal(!basicModal);
    return(
      
        <MDBNavbar expand='lg' light bgColor='light' className="mb-5">
      <MDBContainer fluid>
        <MDBNavbarBrand style={{fontFamily: 'serif'}} >Kynä & Kumi</MDBNavbarBrand>
        <MDBIcon fas icon="pencil-ruler" />
        <MDBNavbarToggler
          type='button'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowNavCentred(!showNavCentred)}>
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNavCentred} className="collapse navbar-collapse justify-content-center" >
          <MDBNavbarNav fullWidth={false} className="mb-2 mb-lg-0" >
            <MDBNavbarItem>
            <NavLink to="/" className='nav-link'>Etusivu</NavLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <NavLink to="/tuotteet" className='nav-link'>Tuotteet</NavLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
            <NavLink to="/tietoa-meista" className='nav-link'>Tietoa meistä</NavLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
            <NavLink to="/ota-yhteytta" className='nav-link'>Ota yhteyttä</NavLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>


        <MDBBtn onClick={toggleShow}><MDBIcon fas icon="shopping-cart" /></MDBBtn>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Modal title</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>...</MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>


      </MDBContainer>
    </MDBNavbar>
    );
};

export default Header;
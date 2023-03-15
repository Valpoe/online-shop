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
    MDBCollapse
  } from 'mdb-react-ui-kit';

const Header = () => {
    const [showNavCentred, setShowNavCentred] = useState(false);
    return(
        <MDBNavbar expand='lg' light bgColor='light' >
      <MDBContainer fluid>
        <MDBNavbarBrand >Kynä & Kumi</MDBNavbarBrand>
        <MDBIcon fas icon="pencil-ruler" />
        <MDBNavbarToggler
          type='button'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowNavCentred(!showNavCentred)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNavCentred} class="collapse navbar-collapse justify-content-center" >
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
            <NavLink to="/ProductInformation" className='nav-link'>Tuote info</NavLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
            <NavLink to="/ostoskori" className='nav-link'>
              <MDBIcon fas icon="shopping-cart" />
            </NavLink>
            </MDBNavbarItem>

          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
    );
};

export default Header;
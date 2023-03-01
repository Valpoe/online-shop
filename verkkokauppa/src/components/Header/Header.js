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
    const [showNav, setShowNav] = useState(false);
    return(
        <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand>Kynä & Kumi</MDBNavbarBrand>
        <MDBNavbarToggler
          type='button'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowNav(!showNav)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNav}>
          <MDBNavbarNav>
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
            <NavLink to="/ostoskori" className='nav-link'>Ostoskori</NavLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
            <NavLink to="/privacystatement" className='nav-link'>Privacy statement</NavLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
    );
};

export default Header;
import React from 'react';
import {Nav, NavLink, NavMenu} from "./NavbarElements";

const Navbar = () => {
    return(
        <>
        <Nav>
            <NavMenu>
                <NavLink to="/" activeStyle>
                    Etusivu
                </NavLink>
                <NavLink to="/Tuotteet" activeStyle>
                    Tuotteet
                </NavLink>
                <NavLink to="/AboutUs" activeStyle>
                    AboutUs
                </NavLink>
                <NavLink to="Ostoskori" activeStyle>
                    Ostoskori
                </NavLink>
            </NavMenu>
        </Nav>
        </>
    );
};

export default Navbar;
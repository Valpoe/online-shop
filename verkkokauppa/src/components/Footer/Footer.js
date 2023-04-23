import React from "react";
import { NavLink } from "react-router-dom";
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

const Footer = () => {
  const currentYear = new Date().getFullYear();
return (
  <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span className="text-dark">Ota meihin yhteyttä sosiaalisessa mediassa:</span>
        </div>
        <div>
          <a href="/#" className='me-4 text-reset'>
            <MDBIcon fab icon="facebook-f" style={{color: "#3b5998"}} />
          </a>
          <a href='/#' className='me-4 text-reset'>
            <MDBIcon fab icon="twitter" style={{ color: '#55acee' }} />
          </a>
          <a href='/#' className='me-4 text-reset'>
            <MDBIcon fab icon="google" style={{ color: '#db4437' }} />
          </a>
          <a href='/#' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" style={{ color: '#ac2bac' }} />
          </a>
          <a href='/#' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" style={{ color: '#0072b1' }}/>
          </a>
          <a href='/#' className='me-4 text-reset'>
            <MDBIcon fab icon="github" className="text-dark" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase text-dark fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3 text-dark" />
                Kynä & Kumi
              </h6>
              <p>
              Varmista opintojesi menestys laadukkailla koulutarvikkeillamme. Osta nyt kaikkea kynistä kumeihin
              ja vihkoista kansioihin.
              </p>
            </MDBCol>
            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4 text-dark'>Navigoi</h6>
              <p>
                <NavLink to="/" className='text-reset text-dark'>Etusivu</NavLink>
              </p>
              <p>
              <NavLink to="/tuotteet" className='text-reset text-dark'>Tuotteet</NavLink>
              </p>
              <p>
              <NavLink to="/tietoa-meista" className='text-reset text-dark'>Tietoa meistä</NavLink>
              </p>
              <p>
              <NavLink to="/ota-yhteytta" className='text-reset'>Ota yhteyttä</NavLink>
              </p>
              <p>
              <NavLink to="/privacystatement" className='text-reset text-dark'>Tietosuojalausunto</NavLink>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4 text-dark'>Hyödylliset linkit</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Hinnoittelu
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Asetukset
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Lue lisää
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Tuki
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4 text-dark'>Ota yhteyttä</h6>
              <p>
                <MDBIcon icon="home" className="me-3" />
                Umpikuja 3, 12345 Kaupunki
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                ohj2ryhmaf@gmail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" />+ 358 123 456 789
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" />+ 358 987 654 321
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © {currentYear} Copyright: <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
           Kynä & Kumi
        </a>
      </div>
    </MDBFooter>
);
};
export default Footer;

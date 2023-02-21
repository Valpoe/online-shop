import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import kouluTarvikkeet from "./Images/KouluTarvikkeetKuva.png";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AboutUs (){
    return(
        <section className="bg-danger p-3 bg-opacity-25">
        <div className="container">
            <div className="row">
            <div className="col-md-8">
            <h4 className="fw-bold text-left">About Us</h4>
            <p className="text-left fs-5">We are School store, an online retailer specializing in providing high-quality school-related
                products to customers all over the world. Our mission is to bring joy and excitement to students
                by offering a wide range of school items at affordable prices. Our team is comprised of experts
                and enthusiasts who are dedicated to sourcing only the best school products from around the globe.
                From toys and apparel to accessories and collectibles, we have something for everyone who school supplys.
                We understand that our customers are looking for unique and high-quality weasel items, which is why
                we carefully curate our product offerings to ensure that we only carry the best of the best. Whether you're
                a proud student or simply a fan of school, you can rest assured that when you shop with us, you're getting the very best.
            </p>
            </div>
            <div className="col-md-4 d-flex align-items-end">
            <img width="400" height="400" src={kouluTarvikkeet} alt="koulutarvikkeet"></img>
            </div>
            </div>
        </div>
        </section>
    );

}

export {AboutUs};
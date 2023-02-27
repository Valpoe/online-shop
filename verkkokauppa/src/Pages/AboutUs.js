import React from 'react';
//import kouluTarvikkeet from "./Images/KouluTarvikkeetKuva.png";

const AboutUs = () => {

    return(
        <div>
            <section>
                <nav className="navbar navbar-light bg-warning p-3 bg-opacity-25">
                    <h2>Navbar</h2>        
                </nav>
            </section>

            <section className="bg-warning p-3 bg-opacity-25">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <h4 className="fw-bold text-left">About Us</h4>
                            <p className="text-left fs-5">We are School store, an online retailer specializing in providing high-quality school-related
                            products to customers all over the world. Our mission is to bring joy and excitement to students
                            by offering a wide range of school items at affordable prices. Our team is comprised of experts
                            and enthusiasts who are dedicated to sourcing only the best school products from around the globe.
                            From toys and apparel to accessories and collectibles, we have something for everyone who school supplys.
                            </p>
                            <p className="text-left fs-5">
                            We understand that our customers are looking for unique and high-quality school items, which is why
                            we carefully curate our product offerings to ensure that we only carry the best of the best. Whether you're
                            a proud student or simply a fan of school, you can rest assured that when you shop with us, you're getting the very best.
                            We are trying to make everyone's school journey just a little bit better.
                            Thank you for choosing our school supply store. We look forward to serving you and helping you achieve your academic goals.
                            </p>
                            <p className="text-left fs-5">
                            In addition to providing high-quality products and exceptional service, we also support the local community through various
                            charitable initiatives. We believe that education is the key to success, and we are committed to making it accessible to everyone,
                            regardless of their background or financial circumstances. We are also take to account environmental elements. We do that by using
                            recyclable materials and using environmentally positive product mechanism.  We only want to provide the best for our clients.
                            Please enjoy our products.
                            </p>
                        </div>
                        <div className="col-md-4 d-flex align-items-center">
                           
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );

}

export default AboutUs;
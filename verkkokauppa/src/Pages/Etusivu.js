import React from 'react';
import { MDBCarousel, MDBCarouselItem, MDBTypography } from 'mdb-react-ui-kit';
import EtusivuKuva3 from "../Images/ESvihkokuva.jpg"
import EtusivuKuva2 from "../Images/ESkuva2.jpg"
import EtusivuKuva1 from "../Images/ESkuva1.jpg"

const Etusivu = () => {

return(

<MDBTypography>
    <MDBCarousel showIndicators showControls dealy={3000} >
        <MDBCarouselItem
            className='w-100 d-block'
            itemId={1}
            src={EtusivuKuva1} 
            alt='...'
        />
        <MDBCarouselItem
            className='w-100 d-block'
            itemId={2}
            src={EtusivuKuva2} 
            alt='kynät'
        />
        <MDBCarouselItem
            className='w-100 d-block'
            itemId={3}
            src={EtusivuKuva3}
            alt='...'
        />
    </MDBCarousel>
</MDBTypography>

);

}

export default Etusivu;
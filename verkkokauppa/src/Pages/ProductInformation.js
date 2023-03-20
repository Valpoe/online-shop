import React from 'react';
import { useParams } from 'react-router-dom';
import { MDBTabsPane, MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBTextArea } from 'mdb-react-ui-kit';

function ProductInformation(){
    const { productId } = useParams();
  
    return(
      <div>
        <h1>ProductID = {productId}</h1>
        <ProductDetail/>
      </div>
    )
  }



//fetch haettu_tuote = tietkanta product where id = 1

const ProductDetail = () => {

return(

<div class="form-control p-5">
              <MDBRow className="row-cols-1 row-cols-md-2 g-4">

                          <MDBCol key="1">
                            <MDBCard>
                              <MDBCardImage
                                src="https://mdbootstrap.com/img/new/standard/nature/184.jpg"
                                position="top"
                                alt="..."
                              />
                              <MDBCardBody>
                                <MDBCardTitle>PRODUCT WIP</MDBCardTitle>
                                <MDBCardText>DESCRIPTION OF THE PRODUCT</MDBCardText>
                              </MDBCardBody>
                            </MDBCard>

                          </MDBCol>
                          <MDBCol key="2" class="">
                            <MDBCard>
                              <MDBCardBody>
                                <MDBCardTitle>COLOUR</MDBCardTitle>
                                <MDBCardText>Lirum lipsum</MDBCardText>
                                <MDBCardFooter></MDBCardFooter>
                                <MDBCardText>"This product is out of stock at the moment, Tapio Räsänen will
                                     handle this issues as soon as possible. Thank you for your patience!</MDBCardText>
                                <MDBCardText>Price: 10€ - <a href='#'>Get notified when back in stock!</a></MDBCardText>
                              </MDBCardBody>
                            </MDBCard>
                            <MDBCard>
                              <MDBCardBody>
                                <MDBCardTitle>CUSTOMISE YOUR PRODUCT</MDBCardTitle>
                                <MDBCardText>Choose colour</MDBCardText>
                                <div class="p-2">
                                    <div>
                                        <input type="radio" id="red" name="colour" value="red"/>
                                        <label class="p-2" for="red">Red</label>
                                        <input type="radio" id="blue" name="colour" value="blue"/>
                                        <label class="p-2" for="blue">Blue</label>
                                        <input type="radio" id="green" name="colour" value="green"/>
                                        <label class="p-2" for="green">Green</label>                            
                                    </div>
                                </div>
                                <MDBCardFooter></MDBCardFooter>
                                <MDBCardText>Choose size</MDBCardText>
                                <div class="p-2">
                                    <div>
                                        <input type="radio" id="small" name="size" value="small"/>
                                        <label class="p-2" for="small">Small</label>
                                        <input type="radio" id="medium" name="size" value="medium"/>
                                        <label class="p-2" for="medium">Medium</label>
                                        <input type="radio" id="large" name="size" value="large"/>
                                        <label class="p-2" for="large">Large</label>
                                    </div>
                                </div>
                              </MDBCardBody>
                            </MDBCard>
                          </MDBCol>
                          
            </MDBRow>
            

</div>

);

}

export default ProductInformation;
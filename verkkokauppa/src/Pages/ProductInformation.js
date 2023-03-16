import React from 'react';
import { useParams } from 'react-router-dom';

function ProductInformation(){
    const { productId } = useParams();
  
    return(
      <div>
        <h1>ProductID = {productId}</h1>
        <ProductDetail/>
      </div>
    )
  }


const ProductDetail = () => {

return(

<div>
        <h1>Tuotteen tiedot:</h1>
        <p>Värit: </p>
        <div>
            <div>
            <label class="container">Valkoinen
                <input type="checkbox" />
                <span class="checkmark"></span>
                </label>

                <label class="container">Musta
                <input type="checkbox"/>
                <span class="checkmark"></span>
                </label>

                <label class="container">Keltainen
                <input type="checkbox"/>
                <span class="checkmark"></span>
                </label>

                <label class="container">Sininen
                <input type="checkbox"/>
                <span class="checkmark"></span>
                </label>
            </div>
            <div>
                <label>Määrä:</label>
                <input type="number" min="1" max="10" />
            </div>
            <div>
                Tuotteen arvosana:
            </div>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.10.2/css/all.css" />

            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.10.2/css/all.css" />
        <form class="rating">
        <label>
            <input type="radio" name="stars" value="1" />
            <span class="fa fa-star icon"></span>
        </label>
        <label>
            <input type="radio" name="stars" value="2" />
            <span class="fa fa-star icon"></span>
            <span class="fa fa-star icon"></span>
        </label>
        <label>
            <input type="radio" name="stars" value="3" />
            <span class="fa fa-star icon"></span>
            <span class="fa fa-star icon"></span>
            <span class="fa fa-star icon"></span>   
        </label>
        <label>
            <input type="radio" name="stars" value="4" />
            <span class="fa fa-star icon"></span>
            <span class="fa fa-star icon"></span>
            <span class="fa fa-star icon"></span>
            <span class="fa fa-star icon"></span>
        </label>
        <label>
            <input type="radio" name="stars" value="5" />
            <span class="fa fa-star icon"></span>
            <span class="fa fa-star icon"></span>
            <span class="fa fa-star icon"></span>
            <span class="fa fa-star icon"></span>
            <span class="fa fa-star icon"></span>
        </label>
        </form>
        </div>
</div>

);

}

export default ProductInformation;
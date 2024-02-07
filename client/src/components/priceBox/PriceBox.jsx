import React from 'react'
import "./priceBox.css"


function PriceBox(prop) {
    return (
        <div className='PriceBox'>
            <h1 className='price'>
                ${prop.price}
            </h1>
            <div className="feature">
           
            <p>{prop.f1}</p>
            <p>{prop.f2}</p>
            <p>{prop.f3}</p>
           
            </div>
            <div className='buy_button'>
                <button>Proceed</button>
                
            </div>
            
            
        </div>
        
    )
}

export default PriceBox

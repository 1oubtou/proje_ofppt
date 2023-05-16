import React from 'react'
import AddToCartButton from './AddToCartButton'

const ProdactApiReturn = (props) => {
  const myStyle = {
      display: "-webkit-box",
      WebkitLineClamp: 1,
      WebkitBoxOrient: "vertical",
    };

  return (
      <div>
          <div className="overflow-x-hidden rounded-xl border h-48">
              <img className="w-full h-full rounded-2xl " src={`http://localhost:8000/storage/${props.products.image}`} width={100} />
          </div>
          <div className="mt-2 pl-2 mb-2">
              <a className="text-lg font-semibold text-gray-900 mb-3 overflow-hidden" style={myStyle} >{props.products.title}</a>
              <div className="pr-2 flex justify-between items-center">
                  <p className="text-md text-gray-800 mt-0 font-bold">{props.products.price} $</p>
                  <AddToCartButton item={props.products} />
              </div>
          </div>
      </div>
  )
}

export default ProdactApiReturn
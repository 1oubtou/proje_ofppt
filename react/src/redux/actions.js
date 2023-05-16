import { ADD_TO_CART, DECREMENT_PRODUCT_QUANTITY, INCREMENT_PRODUCT_QUANTITY, REMOVE_FROM_CART } from './types';

export const addToCart = (id , title , price , image , qty) => ({
  type: ADD_TO_CART,
  payload: {id , title , price , image , qty}
});

export const removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  payload: id
});

export const incrementProductQuantity = (id) => {
  return {
    type: INCREMENT_PRODUCT_QUANTITY,
    payload: id
  }
}

export const decrementProductQuantity = (id) => {
  return {
    type: DECREMENT_PRODUCT_QUANTITY,
    payload: id
  }
}
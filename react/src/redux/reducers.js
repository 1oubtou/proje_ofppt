import { ADD_TO_CART, DECREMENT_PRODUCT_QUANTITY, INCREMENT_PRODUCT_QUANTITY, REMOVE_FROM_CART } from './types';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  cart: [],
  totalPrice: 0,
};

const persistConfig = {
  key: 'root',
  storage,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingProduct = state.cart.find(product => product.id === action.payload.id)
      if (existingProduct) {
        return {
          ...state,
          cart: state.cart.map(product => {
            if (product.id === action.payload.id) {
              return { ...product, qty: product.qty + 1 }
            }
            return product
          }),
          totalPrice: state.totalPrice + action.payload.price,
        }
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, qty: 1 }],
          totalPrice: state.totalPrice + action.payload.price,
        }
      }
    
    case INCREMENT_PRODUCT_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item => {
            if (item.id === action.payload) {
                return {
                    ...item,
                    qty: item.qty + 1
                };
            }
            return item;
        }),
        totalPrice: state.totalPrice + state.cart.find(item => item.id === action.payload).price,
    };


    case DECREMENT_PRODUCT_QUANTITY:
      const itemToDecrement = state.cart.find(item => item.id === action.payload);
      return {
        ...state,
        cart: state.cart.map(item => {
          if (item.id === action.payload) {
            const updatedQty = item.qty - 1;
            if (updatedQty > 0) {
              return {
                ...item,
                qty: updatedQty
              };
            } else {
              return null; // remove item from cart
            }
          }
          return item;
        }).filter(item => item !== null),
        totalPrice: state.totalPrice - itemToDecrement.price,
    };

    
    case REMOVE_FROM_CART:
      const itemToRemove = state.cart.find(item => item.id === action.payload);
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
        totalPrice: state.totalPrice - (itemToRemove.qty * itemToRemove.price),
      };
    default:
      return state;
  }
};


const persistedReducer = persistReducer(persistConfig, cartReducer);

export default persistedReducer;

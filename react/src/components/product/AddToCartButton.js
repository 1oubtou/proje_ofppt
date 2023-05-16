import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions';

function AddToCartButton(props) {
    // let buttonadd = 
    const dispatch = useDispatch();
  
    const handleClick = () => {
        dispatch(addToCart(props.item.id , props.item.title , props.item.price , props.item.image));
    }
  
  return (
        <button onClick={handleClick} className='inline-flex items-center rounded-md border border-transparent bg-[#ffa23e] px-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-[#ff9727]'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 p-0.5 group-hover:opacity-50 opacity-70" fill="none" viewBox="0 0 24 24" stroke="white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        </button>
  )
}

export default AddToCartButton;
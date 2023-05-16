import { NavLink } from 'react-router-dom';
import { useAuth } from '../api/auth'
import Cart from '../components/navbar/Cart'
import { Section, Marck, Product } from '../components/export';

function Home() {
  const { user } = useAuth({ middleware: 'guest' })

  return (
    <div className="flex items-top justify-center bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
      <div className='fixed top-0 z-50 flex items-center justify-between w-full h-16 px-40 bg-white'>
        <img src='img/logo.gif' className='h-8' />
        <div className='flex items-center space-x-3'>
          <Cart />
          {user ?
            <NavLink to="/product" className="space-x-8 sm:-my-px sm:ml-10 sm:flex" >
              Product
            </NavLink>
            :
            <>
              <NavLink to="/login" className="ml-4 text-sm text-gray-700 underline" >
                Login
              </NavLink>
              <NavLink to="/register" className="ml-4 text-sm text-gray-700 underline" >
                Register
              </NavLink>
            </>
          }
        </div>
      </div>
      <div className='my-24'>
          <Section />
          <Marck />
          <Product />
      </div>
    </div>
  );
}

export default Home;

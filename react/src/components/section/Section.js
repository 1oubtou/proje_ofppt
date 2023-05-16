import React from 'react'

const Section = () => {
  return (
    <div className='w-[90%] max-w-[100rem] m-auto h-32 sm:h-80 rounded-xl flex justify-around items-center bg-[#f7ede2]'>
      <img src='./img/cart_l.png' width={300} className='hidden lg:block' />
      <div>
        <p className='text-3xl text-center sm:text-left lg:text-center sm:ml-16 font-bold mb-2 text-[#58595b] uppercase'>online order</p>
        <p className='text-sm text-center sm:text-left sm:text-2xl lg:text-center sm:ml-9'>The <span className='font-bold text-[#58595b]'>Shopping</span> experience everyone is talking about!</p>
      </div>
      <img src='./img/cart_r.png' width={300} className='hidden sm:block' />
    </div>
  )
}

export default Section
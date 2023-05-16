import { useState } from 'react';

const Edit = (props) => {
    const [isVisible, setIsVisible] = useState(false);
    const handleButtonClick = () => {
        setIsVisible(!isVisible);
    };
  return (
    <div className='p-0 m-0' >
        <button onClick={handleButtonClick} >{props.text}</button>
        {isVisible && (
            <div onClick={handleButtonClick} className="relative z-10" role="dialog" aria-modal="true">
            <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                        <div className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                            <div className="rounded-md relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                <button onClick={handleButtonClick} type="button" className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                                <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                                    <img src={`http://127.0.0.1:8000/storage/${props.product.image}`} alt="Two each of gray, white, and black shirts arranged on table." className="object-cover object-center max-h-96" />
                                </div>
                                <div className="sm:col-span-8 lg:col-span-7">
                                    <h2 className="text-3xl font-bold text-gray-900 sm:pr-12">{props.product.title}</h2>
                                    <section aria-labelledby="information-heading" className="mt-2">
                                        <div className="mt-6">
                                        <div className="flex items-center">
                                            <div className="flex items-center">
                                            <p className="text-2xl text-gray-900">{props.product.price} $</p>
                                            </div>
                                        </div>
                                        </div>
                                    </section>
                                    <section aria-labelledby="options-heading" className="mt-10">
                                            <a href="#" className="text-xl font-medium text-indigo-600 hover:text-indigo-500">{props.product.category}</a>
                                        {/* Sizes */}
                                        <div className="mt-10">
                                            <div className="flex items-center justify-between">
                                            <h4 className="text-2xl text-gray-900">{props.product.description}</h4>
                                            </div>
                                            
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  )
}

export default Edit

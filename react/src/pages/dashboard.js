import { Link, useNavigate } from 'react-router-dom'
import AppLayout from '../components/components/Layouts/AppLayout'
import { useEffect, useState } from 'react'
import axios from '../lib/axios'
import Edit from './edit'
import Swal from 'sweetalert2'

const Dashboard = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
        const csrf = () => axios.get('/sanctum/csrf-cookie')
        try {
            await csrf();
            axios.get('/api/myproducts')
            .then(response => {
                setData(response.data);
            });
          } catch (error) {
            console.error(error);
          }
        };
        
        fetchData();
    }, []);

    const navigate = useNavigate();
    function detail(id) {
        navigate(`/product/${id}`);
    }

    const deleteProduct = (id) => {
        Swal.fire({
            title : 'are you sure?',
            text : 'Do you want to delete this product?',
            icon : 'warning',
            showCancelButton : true,
            confirmButtonText : 'Delete',
            cancelButtonText : 'Cancel',
            confirmButtonColor : '#d33',
            cancelButtonColor : '#3085d6',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const csrf = () => axios.get('/sanctum/csrf-cookie')
                try{
                    await csrf()
                    axios.delete(`/api/myproducts/${id}`)
                    Swal.fire('Product removed!', '' , 'success')
                }catch (error){
                    Swal.fire('An error occurred while deleting the product' ,'an error occurred!' , error)
                }
            }
        })
    }

  return (
      <AppLayout>
          <div className="py-12">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                  <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                        <div className="items-start justify-between md:flex">
                            <div className="max-w-lg">
                                <h3 className="text-gray-800 font-medium text-xl sm:text-2xl"> Products list </h3>
                            </div>
                            <div className="mt-3 md:mt-0">
                                <Link to="/product/add" className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm" >
                                    Add Product
                                </Link>
                            </div>
                        </div>
                        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                            <table className="w-full table-auto text-sm text-left">
                                <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                                    <tr>
                                        <th className="py-3 text-center">Image</th>
                                        <th className="py-3 pl-6">Product Name</th>
                                        <th className="py-3 px-6">Description</th>
                                        <th className="py-3 px-6">Category</th>
                                        <th className="py-3 px-6">Price</th>
                                        <th className="py-3 px-6 text-center">Actions</th>
            
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 divide-y">
                                    {
                                        data.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="flex justify-center py-3 px-6 whitespace-nowrap">
                                                    <img src={`http://127.0.0.1:8000/storage/${item.image}`} className="w-10 h-10 rounded-full" />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                                                <td className="px-6 py-4 whitespace-nowrap ">
                                                  <p className='truncate w-[150px]'> {item.description} </p>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
                                                <td className="text-center px-6 whitespace-nowrap">
                                                    <div className='flex justify-center'>
                                                        <a className="py-2 px-3 font-medium text-green-500 hover:text-text-green-500 duration-150 rounded-lg">
                                                            <Edit product={item} text={'Show'} />
                                                        </a>
                                                        <div className="py-2 px-3 font-medium text-indigo-500 hover:text-text-indigo-500 duration-150 rounded-lg">
                                                            <button className='btn btn-outline-primary' onClick={() => detail(item.id)}>Edit</button>
                                                        </div>
                                                        <button onClick={() => deleteProduct(item.id)} className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 rounded-lg">
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
          </div>
      </AppLayout>
  )
}

export default Dashboard

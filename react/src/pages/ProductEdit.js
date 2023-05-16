import { Link, useNavigate, useParams } from 'react-router-dom'
import AppLayout from '../components/components/Layouts/AppLayout'
import { useState } from 'react'
import AuthValidationErrors from '../components/components/AuthValidationErrors'
import axios from '../lib/axios'
import { useEffect } from 'react'

const ProductEdit = () => {
    const { id } = useParams()
    let navigate = useNavigate();
    const [title , setTitle] = useState('')
    const [price , setPrice] = useState(0)
    const [category , setCategory] = useState('')
    const [description , setDescription] = useState('')
    const [image, setImage] = useState(null)
    const [errors, setErrors] = useState([])
    
    const [fileName, setFileName] = useState(null)
    const [file, setFile] = useState(null)


    const [idData, setIdData] = useState()



    const handleFileUpload = ({ target: {files} }) => {
        setImage(files[0])
        files[0] && setFileName(files[0].name)
        if (files) {
          setFile(URL.createObjectURL(files[0]))
        }
      }

    useEffect(() => {
        const fetchData = async () => {
        const csrf = () => axios.get('/sanctum/csrf-cookie')
        try {
            await csrf();
            axios.get(`/api/myproducts/${id}`)
            .then(response => {
                const {id , image , title , category , price , description } = response.data
                setIdData(id)
                setTitle(title);
                setCategory(category);
                setPrice(price);
                setDescription(description);
                setFile(`http://127.0.0.1:8000/storage/${image}`);
                setImage(null);
            });
          } catch (error) {
            console.error(error);
          }
        };
        
        fetchData();
    }, []);
    
    const submitForm = async (e) => {
        e.preventDefault()
        const csrf = () => axios.get('/sanctum/csrf-cookie')
        if ( image !== undefined && title !== undefined && price !== undefined && category !== undefined && description !== undefined && setErrors) {
            const formData = new FormData();
            formData.append('_method', 'PATCH');
            formData.append('title', title);
            formData.append('price', price);
            formData.append('category', category);
            formData.append('description', description);
            if(image!==null){
                formData.append('image', image)
              }
              await axios.post(`/api/myproducts/${id}`, formData)
              .then(response => {
                console.log(response)
                navigate('/product')
            })
            .catch(error => {
                console.log(error.response.data)
                if (error.response.status !== 422) throw error
                  setErrors(Object.values(error.response.data.errors).flat())
            })
        }
    }
    console.log({idData , image , title , price , category , description , setErrors});

    return (
        <AppLayout>
            <div>
                <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-xl"> 
                    <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                        <div className="px-5 py-7">
                        <AuthValidationErrors className="mb-4" errors={errors} />
                            <form onSubmit={submitForm}>
                                <div className='mb-4'>
                                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} id="title" placeholder="Title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                <div className="grid gap-6 mb-4 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                        <input type="number" value={price} onChange={e => setPrice(e.target.value)} id="price" placeholder="Price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                    </div> 
                                    <div>
                                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                        <select id="category" value={category} onChange={e => setCategory(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required>
                                            <option >Electronics</option>
                                            <option value="tv">TV/Monitors</option>
                                            <option value="pc">PC</option>
                                            <option value="ga">Gaming/Console</option>
                                            <option value="ph">Phones</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='mb-6'>
                                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                    <textarea id="message" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description..." rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                <div className="flex items-center space-x-2 w-full mb-5">
                                    {
                                        file ? <img src={file} className='w-16 h-16 rounded-lg' />:null
                                    }
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-16 h-16 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            {!fileName ? "+" : '↺'}
                                        </div>
                                        <input id="dropzone-file" type="file" accept='image/*' className="hidden" onChange={handleFileUpload} />
                                    </label>
                                </div>
                                <div className='flex space-x-5 pt-2'>
                                    <Link to="/product" type="button" className="text-sm font-medium text-gray-900 rounded-lg border border-gray-200 py-2.5 w-full shadow-sm hover:shadow-sm text-center inline-block">
                                        <span className="inline-block mr-2">Annuler</span>
                                    </Link>
                                    <button type="submit" className="transition duration-200 bg-blue-600 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                                        <span className="inline-block mr-2">Create product</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default ProductEdit

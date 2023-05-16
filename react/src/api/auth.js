import useSWR from 'swr'
import axios from '../lib/axios'
import {useEffect} from 'react'
import {useNavigate, } from 'react-router-dom';

export const useAuth = ({middleware, redirectIfAuthenticated} = {}) => {
  let navigate = useNavigate();

  const {data: user, error, mutate} = useSWR('/api/user', () =>
    axios
      .get('/api/user')
      .then(res => res.data)
      .catch(error => {
        if (error.response.status !== 409) throw error

        mutate('/verify-email')
      }),
  {
    revalidateIfStale: false,
    revalidateOnFocus: false
  }
  )

  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const register = async ({setErrors, ...props}) => {
    await csrf()
    setErrors([])
    axios
      .post('/register', props)
      .then(() => mutate())
      .catch(error => {
        if (error.response.status !== 422) throw error
        setErrors(Object.values(error.response.data.errors).flat())
      })
  }

  const login = async ({setErrors, ...props}) => {
    await csrf()
    setErrors([])
    axios
      .post('/login', props)
      .then(() => mutate())
      .catch(error => {
        if (error.response.status !== 422) throw error
        setErrors(Object.values(error.response.data.errors).flat())
      })
  }

  const logout = async () => {
    if (!error) {
      await axios.post('/logout')
      mutate()
    }
    window.location.pathname = '/login'
  }

  const addProduct = async ({ title, price, category, description, image, setErrors }) => {
    await csrf()
    setErrors([])
  
    const formData = new FormData()
    formData.append('title', title)
    formData.append('price', price)
    formData.append('category', category)
    formData.append('description', description)
    formData.append('image', image)
  
    axios.post('/api/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
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

  


  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && user) navigate(redirectIfAuthenticated)
    if (middleware === 'auth' && error) logout()
  }, [user, error])

  return {
    user,
    register,
    login,
    logout,
    addProduct
  }
}

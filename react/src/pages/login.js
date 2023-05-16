import AuthCard from '../components/components/AuthCard'
import AuthValidationErrors from '../components/components/AuthValidationErrors'
import Button from '../components/components/Button'
import GuestLayout from '../components/components/Layouts/GuestLayout'
import Input from '../components/components/Input'
import Label from '../components/components/Label'
import { useAuth } from '../api/auth'
import { useState } from 'react'
import { Link, NavLink} from 'react-router-dom';

const Login = () => {

  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/product'
  })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  const submitForm = async event => {
    event.preventDefault()
    login({ email, password, setErrors })
  }

  return (
    <GuestLayout>
      <AuthCard
        logo={
          <Link to="/">
            <img src='img/logo.gif' className='h-24' />
          </Link>
        }>
        {/* Session Status */}
        {/* Validation Errors */}
        <AuthValidationErrors className="mb-4" errors={errors} />
        <form onSubmit={submitForm}>
          {/* Email Address */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-[#ffa23e] shadow-sm rounded-lg"
              onChange={event => setEmail(event.target.value)}
              required
              autoFocus
            />
          </div>
          {/* Password */}
          <div className="mt-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-[#ffa23e] shadow-sm rounded-lg"
              onChange={event => setPassword(event.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          {/* Remember Me */}
          <div className="block mt-4">
            <label
              htmlFor="remember_me"
              className="inline-flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                name="remember"
                className="rounded border-gray-300 text-indigo-600
                shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-600">
                  Remember me
              </span>
            </label>
          </div>
          <div className="flex items-center justify-end mt-4">
            <NavLink
              to="/register"
              className="underline text-sm text-gray-600 hover:text-gray-900"
            >
                Create an account
            </NavLink>
            <Button className="ml-3">
                Login
            </Button>
          </div>
        </form>
      </AuthCard>
    </GuestLayout>
  )
}

export default Login

import AuthCard from '../components/components/AuthCard'
import AuthValidationErrors from '../components/components/AuthValidationErrors'
import Button from '../components/components/Button'
import GuestLayout from '../components/components/Layouts/GuestLayout'
import Input from '../components/components/Input'
import Label from '../components/components/Label'
import { useAuth } from '../api/auth'
import { useState } from 'react'
import {Link, NavLink} from 'react-router-dom';

const Register = () => {
  const { register } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/product'
  })

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState([])

  const submitForm = event => {
    event.preventDefault()
    register({ name, email, password, password_confirmation, setErrors })
  }

  return (
    <GuestLayout>
      <AuthCard
        logo={
          <Link to="/">
            <img src='img/logo.gif' className='h-24' />
          </Link>
        }>
        {/* Validation Errors */}
        <AuthValidationErrors className="mb-4" errors={errors} />
        {errors[0]}
        <form onSubmit={submitForm}>
          {/* Name */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-[#ffa23e] shadow-sm rounded-lg"
              onChange={event => setName(event.target.value)}
              required
              autoFocus
            />
          </div>
          {/* Email Address */}
          <div className="mt-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-[#ffa23e] shadow-sm rounded-lg"
              onChange={event => setEmail(event.target.value)}
              required
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
              autoComplete="new-password"
            />
          </div>
          {/* Confirm Password */}
          <div className="mt-4">
            <Label htmlFor="password_confirmation">
                Confirm Password
            </Label>
            <Input
              id="password_confirmation"
              type="password"
              value={password_confirmation}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-[#ffa23e] shadow-sm rounded-lg"
              onChange={event =>
                setPasswordConfirmation(event.target.value)
              }
              required
            />
          </div>
          <div className="flex items-center justify-end mt-4">
            <NavLink
              to="/login"
              className="underline text-sm text-gray-600 hover:text-gray-900"
            >
                Already registered?
            </NavLink>
            <Button className="ml-4">Register</Button>
          </div>
        </form>
      </AuthCard>
    </GuestLayout>
  )
}

export default Register

import Navigation from './Navigation'
import { useAuth } from '../../../api/auth'

const AppLayout = ({ children }) => {
  const { user } = useAuth({ middleware: 'auth' })
   
  return (
    <div className="min-h-screen">
      <Navigation user={user} />
      <main>{children}</main>
    </div>
  )
}

export default AppLayout

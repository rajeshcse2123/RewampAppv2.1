import { Link, Navigate, useParams } from 'react-router-dom'
import { useContext, useState } from 'react' // Add the useContext import
import { UserContext } from '../UserContext'
import axios from 'axios'

export default function AccountPage() {
  const { user, ready,setUser} = useContext(UserContext) // Use the useContext hook
  const [redirect, setRedirect] = useState(null);
  let { subpage } = useParams()
  if (subpage === undefined) subpage = 'profile'

  if (!ready) return 'loading...'
  if (!user && ready && !redirect) return <Navigate to={'/login'} />
  
  function linkClasses(type = null) {
    let classes = 'py-2 px-6 '
    if (type === subpage) {
      return (classes += ' text-white bg-primary rounded-full')
    }
    return classes
  }
  async function logout() {
    await axios.post('/logout')
    setRedirect('/')
    setUser(null)
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }
  return (
    <div>
      <nav className="w-full flex gap-2 mt-8  mb-8 justify-center">
        <Link className={linkClasses('profile')} to={'/account'}>
          My Profile
        </Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}>
          My Bookings
        </Link>
        <Link className={linkClasses('places')} to={'/account/places'}>
          My accomodations
        </Link>
      </nav>
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})
          <br />
          <button onClick={logout} className="primary max-w-md mt-2">
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

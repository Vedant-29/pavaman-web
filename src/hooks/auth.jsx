import { useContext, useState, useEffect, createContext } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../config/supabase-client"

// create a context for authentication
const AuthContext = createContext({
  session: null,
  user: null,
  signOut: () => {}
})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [session, setSession] = useState()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const setData = async () => {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession()
      if (error) throw error
      setSession(session)
      setUser(session?.user)
      setLoading(false)
    }

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setUser(session?.user)
        setLoading(false)
      }
    )

    setData()

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  const value = {
    session,
    user,
    signOut: async () => {
      await supabase.auth.signOut()
      navigate("/")
    }
  }

  // use a provider to pass down the value
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

// export the useAuth hook
export const useAuth = () => {
  return useContext(AuthContext)
}
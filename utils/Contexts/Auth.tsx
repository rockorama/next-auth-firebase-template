import { useRouter } from 'next/router'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import {
  auth,
  getAuthenticatedUser,
  UserType,
} from '../../firebase/authentication'

export type AuthContextType = {
  ready?: boolean
  user?: UserType | null
  menuOpen?: boolean
  setMenu: (open: boolean) => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  setMenu: () => {},
  refreshUser: async () => {},
})

export function useAuth() {
  return useContext(AuthContext)
}

export function useAuthentication(needsAuthenticated?: boolean) {
  const { user, ready } = useAuth()

  const authenticated = !!user

  const router = useRouter()

  useEffect(() => {
    if (ready) {
      if (!authenticated && needsAuthenticated) {
        router.replace('/login')
      }
      if (authenticated && !needsAuthenticated) {
        router.replace('/')
      }
    }
  }, [authenticated, ready, needsAuthenticated])

  return { user, ready }
}

export default function AuthProvider({ children }: { children: Children }) {
  const [ready, setReady] = useState(false)
  const [menuOpen, setMenu] = useState(true)
  const [user, setUser] = useState<UserType>()

  useEffect(() => {
    return auth.onAuthStateChanged((u) => {
      setUser(u)
      setReady(true)
    })
  }, [])

  const refreshUser = useCallback(async () => {
    if (user) {
      const currentUser = getAuthenticatedUser()
      await currentUser.reload()
      setUser({ ...currentUser })
    }
  }, [user])

  return (
    <AuthContext.Provider
      value={{ user, ready, menuOpen, setMenu, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

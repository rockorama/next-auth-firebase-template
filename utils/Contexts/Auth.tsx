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
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  refreshUser: async () => {},
})

export function useAuth() {
  return useContext(AuthContext)
}

export function useAuthentication(
  needsAuthenticated?: boolean,
  redirectURL?: string
) {
  const { user, ready, refreshUser } = useAuth()

  const authenticated = !!user

  const router = useRouter()

  useEffect(() => {
    if (ready) {
      if (!authenticated && needsAuthenticated) {
        router.replace(redirectURL || '/login')
      }
      if (authenticated && !needsAuthenticated) {
        router.replace(redirectURL || '/')
      }
    }
  }, [authenticated, ready, needsAuthenticated])

  if (!user) return { ready }

  return { user, ready, refreshUser }
}

export default function AuthProvider({ children }: { children: Children }) {
  const [ready, setReady] = useState(false)
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
    <AuthContext.Provider value={{ user, ready, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

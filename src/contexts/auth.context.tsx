import { createContext, useState } from "react";

export interface AuthContextValue {
  signedIn: boolean
  user: { email: string, id: string, name: string }
  signin: (token: string, user?: object) => void
  token: string
  logout: () => void
}

export const AuthContext = createContext({} as AuthContextValue)

function isSigned() {
  const storedAccessToken = localStorage.getItem('TOKEN')

  return !!storedAccessToken
}

function getUser() {
  if (!isSigned()) return null

  const user = localStorage.getItem('USER')

  return user ? JSON.parse(user) : null
}


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [ signedIn, setSignedIn ] = useState(isSigned())
  const [ user, setUser ] = useState(getUser())
  const [ token, setToken ] = useState(getToken())

  function getToken() {
    const token = localStorage.getItem('TOKEN')
    if (!token) return ""

    return token
  }

  const logout = () => {
    localStorage.clear()
  }

  const signin = (token: string, user?: object) => {
    localStorage.setItem('TOKEN', token)
    setSignedIn(true)
    setToken(token)
    
    if (!user) return
    localStorage.setItem('USER', JSON.stringify(user))
    setUser(user)
  }

  return (
    <AuthContext.Provider
      value={{
        signedIn,
        user,
        signin,
        token,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
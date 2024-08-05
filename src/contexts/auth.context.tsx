import { createContext, useState } from "react";

export interface AuthContextValue {
  signedIn: boolean
  user: object
  signin: (token: string, user?: object) => void
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

  const signin = (token: string, user?: object) => {
    localStorage.setItem('TOKEN', token)
    setSignedIn(true)
    
    if (!user) return
    localStorage.setItem('USER', JSON.stringify(user))
    setUser(user)
  }

  return (
    <AuthContext.Provider
      value={{
        signedIn,
        user,
        signin
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
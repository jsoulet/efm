import React, { FC } from 'react'
import { useSessionStorage } from 'react-use'
import { useApi } from './apiContext'

type Auth = {
  setAuthCode: (code: string) => void
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = React.createContext<Auth>({
  setAuthCode: () => {
    return
  },
  isAuthenticated: false,
  isLoading: false,
})
export const AuthProvider: FC = ({ children, ...props }) => {
  const [authCode, setAuthCode] = useSessionStorage('authCode', '')
  const { checkValidity } = useApi().password
  const validity = checkValidity(authCode)
  return (
    <AuthContext.Provider
      value={{
        setAuthCode,
        isAuthenticated: !!validity.data,
        isLoading: validity.isLoading,
      }}
      {...props}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => React.useContext(AuthContext)

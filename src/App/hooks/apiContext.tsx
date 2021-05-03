import React, { FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import api from './api'

const ApiContext = React.createContext(api)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})
export const ApiProvider: FC = props => {
  return (
    <QueryClientProvider client={queryClient}>
      <ApiContext.Provider value={api} {...props} />
    </QueryClientProvider>
  )
}

export const useApi = (): typeof api => React.useContext(ApiContext)

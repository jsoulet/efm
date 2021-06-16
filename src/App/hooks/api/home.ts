import { client } from './utils'
import { useQuery } from 'react-query'
import { Home } from './types'
import { Entry } from 'contentful'

export const fetchHome = () => {
  return useQuery<Entry<Home>>('home', async () => {
    return client.getEntry<Home>(process.env.REACT_APP_CONTENTFUL_HOME_ID, {
      include: 3,
    })
  })
}

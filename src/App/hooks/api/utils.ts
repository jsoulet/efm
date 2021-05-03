/* global process */
import { createClient } from 'contentful'

console.log(process.env)

const client = createClient({
  space: process.env.REACT_APP_SPACE_ID,
  accessToken: process.env.REACT_APP_ACCESS_TOKEN,
})

export { client }

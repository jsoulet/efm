import { client } from './utils'
import { useQuery } from 'react-query'
import { Password } from './types'
import typeIds from './typeIds'

export function checkValidity(code: string) {
  return useQuery<boolean>(['Password', code], async () => {
    const passwords = await client.getEntries<Password>({
      content_type: typeIds.password,
      'fields.code': code,
    })

    if (passwords.total < 1) {
      return false
    }
    const password = passwords.items[0]
    password.fields.expirationDate
    return passwords.items.some(password => {
      if (password.fields.code !== code) {
        return false
      }
      if (!password.fields.expirationDate) {
        return true
      }
      const expirationDate = new Date(password.fields.expirationDate)
      if (expirationDate >= new Date()) {
        return true
      }
      return false
    })
  })
}

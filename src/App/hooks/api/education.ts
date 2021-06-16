import { client } from './utils'
import { useQuery } from 'react-query'
import { Entry } from 'contentful'
import { Education } from './types'

export function fetchOne(educationId: string) {
  return useQuery<Entry<Education>>('EducationsWithChapters', () => {
    return client.getEntry<Education>(educationId, {
      include: 2,
      limit: 1000,
    })
  })
}

import { client } from './utils'
import { useQuery } from 'react-query'
import typeIds from './typeIds'
import { Chapter } from './types'

export function getAll() {
  return useQuery('allChapters', () => {
    return client.getEntries<Chapter>({
      content_type: typeIds.chapter,
      include: 2,
      limit: 1000,
    })
  })
}

export function getAllForEducation(educationId: string) {
  return useQuery(['chapterForEducation', educationId], () => {
    return client.getEntries<Chapter>({
      content_type: typeIds.chapter,
      'fields.education.sys.id': educationId,
    })
  })
}

export function getOne(id: string) {
  return useQuery(['chapter', id], () => {
    return client.getEntry<Chapter>(id)
  })
}

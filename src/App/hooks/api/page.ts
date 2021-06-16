import { client } from './utils'
import { useQuery } from 'react-query'
import { EntryCollection } from 'contentful'
import { Page } from './types'
import typeIds from './typeIds'

export function fetchBySlug(pageSlug: string) {
  return useQuery<EntryCollection<Page>>('Page', () => {
    return client.getEntries<Page>({
      content_type: typeIds.page,
      'fields.slug': pageSlug,
      include: 2,
      limit: 1000,
    })
  })
}

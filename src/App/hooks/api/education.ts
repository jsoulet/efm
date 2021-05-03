import { client } from './utils'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import typeIds from './typeIds'
import { Education, Chapter } from './types'

export function getAll() {
  const { data, ...rest } = useQuery('allChapters', () => {
    return client.getEntries<Chapter>({
      content_type: typeIds.chapter,
      include: 2,
      limit: 1000,
    })
  })

  const educations = useMemo<{
    [key: string]: Education & { chapters: Chapter[] }
  }>(() => {
    return (
      data?.items.reduce((accu, current) => {
        const education = current.fields.education
        if (!accu[education.sys.id]) {
          return {
            ...accu,
            [education.sys.id]: {
              ...education.fields,
              chapters: [current],
            },
          }
        }
        accu[education.sys.id].chapters.push(current)
        return {
          ...accu,
        }
      }, {}) ?? {}
    )
  }, [data])

  return { data: educations, ...rest }
  // return useQuery('educations', async () => {
  //   const { items: educations } = await client.getEntries<Education>({
  //     content_type: typeIds.education,
  //   })
  //   const edWithChapters = await Promise.all(
  //     educations.map(async education => {
  //       const { items: chapters } = await client.getEntries<Chapter>({
  //         content_type: typeIds.chapter,
  //         include: 2,
  //         'fields.education.sys.id': education.sys.id,
  //       })
  //       console.log({ chapters })
  //       return {
  //         ...education,
  //         chapters,
  //       }
  //     })
  //   )
  //   return edWithChapters

  //   // .then(items => {
  //   //   return items.map((item) => {
  //   //     return client.getEntries<Chapter>({
  //   //       content_type: typeIds.chapter,
  //   //       link_to_entries: item.sys.id
  //   //     })
  //   //   })
  //   //   return }
  //   //   return items
  // })
}

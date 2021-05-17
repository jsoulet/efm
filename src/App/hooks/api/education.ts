import { client } from './utils'
import { useQuery } from 'react-query'
import typeIds from './typeIds'
import { Entry } from 'contentful'
import { Education, Chapter } from './types'

type EducationWithChapters = {
  [key: string]: Education & { chapters: Entry<Chapter>[] }
}

export function fetchAll() {
  return useQuery<EducationWithChapters>('EducationsWithChapters', async () => {
    const result = await client
      .getEntries<Chapter>({
        content_type: typeIds.chapter,
        include: 2,
        limit: 1000,
      })
      .then<EducationWithChapters>(result => {
        return result.items.reduce((accu, currentChapter) => {
          const education = currentChapter.fields.education
          if (!accu[education.sys.id]) {
            return {
              ...accu,
              [education.sys.id]: {
                ...education.fields,
                chapters: [currentChapter],
              },
            }
          }
          const chapters: Entry<Chapter>[] = [
            ...accu[education.sys.id].chapters,
            currentChapter,
          ].sort((a, b) => {
            return a.fields.number - b.fields.number
          })
          return {
            ...accu,
            [education.sys.id]: {
              ...education.fields,
              chapters,
            },
          }
        }, {})
      })
    return result
  })
}

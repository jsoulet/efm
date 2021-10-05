import React from 'react'
import { Chapter } from 'App/hooks/api/types'
import { Entry } from 'contentful'
import ChapterItem from './ChapterItem'
interface ChapterListProps {
  chapters: Entry<Chapter>[]
  educationId: string
}

const ChapterList = ({ chapters, educationId }: ChapterListProps) => {
  return (
    <div>
      {chapters.map((chapter, index) => {
        return (
          <ChapterItem
            name={chapter.fields.name}
            number={index + 1}
            key={chapter.sys.id}
            link={`/education/${educationId}/chapter/${chapter.sys.id}`}
          />
        )
      })}
    </div>
  )
}

export default ChapterList

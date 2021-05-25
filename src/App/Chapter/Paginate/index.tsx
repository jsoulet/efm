import { useApi } from 'App/hooks/apiContext'
import React, { FC, useMemo } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Button from 'components/Button'
import { useParams } from 'react-router-dom'
import { Chapter } from 'App/hooks/api/types'

interface Paginate {
  educationId: string
  activeChapter: Chapter
}

const Paginate: FC<Paginate> = ({ educationId }) => {
  const { chapter: chapterService } = useApi()
  const { chapterId } = useParams()
  const { data } = chapterService.getAllForEducation(educationId)

  const [prevChapter, nextChapter] = useMemo(() => {
    if (!data?.items) {
      return []
    }
    const orderedChapters = data.items.sort((itemA, itemB) => {
      return itemA.fields.number - itemB.fields.number
    })
    const chapterIndex = orderedChapters.findIndex(
      chapter => chapter.sys.id === chapterId
    )

    return [
      orderedChapters.slice(chapterIndex - 1, chapterIndex).pop(),
      orderedChapters.slice(chapterIndex + 1, chapterIndex + 2).pop(),
    ]
  }, [data?.items, chapterId])
  if (!data) {
    return null
  }
  return (
    <div className="flex justify-center mt-4">
      {prevChapter && (
        <Button to={`/chapter/${prevChapter.sys.id}`} iconLeft={FaChevronLeft}>
          Chapitre précédent
        </Button>
      )}
      {nextChapter && (
        <Button
          className="ml-2"
          to={`/chapter/${nextChapter.sys.id}`}
          iconRight={FaChevronRight}
        >
          Chapitre suivant
        </Button>
      )}
    </div>
  )
}

export default Paginate

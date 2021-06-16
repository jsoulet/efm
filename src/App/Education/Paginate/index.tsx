import React, { FC, useMemo } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Button from 'components/Button'
import { Chapter } from 'App/hooks/api/types'
import { Entry } from 'contentful'

interface PaginateProps {
  educationId: string
  activeChapter: Entry<Chapter>
  educationChapters: Entry<Chapter>[]
}

const Paginate: FC<PaginateProps> = ({
  educationId,
  activeChapter,
  educationChapters,
}) => {
  const activeChapterIndex = useMemo(() => {
    return educationChapters.findIndex(
      chapter => chapter.sys.id === activeChapter.sys.id
    )
  }, [educationChapters, activeChapter])

  const [prevChapter, nextChapter] = useMemo(() => {
    if (!educationChapters) {
      return []
    }

    return [
      educationChapters.slice(activeChapterIndex - 1, activeChapterIndex).pop(),
      educationChapters
        .slice(activeChapterIndex + 1, activeChapterIndex + 2)
        .pop(),
    ]
  }, [activeChapterIndex, educationChapters])

  return (
    <div className="flex justify-center mt-4">
      {prevChapter && (
        <Button
          to={`/education/${educationId}/chapter/${prevChapter.sys.id}`}
          iconLeft={FaChevronLeft}
        >
          Chapitre précédent
        </Button>
      )}
      {nextChapter && (
        <Button
          className={prevChapter && 'ml-2'}
          to={`/education/${educationId}/chapter/${nextChapter.sys.id}`}
          iconRight={FaChevronRight}
        >
          Chapitre suivant
        </Button>
      )}
    </div>
  )
}

export default Paginate

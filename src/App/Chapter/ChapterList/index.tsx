import { useApi } from 'App/hooks/apiContext'
import React, { FC, useMemo } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { Listbox } from '@headlessui/react'
import { useHistory, useParams } from 'react-router-dom'
import { Chapter } from 'App/hooks/api/types'

interface ChapterListProps {
  educationId: string
  activeChapter: Chapter
}

const ChapterList: FC<ChapterListProps> = ({ educationId, activeChapter }) => {
  const { chapter: chapterService } = useApi()
  const history = useHistory()
  const { chapterId } = useParams()
  const { data } = chapterService.getAllForEducation(educationId)

  const orderedChapters = useMemo(() => {
    if (!data?.items) {
      return []
    }
    return data.items.sort((itemA, itemB) => {
      return itemA.fields.number - itemB.fields.number
    })
  }, [data?.items])
  if (!data) {
    return null
  }
  return (
    <div className="flex flex-col relative flex-shrink-0">
      <Listbox
        value={chapterId}
        onChange={value => history.push(`/chapter/${value}`)}
      >
        <Listbox.Label className="text-sm font-bold">
          Accès direct :
        </Listbox.Label>
        <Listbox.Button className="bg-white  rounded-md py-2 px-3 border shadow flex items-center focus:outline-none">
          Chapitre {activeChapter.number}
          <FaChevronDown className="ml-4" />
        </Listbox.Button>
        <Listbox.Options className=" w-56 mt-16 right-0 absolute z-10 bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
          {orderedChapters.map(chapter => {
            return (
              <Listbox.Option
                key={chapter.sys.id}
                value={chapter.sys.id}
                className=" cursor-pointer p-4 hover:bg-primary  hover:text-white flex flex-col  transition-colors"
              >
                <span className="font-bold ">
                  Chapitre {chapter.fields.number}
                </span>
                <span className="text-sm ">{chapter.fields.name}</span>
              </Listbox.Option>
            )
          })}
        </Listbox.Options>
      </Listbox>
    </div>
  )
}

export default ChapterList

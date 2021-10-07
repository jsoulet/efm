import React, { FC, useMemo } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { Listbox, Transition } from '@headlessui/react'
import { useHistory } from 'react-router-dom'
import { Chapter } from 'App/hooks/api/types'
import { Entry } from 'contentful'

interface ChapterSelectProps {
  educationId: string
  activeChapter: Entry<Chapter>
  educationChapters: Entry<Chapter>[]
}

const ChapterSelect: FC<ChapterSelectProps> = ({
  educationId,
  activeChapter,
  educationChapters,
}) => {
  const history = useHistory()
  const activeChapterIndex = useMemo(() => {
    return educationChapters.findIndex(
      chapter => chapter.sys.id === activeChapter.sys.id
    )
  }, [educationChapters, activeChapter])
  return (
    <div className="flex flex-col relative flex-shrink-0">
      <Listbox
        value={activeChapter.sys.id}
        onChange={value =>
          history.push(`/education/${educationId}/chapter/${value}`)
        }
      >
        <Listbox.Label className="text-sm">Accès direct :</Listbox.Label>
        <Listbox.Button className="bg-white rounded-md py-2 px-3 border shadow flex items-center focus:outline-none mt-1">
          Chapitre {activeChapterIndex + 1}
          <FaChevronDown className="ml-4" />
        </Listbox.Button>
        <Transition
          as={React.Fragment}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0 -translate-y-8"
          enterTo="transform scale-100 opacity-100 translate-y-0"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100 -translate-y-8"
          leaveTo="transform scale-95 opacity-0 translate-y-0"
        >
          <Listbox.Options className=" w-64 mt-16 right-0 absolute z-10 bg-white shadow-lg max-h-64 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
            {educationChapters.map((chapter, index) => {
              return (
                <Listbox.Option
                  key={chapter.sys.id}
                  value={chapter.sys.id}
                  className=" cursor-pointer p-4 hover:bg-primary  hover:text-white flex flex-col  transition-colors"
                >
                  <span className="font-bold ">Chapitre {index + 1}</span>
                  <span className="text-sm ">{chapter.fields.name}</span>
                </Listbox.Option>
              )
            })}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  )
}

export default ChapterSelect

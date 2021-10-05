import React from 'react'
import { Link } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'

export interface ChapterItemProps {
  name: string
  number: number
  link: string
}

const ChapterItem = ({ name, number, link }: ChapterItemProps) => {
  return (
    <Link
      to={link}
      className="transition-all my-2 flex items-center rounded hover:bg-gray-200 focus:bg-gray-200 p-3 "
    >
      <div className="mr-2 text-xl text-primary ">
        {number.toLocaleString('fr-FR', {
          minimumIntegerDigits: 2,
        })}
      </div>
      <div className="flex-grow">{name}</div>
      <FaChevronRight className="text-gray-500" />
    </Link>
  )
}

export default ChapterItem

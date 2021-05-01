import React, { FC } from 'react'
import styles from './Card.module.css'

interface CardProps {
  name: string
  img: string
  totalChapters: number
  progress?: number
}

const Card: FC<CardProps> = ({ name, img, totalChapters, progress = 0 }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-all hover:shadow-xl transform hover:-translate-y-1">
      <img src={img} alt="" className="overflow-hidden" />
      <div className={styles.progress}>
        <div style={{ width: `${progress}%` }}></div>
      </div>
      <div className="p-4">
        <h2 className="uppercase text-xl text-gray-800 font-bold">{name}</h2>
        <p className="text-gray-500">
          {totalChapters} chapitre{totalChapters > 1 && 's'}
        </p>
      </div>
    </div>
  )
}

export default Card

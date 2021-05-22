import React, { FC } from 'react'
import cn from 'classnames'
import styles from './Card.module.css'

interface CardProps {
  name: string
  img: string
  totalChapters: number
  progress?: number
}

const Card: FC<CardProps> = ({ name, img, totalChapters, progress = 0 }) => {
  return (
    <div
      className={cn(
        styles.card,
        'bg-white rounded-2xl shadow  overflow-hidden transition-all hover:shadow-xl transform hover:-translate-y-1'
      )}
    >
      <img src={img} alt="" className={cn(styles.img, 'overflow-hidden')} />
      {typeof progress !== 'undefined' && (
        <div className={styles.progress}>
          <div style={{ width: `${progress}%` }}></div>
        </div>
      )}
      <div className="p-6 pt-4">
        <h2 className="est text-xl text-primary font-bold mb-2">{name}</h2>
        <p className="text-gray-400">
          {totalChapters} chapitre{totalChapters > 1 && 's'}
        </p>
      </div>
    </div>
  )
}

export default Card

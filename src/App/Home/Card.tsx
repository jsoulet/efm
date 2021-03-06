import React, { FC } from 'react'
import cn from 'classnames'
import styles from './Card.module.css'

interface CardProps {
  name: string
  img: string
  totalChapters: number
  progress?: number
}

const Card: FC<CardProps> = ({
  name,
  img,
  totalChapters = 0,
  progress = 0,
}) => {
  return (
    <div
      className={cn(
        styles.card,
        'bg-white rounded-2xl shadow w-full overflow-hidden',
        totalChapters > 0 &&
          'transition-all hover:shadow-xl transform hover:-translate-y-1',
        totalChapters === 0 && 'opacity-70 cursor-not-allowed'
      )}
    >
      <img src={img} alt="" className={cn(styles.img, 'overflow-hidden')} />
      {typeof progress !== 'undefined' && (
        <div className={styles.progress}>
          <div style={{ width: `${progress}%` }}></div>
        </div>
      )}
      <div className="p-6 pt-1">
        <h2 className="est text-xl text-primary font-bold mb-2">{name}</h2>
        <p className="text-gray-400">
          {totalChapters > 0 ? totalChapters : 'Aucun'} chapitre
          {totalChapters > 1 && 's'}
        </p>
      </div>
    </div>
  )
}

export default Card

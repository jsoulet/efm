import cn from 'classnames'
import React, { FC } from 'react'
import { FaPlay, FaPause } from 'react-icons/fa'
import useSound from 'use-sound'
import styles from './Audio.module.css'

interface AudioProps {
  french: string
  english: string
  soundUrl: string
  isRead: boolean
  onEnd: () => void
}

const Audio: FC<AudioProps> = ({
  french,
  english,
  soundUrl,
  onEnd,
  isRead,
}) => {
  const [play, { stop, isPlaying }] = useSound(soundUrl, {
    onend: onEnd,
  })
  return (
    <button
      className={cn(
        styles.audio,
        'flex items-center text-left px-6 py-3 bg-gray-100 rounded-2xl md:rounded-full border shadow outline-none focus:outline-none',
        'transition-all hover:shadow-lg focus:shadow-lg transform hover:-translate-y-1 focus:-translate-y-1',
        { 'opacity-60': isRead }
      )}
      onClick={() => {
        if (isPlaying) {
          return stop()
        }
        return play()
      }}
    >
      <div className={cn(styles.icon, 'flex items-center mr-6  text-2xl')}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </div>
      <div>
        <div className="text-primary font-bold text-lg">{english}</div>
        <div className="text-gray-500 ">{french}</div>
      </div>
    </button>
  )
}

export default Audio

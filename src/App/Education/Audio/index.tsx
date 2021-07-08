import cn from 'classnames'
import React, { FC, useState } from 'react'
import { FaPlay, FaPause } from 'react-icons/fa'
import useSound from 'use-sound'
import styles from './Audio.module.css'
import FlagFR from './fr.png'
import FlagUK from './uk.png'

interface AudioProps {
  id: string
  french: string
  english: string
  soundUrl: string
  isRead: boolean
  onEnd: () => void
}

const Audio: FC<AudioProps> = ({
  id,
  french,
  english,
  soundUrl,
  onEnd,
  isRead,
}) => {
  const [play, { stop, isPlaying }] = useSound(soundUrl, {
    onend: onEnd,
  })
  const [isEnglish, setIsEnglish] = useState(false)
  return (
    <button
      className={cn(
        styles.audio,
        'flex items-center text-left px-6 py-4 bg-gray-100 rounded-2xl border shadow outline-none flex-wrap md:flex-nowrap justify-center',
        'transition-all hover:shadow-lg focus:shadow-lg transform hover:-translate-y-1 focus:-translate-y-1 focus:outline-none',
        { 'opacity-60': isRead }
      )}
      onClick={() => {
        if (isPlaying) {
          return stop()
        }
        return play()
      }}
    >
      <div className="flex-grow flex">
        <div className={cn(styles.icon, 'flex items-center mr-6 text-2xl')}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </div>
        <div className="flex-grow mr-6">
          <div className="text-gray-600 text-lg">
            {isEnglish ? english : french}
          </div>
        </div>
      </div>
      <div>
        <label
          htmlFor={id}
          className="inline-flex items-center cursor-pointer"
          title={`Afficher le texte en ${isEnglish ? 'français' : 'anglais'}`}
        >
          <span className="mr-2 text-md">
            <img src={FlagFR} alt="" className={styles.flag} />
          </span>
          <span className="relative focus-within:ring">
            <span
              className={cn(
                'block w-10 h-6  rounded-full shadow-inner transition-transform duration-300 ease-in-out',
                {
                  'bg-primary': isEnglish,
                  'bg-gray-300': !isEnglish,
                }
              )}
            ></span>
            <span
              className={cn(
                'absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 bg-white focus-within:shadow-outline transition-transform duration-300 ease-in-out transform',
                {
                  'translate-x-full': isEnglish,
                }
              )}
            >
              <input
                id={id}
                type="checkbox"
                checked={isEnglish}
                className="absolute opacity-0 w-0 h-0"
                onChange={e => {
                  e.stopPropagation()
                  setIsEnglish(!isEnglish)
                }}
              />
            </span>
          </span>
          <span className="ml-2 text-md">
            <img src={FlagUK} alt="" className={styles.flag} />
          </span>
        </label>
      </div>
    </button>
  )
}

export default Audio

import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useSessionStorage } from 'react-use'
import Loader from 'components/Loader'
import { useApi } from 'App/hooks/apiContext'
import ChapterList from './ChapterList'
import Audio from './Audio'
import Paginate from './Paginate'

const Chapter: FC = () => {
  const { chapterId } = useParams()
  const { chapter: chapterService } = useApi()
  const { data, isLoading } = chapterService.getOne(chapterId)
  const [readAudios, setReadAudios] = useSessionStorage<string[]>('audios', [])
  const handleOnAudioRead = (audioId: string) => () => {
    if (readAudios.includes(audioId)) {
      return
    }
    setReadAudios([...readAudios, audioId])
  }
  if (isLoading) {
    return <Loader />
  }
  if (!data) {
    return <div>Chapter not found</div>
  }

  return (
    <>
      <div className="flex justify-between items-center flex-col md:flex-row">
        <div className="flex-grow">
          <h2 className="text-gray-800  text-3xl font-bold">
            {data.fields.name}
          </h2>
          <div className="text-gray-400 text-xl mt-1">
            Formation : {data.fields.education.fields.name}
          </div>
        </div>
        <ChapterList
          educationId={data.fields.education.sys.id}
          activeChapter={data.fields}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 my-8">
        {data.fields.audios.map(audio => {
          return (
            <Audio
              onEnd={handleOnAudioRead(audio.sys.id)}
              isRead={readAudios.includes(audio.sys.id)}
              key={audio.sys.id}
              id={audio.sys.id}
              french={audio.fields.french}
              english={audio.fields.english}
              soundUrl={audio.fields.media.fields.file.url}
            />
          )
        })}
      </div>
      <div>
        <Paginate
          activeChapter={data.fields}
          educationId={data.fields.education.sys.id}
        />
      </div>
    </>
  )
}

export default Chapter

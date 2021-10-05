import React, { FC, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useSessionStorage } from 'react-use'
import Loader from 'components/Loader'
import { useApi } from 'App/hooks/apiContext'
import ChapterSelect from './ChapterSelect'
import Audio from './Audio'
import Paginate from './Paginate'

const Chapter: FC = () => {
  const { educationId, chapterId } = useParams()
  const { education } = useApi()
  const { data, isLoading } = education.fetchOne(educationId)
  const currentChapter = useMemo(
    () => data?.fields.chapters.find(chapter => chapter.sys.id === chapterId),
    [data, chapterId]
  )
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
    return <div>Education not found</div>
  }
  if (!currentChapter) {
    return <div>Chapter not found</div>
  }

  return (
    <>
      <div className="flex justify-between items-center flex-col md:flex-row">
        <div className="flex-grow">
          <h2 className="text-gray-800  text-3xl font-bold">
            {currentChapter.fields.name}
          </h2>
          <div className="text-gray-400 text-xl mt-1">
            Formation : {data.fields.name}
          </div>
        </div>
        <ChapterSelect
          educationId={data.sys.id}
          activeChapter={currentChapter}
          educationChapters={data.fields.chapters}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 my-8">
        {currentChapter.fields.audios.map(audio => {
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
          educationId={data.sys.id}
          activeChapter={currentChapter}
          educationChapters={data.fields.chapters}
        />
      </div>
    </>
  )
}

export default Chapter

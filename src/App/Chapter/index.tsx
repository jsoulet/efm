import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import Loader from 'components/Loader'
import { useApi } from 'App/hooks/apiContext'
import Audio from './Audio'

const Chapter: FC = () => {
  const { chapterId } = useParams()
  const { chapter: chapterService } = useApi()
  const chapter = chapterService.getOne(chapterId)
  // chapterService.getAllForEducation(educationId)

  if (chapter.isLoading) {
    return <Loader />
  }
  console.log(chapter.data?.fields.audios)
  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="text-gray-800  text-3xl font-bold">
          {chapter.data?.fields.education.fields.name}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {chapter.data?.fields.audios.map(audio => {
          return (
            <Audio
              key={audio.sys.id}
              french={audio.fields.french}
              english={audio.fields.english}
              soundUrl={audio.fields.media.fields.file.url}
            />
          )
        })}
      </div>
    </>
  )
}

export default Chapter

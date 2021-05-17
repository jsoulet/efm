import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import Loader from 'components/Loader'
import { useApi } from 'App/hooks/apiContext'
import ChapterList from './ChapterList'
import Audio from './Audio'

const Chapter: FC = () => {
  const { chapterId } = useParams()
  const { chapter: chapterService } = useApi()
  const { data, isLoading } = chapterService.getOne(chapterId)
  // chapterService.getAllForEducation(educationId)

  if (isLoading) {
    return <Loader />
  }
  if (!data) {
    return <div>Chapter not found</div>
  }

  return (
    <>
      <div className="flex justify-between items-end mb-6">
        <div>
          <div className="text-gray-800  text-3xl font-bold">
            {data.fields.name}
          </div>
          <div className="text-gray-400  text-xl">
            Formation : {data.fields.education.fields.name}
          </div>
        </div>
        <ChapterList
          educationId={data.fields.education.sys.id}
          activeChapter={data.fields}
        />
      </div>
      <div className="grid grid-cols-1 gap-4">
        {data.fields.audios.map(audio => {
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

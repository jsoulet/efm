import React, { FC } from 'react'
import Card from './Card'
import Loader from 'components/Loader'
import { useApi } from 'App/hooks/apiContext'

const Home: FC = () => {
  const { education } = useApi()
  const { data, isLoading } = education.getAll()

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <div className="text-gray-800 text-center mb-2">
        Quelle est votre formation ?
      </div>
      <div>
        {Object.entries(data).map(([id, education]) => {
          console.log(education)
          return (
            <Card
              key={id}
              name={education.name}
              img={education.image.fields.file.url}
              totalChapters={education.chapters.length}
            />
          )
        })}
      </div>
    </>
  )
}

export default Home

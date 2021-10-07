import React, { FC } from 'react'
import Card from './Card'
import { Link } from 'react-router-dom'
import Loader from 'components/Loader'
import { useApi } from 'App/hooks/apiContext'
import { useNavigation } from 'App/hooks/navigationContext'

const Home: FC = () => {
  const { home } = useApi()
  const { data, isLoading } = home.fetchHome()
  const { clearBacklink } = useNavigation()
  clearBacklink()
  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <div className="text-gray-800 text-center mb-6 ">
        Quelle est votre formation ?
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data?.fields.trainings.map(education => {
          const { image, name, chapters } = education.fields
          const [firstChapter] = chapters || []
          const card = (
            <Card
              name={name}
              img={image?.fields.file.url}
              totalChapters={chapters?.length}
            />
          )
          if (!firstChapter) {
            return (
              <div key={education.sys.id} className="flex">
                {card}
              </div>
            )
          }
          return (
            <Link
              key={education.sys.id}
              to={`/education/${education.sys.id}`}
              className="flex"
            >
              {card}
            </Link>
          )
        })}
      </div>
    </>
  )
}

export default Home

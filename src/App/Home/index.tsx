import React, { FC, useMemo } from 'react'
import Card from './Card'
import { Link } from 'react-router-dom'
import Loader from 'components/Loader'
import { useApi } from 'App/hooks/apiContext'

const Home: FC = () => {
  const { education } = useApi()
  const { data, isLoading } = education.getAll()
  const orderedEducations = useMemo(() => {
    if (!data) {
      return []
    }
    const collator = new Intl.Collator('fr-FR', { numeric: true })
    return Object.entries(data).sort((a, b) => {
      return collator.compare(a[1].name, b[1].name)
    })
  }, [data])
  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <div className="text-gray-800 text-center mb-2 ">
        Quelle est votre formation ?
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {orderedEducations.map(([id, education]) => {
          const firstChapter = education.chapters[0]
          return (
            <Link
              key={id}
              to={`/chapter/${firstChapter.sys.id}`}
              className="flex"
            >
              <Card
                name={education.name}
                img={education.image.fields.file.url}
                totalChapters={education.chapters.length}
              />
            </Link>
          )
        })}
      </div>
    </>
  )
}

export default Home

import { useApi } from 'App/hooks/apiContext'
import { useParams } from 'react-router-dom'
import Loader from 'components/Loader'
import React from 'react'
import ChapterList from './ChapterList'
import { useNavigation } from 'App/hooks/navigationContext'

const Education = () => {
  const { educationId } = useParams()
  const { education } = useApi()
  const { data: educationData, isLoading } = education.fetchOne(educationId)
  const { setBacklink } = useNavigation()
  setBacklink('Retour à la liste des formations', `/`)
  if (isLoading) {
    return <Loader />
  }
  if (!educationData) {
    return <div>Education not found</div>
  }
  return (
    <>
      <div className="flex justify-between items-center flex-col md:flex-row">
        <div className="flex-grow">
          <h2 className="text-gray-800  text-3xl font-bold">
            {educationData.fields.name}
          </h2>
          <div className="text-gray-400 text-xl mt-1">
            {educationData.fields.chapters.length > 0
              ? `${educationData.fields.chapters.length} chapitre${
                  educationData.fields.chapters.length > 1 ? 's' : ''
                }`
              : 'Aucun chapitre'}
          </div>
        </div>
      </div>
      <div className="flex flex-col my-4">
        <ChapterList
          chapters={educationData.fields.chapters}
          educationId={educationData.sys.id}
        />
      </div>
    </>
  )
}

export default Education

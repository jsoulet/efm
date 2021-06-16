import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import Loader from 'components/Loader'
import { useApi } from 'App/hooks/apiContext'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const Page: FC = () => {
  const { slug } = useParams()
  const { page: pageService } = useApi()
  const { data, isLoading } = pageService.fetchBySlug(slug)
  if (isLoading) {
    return <Loader />
  }
  if (!data) {
    return <div>Page not found</div>
  }
  const [page] = data.items

  return (
    <>
      <div className="flex justify-between items-center flex-col md:flex-row">
        <div className="flex-grow">
          <h2 className="text-gray-800  text-3xl font-bold">
            {page.fields.title}
          </h2>
        </div>
      </div>
      <div className="prose my-8">
        {documentToReactComponents(page.fields.content)}
      </div>
    </>
  )
}

export default Page

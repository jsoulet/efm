import React, { FC } from 'react'
import Card from './Card'
const Home: FC = () => {
  return (
    <>
      <div className="text-gray-800 text-center">
        Quelle est votre formation ?
      </div>
      <div>
        <Card
          name="Matelot pont"
          img="https://picsum.photos/id/29/2106/1404"
          progress={45}
          totalChapters={1}
        />
      </div>
    </>
  )
}

export default Home

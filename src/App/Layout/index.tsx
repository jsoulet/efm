import React, { FC } from 'react'
import Banner from './Banner'
import Navbar from './Navbar'

const Main: FC = ({ children }) => {
  return (
    <div className="bg-gray-100 min-h-screen w-full">
      <Banner />
      <div className="max-w-4xl mx-auto relative px-4">
        <Navbar />
        <main className="bg-white shadow-sm p-8  w-full rounded-2xl border-gray-200">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Main

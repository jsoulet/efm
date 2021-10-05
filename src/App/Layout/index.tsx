import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { useApi } from 'App/hooks/apiContext'
import { useAuth } from 'App/hooks/authContext'
import Loader from 'components/Loader'
import LoginForm from 'components/LoginForm'
import cn from 'classnames'
import Banner from './Banner'
import Navbar from './Navbar'
import styles from './Layout.module.css'
import dotArrow from './fleche-points.png'
import logoEfm from './logo-efm-2021.png'
import logoQualiopi from './logo-qualiopi.png'

const Main: FC = ({ children }) => {
  const { home } = useApi()
  const { isLoading, isAuthenticated, setAuthCode } = useAuth()
  const { data } = home.fetchHome()

  return (
    <div className="bg-gray-100 min-h-screen w-full flex flex-col md:flex-row retative">
      <a
        href="https://ecoledesformationsmaritimes.fr"
        className={cn(
          'text-white bg-primary p-2 uppercase font-bold text-center md:rotate-180 flex items-center justify-center',
          styles.schoolName
        )}
      >
        Ecole des Formations Maritimes{' '}
        <img src={dotArrow} alt="" className={styles.dotArrow} /> Les Sables -
        Yeu
      </a>
      <div className="flex-grow">
        <Banner />
        <div className="max-w-4xl mx-auto relative px-4 lg:px-0">
          <Navbar />
          <main className="bg-white shadow-sm p-8 4xl:p-0 w-full rounded-2xl border-gray-200 mb-6">
            {isAuthenticated && children}
            {isLoading && <Loader />}
            {!isLoading && !isAuthenticated && (
              <LoginForm onSubmit={setAuthCode} />
            )}
          </main>
          {data && (
            <nav className="flex mb-6 justify-center items-center">
              {data.fields.footerLinks?.map((link, index) => (
                <div key={link.sys.id}>
                  {index !== 0 && <span className="px-3">|</span>}
                  <Link to={`/${link.fields.slug}`} className="underline">
                    {link.fields.title}
                  </Link>
                </div>
              ))}
            </nav>
          )}
          <div className={styles.logos}>
            <a
              href="https://www.ecoledesformationsmaritimes.fr/"
              title="Accéder au site de l'Ecole des Formations Maritimes"
            >
              <img src={logoEfm} alt="Logo Ecole des Formations Maritimes" />
            </a>
            <a
              href="https://www.ecoledesformationsmaritimes.fr/certification-qualiopi"
              title="Certification Qualiopi"
            >
              <img src={logoQualiopi} alt="Logo Qualiopi, processus certifié" />
            </a>
          </div>
          <div className="text-sm text-gray-400 flex justify-center items-center py-8">
            <span>
              Conception{' : '}
              <a href="https://johansoulet.fr" className="underline">
                johansoulet.fr
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main

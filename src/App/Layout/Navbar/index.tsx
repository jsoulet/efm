import React, { FC } from 'react'
import { IconType } from 'react-icons'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { HiChevronLeft } from 'react-icons/hi'
import cn from 'classnames'
import useGreetings from './useGreetings'
import WavingHand from './waving-hand.png'
import styles from './Navbar.module.css'

interface BackLinkProps {
  label: string
  icon: IconType
}
const BackLink: FC<BackLinkProps> = ({ label, icon: Icon }) => {
  const history = useHistory()
  return (
    <div
      role="button"
      className="flex items-center "
      onClick={history.goBack}
      tabIndex={0}
    >
      <Icon className="mr-1" /> {label}
    </div>
  )
}

const Navbar: FC = () => {
  const matchesHome = useRouteMatch({ path: '/', exact: true, strict: true })
  const greetings = useGreetings()
  return (
    <nav className=" text-white  mb-2 flex justify-between items-baseline">
      {matchesHome && (
        <div className="text-2xl font-bold flex items-center">
          <img
            src={WavingHand}
            alt=""
            className={cn('mr-2', styles.wave, styles.hand)}
          />
          {greetings}
        </div>
      )}
      {!matchesHome && <BackLink label="Retour" icon={HiChevronLeft} />}
    </nav>
  )
}

export default Navbar

import React, { FC } from 'react'
import { IconType } from 'react-icons'
import { Link } from 'react-router-dom'
import { HiChevronLeft } from 'react-icons/hi'
import cn from 'classnames'
import useGreetings from './useGreetings'
import WavingHand from './waving-hand.png'
import styles from './Navbar.module.css'
import { useNavigation } from 'App/hooks/navigationContext'

interface BackLinkProps {
  label: string
  path: string
  icon: IconType
}
const BackLink: FC<BackLinkProps> = ({ label, path, icon: Icon }) => {
  return (
    <Link className="flex items-center " to={path}>
      <Icon className="mr-1" /> {label}
    </Link>
  )
}

const Navbar: FC = () => {
  const greetings = useGreetings()
  const { backlink } = useNavigation()
  return (
    <nav className=" text-white  mb-2 flex justify-between items-baseline">
      {!backlink && (
        <div className="text-2xl font-bold flex items-center">
          <img
            src={WavingHand}
            alt=""
            className={cn('mr-2', styles.wave, styles.hand)}
          />
          {greetings}
        </div>
      )}
      {backlink && (
        <BackLink
          label={backlink.label}
          path={backlink.path}
          icon={HiChevronLeft}
        />
      )}
    </nav>
  )
}

export default Navbar

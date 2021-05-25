import React, { FC } from 'react'
import { IconType } from 'react-icons'
import { useRouteMatch, Link } from 'react-router-dom'
import { HiChevronLeft } from 'react-icons/hi'
import cn from 'classnames'
import useGreetings from './useGreetings'
import styles from './Navbar.module.css'

interface NavlinkProps {
  label: string
  icon: IconType
  to: string
}
const Navlink: FC<NavlinkProps> = ({ label, icon: Icon, to }) => {
  return (
    <Link className="flex items-center " to={to}>
      <Icon className="mr-1" /> {label}
    </Link>
  )
}

const Navbar: FC = () => {
  const matchesHome = useRouteMatch({ path: '/', exact: true, strict: true })
  const greetings = useGreetings()
  return (
    <nav className=" text-white  mb-2 flex justify-between items-baseline">
      {matchesHome && (
        <div className="text-2xl font-bold">
          <span className={cn(styles.wave)}>👋</span> {greetings}
        </div>
      )}
      {!matchesHome && (
        <Navlink label="Retour aux formations" icon={HiChevronLeft} to="/" />
      )}
    </nav>
  )
}

export default Navbar

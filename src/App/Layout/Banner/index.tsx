import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './Banner.module.css'
import banner from './banner.svg'

const Banner: FC = () => {
  return (
    <header
      className={styles.banner}
      // style={{ backgroundImage: `url("${banner}")` }}
    >
      <img
        src={banner}
        alt=""
        className="absolute top-0 left-0 h-full w-full -z-10"
      ></img>
      <div className="text-white font-important  uppercase text-center font-bold mt-11 md:mt-16 px-4">
        <h1 className="text-3xl md:text-4xl ">
          <Link to="/">Système Mondial de Détresse et de Sécurité en Mer</Link>
        </h1>
        <div className="text-2xl md:text-2xl opacity-60">
          Ecole des formations maritimes
        </div>
      </div>
      <svg>
        <clipPath id="banner-clip-path" clipPathUnits="objectBoundingBox">
          <path d="M0.25,0.694 C0.074,0.647,0.01,0.891,0,0.894 V0.891 V0 H1 V0.891 C0.985,0.933,0.923,1,0.788,0.998 C0.598,0.961,0.348,0.72,0.25,0.694"></path>
        </clipPath>
      </svg>
    </header>
  )
}

export default Banner

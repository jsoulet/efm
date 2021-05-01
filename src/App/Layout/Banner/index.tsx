import React, { FC } from 'react'
import styles from './Banner.module.css'

const Banner: FC = () => {
  return (
    <header className={styles.banner}>
      {/* <BannerClipPath /> */}
      <svg>
        <clipPath id="banner-clip-path" clipPathUnits="objectBoundingBox">
          <path d="M0.25,0.694 C0.074,0.647,0.01,0.891,0,0.894 V0.891 V0 H1 V0.891 C0.985,0.933,0.923,1,0.788,0.998 C0.598,0.961,0.348,0.72,0.25,0.694"></path>
        </clipPath>
      </svg>
    </header>
  )
}

export default Banner
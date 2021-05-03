import React, { FC } from 'react'
import cn from 'classnames'
const Loader: FC = () => {
  const circleClasses = 'h-2.5 w-2.5 bg-primary rounded-full'

  return (
    <div className="flex justify-center">
      <div className={cn(circleClasses, 'mr-1 animate-bounce')}></div>
      <div className={cn(circleClasses, 'mr-1 animate-bounce200')}></div>
      <div className={cn(circleClasses, 'animate-bounce400')}></div>
    </div>
  )
}

export default Loader

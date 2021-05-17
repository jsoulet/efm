import React, { FC } from 'react'
import { IconType } from 'react-icons'
import { Link } from 'react-router-dom'
import cn from 'classnames'

interface AbstractButtonProps {
  iconRight?: IconType
  iconLeft?: IconType
  className?: string
}

interface ButtonProps extends AbstractButtonProps {
  onClick?: () => void
}

interface LinkProps extends AbstractButtonProps {
  to?: string
}

type ButtonPropsType = ButtonProps & LinkProps

const Button: FC<ButtonPropsType> = ({
  iconRight: IconRight,
  iconLeft: IconLeft,
  onClick,
  to,
  className,
  children,
}) => {
  const Tag = onClick ? 'button' : Link
  return (
    <Tag
      className={cn([
        className,
        'flex justify-center items-center  transition-all bg-white border-primary border-2 px-5 py-2 font-semibold tracking-wider text-primary rounded-full hover:-translate-y-1 transform hover:bg-primary hover:text-white',
      ])}
      {...(onClick ? { onClick } : { to })}
    >
      {IconLeft && <IconLeft className="mr-2" />}
      {children}
      {IconRight && <IconRight className="ml-2" />}
    </Tag>
  )
}

export default Button

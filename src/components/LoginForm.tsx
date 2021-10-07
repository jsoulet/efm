import React, { useState } from 'react'
import cn from 'classnames'

interface LoginFormProps {
  onSubmit: (code: string) => void
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [code, setCode] = useState<null | string>(null)

  return (
    <div className="px-12 py-6">
      <div className="text-center">
        <h1 className="font-normal text-xl text-grey-darkest leading-loose my-3 w-full">
          Veuillez saisir votre code d&apos;accès
        </h1>
        <div className="w-full text-center">
          <form
            onSubmit={e => {
              e.preventDefault()
              if (code) {
                onSubmit(code)
              }
            }}
          >
            <div className="max-w-sm mx-auto p-1 pr-0 flex items-center">
              <input
                aria-label="Code d'accès"
                onChange={e => setCode(e.target.value)}
                type="password"
                placeholder="••••••••"
                className=" focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-100 flex-1 appearance-none rounded shadow p-3 text-grey-dark mr-2 focus:outline-none"
              />
              <button
                type="submit"
                className={cn(
                  'flex justify-center items-center  transition-all bg-white border-primary border-2 px-5 py-2 font-semibold tracking-wider text-primary rounded-full transform hover:bg-primary hover:text-white',
                  { 'opacity-50': !code }
                )}
                disabled={!code}
              >
                Entrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm

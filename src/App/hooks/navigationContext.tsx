import React, { FC, useCallback, useMemo, useState } from 'react'

type Backlink = {
  label: string
  path: string
}
type Navigation = {
  setBacklink: (label: string, path: string) => void
  clearBacklink: () => void
  backlink?: Backlink
}

const NavigationContext = React.createContext<Navigation>({
  setBacklink: () => {
    return
  },
  clearBacklink: () => {
    return
  },
  backlink: undefined,
})

export const NavigationProvider: FC = ({ children, ...props }) => {
  const [backlinkLabel, setBacklinkLabel] = useState<string>('')
  const [backlinkPath, setBacklinkPath] = useState<string>('')
  const backlink = useMemo(() => {
    if (!backlinkLabel || !backlinkPath) {
      return undefined
    }
    return {
      label: backlinkLabel,
      path: backlinkPath,
    }
  }, [backlinkLabel, backlinkPath])
  const setBacklink = useCallback(
    (label: string, path: string) => {
      setBacklinkLabel(label)
      setBacklinkPath(path)
    },
    [setBacklinkLabel, setBacklinkPath]
  )
  const clearBacklink = useCallback(() => {
    setBacklinkLabel('')
    setBacklinkPath('')
  }, [setBacklinkLabel, setBacklinkPath])
  return (
    <NavigationContext.Provider
      value={{
        setBacklink,
        clearBacklink,
        backlink,
      }}
      {...props}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export const useNavigation = () => React.useContext(NavigationContext)

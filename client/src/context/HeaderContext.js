import React, { createContext, useState } from "react"

export const HeaderContext = createContext()

export const HeaderProvider = (props) => {
  const [showHeader, setShowHeader] = useState(true)

  return (
    <HeaderContext.Provider value={[showHeader, setShowHeader]}>
      {props.children}
    </HeaderContext.Provider>
  )
}

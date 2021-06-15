import React, { createContext, useState } from "react"

export const SearchContext = createContext()

export const SearchProvider = (props) => {
  const [searchPlaceHolder, setSearchPlaceHolder] = useState("Search...")
  const [searchText, setSearchText] = useState("Search..")

  return (
    <SearchContext.Provider
      value={{
        searchPlaceHolder,
        setSearchPlaceHolder,
        searchText,
        setSearchText
      }}
    >
      {props.children}
    </SearchContext.Provider>
  )
}

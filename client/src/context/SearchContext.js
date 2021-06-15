import React, { createContext, useState } from "react"

export const SearchContext = createContext()

export const SearchProvider = (props) => {
  const [searchPlaceHolder, setSearchPlaceHolder] = useState("Search...")
  const [searchText, setSearchText] = useState("Search..")
  const [showSearchBar, setShowSearchBar] = useState(true)

  return (
    <SearchContext.Provider
      value={{
        showSearchBar,
        setShowSearchBar,
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

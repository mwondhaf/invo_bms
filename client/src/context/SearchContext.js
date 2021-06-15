import React, { createContext, useState } from "react"

export const SearchContext = createContext()

export const SearchProvider = (props) => {
  const [test, setTest] = useState("")
  const [currentPage, setCurrentPage] = useState("")
  const [searchPlaceHolder, setSearchPlaceHolder] = useState("Search...")
  const [searchText, setSearchText] = useState("Search..")

  return (
    <SearchContext.Provider
      value={[
        searchPlaceHolder,
        setSearchPlaceHolder,
        test,
        setTest,
        searchText,
        setSearchText,
        currentPage,
        setCurrentPage
      ]}
    >
      {props.children}
    </SearchContext.Provider>
  )
}

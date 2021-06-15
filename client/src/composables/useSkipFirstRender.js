import { useEffect, useRef } from "react"

const useSkipFirstRender = (fn, args) => {
  const isMounted = useRef(false)

  useEffect(() => {
    if (isMounted.current) {
      console.log("running")
      return fn()
    }
  }, args)

  useEffect(() => {
    isMounted.current = true
  }, [])
}

export default useSkipFirstRender

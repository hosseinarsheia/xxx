import React, { useEffect, useState } from 'react'

import api from '../api/api'

const useFetchApi = (url, data, callOnMounting = false) => {
  const [res, setRes] = useState(null)
  const [err, setErr] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const useFetchData = () => {
    setIsLoading(true)
    console.log('useFetchData')

    api(url, data)
      .then(res => setRes(res))
      .catch(err => setErr(err))
      .finally(() => setIsLoading(false))
  }
  useEffect(() => {
    callOnMounting && useFetchData()
  }, [])

  return { res, err, useFetchData, isLoading }
}

export default useFetchApi

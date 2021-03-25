import React from 'react'

function useStorage() {
  const set = {
    PROFILEOBJ: (profileObj: string | object) => {
      localStorage.setItem('PROFILEOBJ', JSON.stringify(profileObj))
    },
  }
  const PROFILEOBJ: string = '' //localStorage.getItem('PROFILEOBJ') || ''
  var get: any =
    PROFILEOBJ === null
      ? {}
      : {
          PROFILEOBJ: JSON.parse(PROFILEOBJ),
        }
  // console.log(get)
  return [get, set]
}

export default useStorage

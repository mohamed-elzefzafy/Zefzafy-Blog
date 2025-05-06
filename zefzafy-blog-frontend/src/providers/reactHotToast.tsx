import React from 'react'
import { Toaster } from 'react-hot-toast'

const reactHotToast = () => {
  return (
    <Toaster
    position="top-center"
    reverseOrder={false}
    gutter={8}
    toastOptions={{
      // Define default options
      duration: 5000,
      style: {
        background: '#363636',
        color: '#fff',
      },
      // Default options for specific types
      success: {
        duration: 3000,
        style: {
          backgroundColor: 'white',
          color: 'black',
        },
      },
      error: {
        duration: 3000,
        style: {
          backgroundColor: 'white',
          color: 'black',
        },
      },
    }}/>
  )
}

export default reactHotToast
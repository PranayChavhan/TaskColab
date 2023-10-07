import { Button } from '@material-tailwind/react'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        <h1 className='my-2'>Hello, Let's Collab</h1>
        <Button size='sm' color='blue' onClick={() => toast('Welcome!', {
          icon: '👋',
        })}>Get Started</Button>
      </div>
    </>
  )
}

export default App
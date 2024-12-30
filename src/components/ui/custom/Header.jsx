import React from 'react'
import { Button } from '../button'

function Header() {
  return (
    <>
    <div className='p-4 flex justify-between items-center'>
      <img src="/logo.svg" />
      <Button>Sign In</Button>
    </div>
    </>
  )
}

export default Header
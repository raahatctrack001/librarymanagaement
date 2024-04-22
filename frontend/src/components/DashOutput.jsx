import React from 'react'
import AllBooks from './AllBooks'
import AllUsers from './AllUsers'

const DashOutput = () => {
  return (
    <div className='flex mt-10'>
    
    <AllBooks />
    <AllUsers />
    </div>
  )
}

export default DashOutput
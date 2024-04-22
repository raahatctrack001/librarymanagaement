import React from 'react'
import AllBooks from './AllBooks'
import AllUsers from './AllUsers'
import { useSelector } from 'react-redux'

const DashOutput = () => {
  const { currentUser } = useSelector(state=>state.user)
  return (
    <div className='flex mt-10'>
    
    <AllBooks />
    { currentUser?.isAdmin && <AllUsers />}
    </div>
  )
}

export default DashOutput
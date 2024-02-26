import React from 'react'

const Dashboard = ({name}) => {
  return (
    <div className='pt-28'>
      <h2 className='flex text-2xl flex-row justify-center items-center gap-3 text-slate-500'>Welcome <span className='text-white'> {name}</span></h2>
    </div>
  )
}

export default Dashboard
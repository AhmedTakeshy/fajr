import PostForm from '@/components/dashboard/PostForm'
import React from 'react'

export default function page() {
  return (
    <div className='grid grid-cols-1 m-4 place-items-center w-[40rem] mx-auto mt-12'>
      <PostForm />
    </div>
  )
}

// "use client"
import Image from 'next/image'
import { ImSpinner9 } from 'react-icons/im'

export default function Loading() {
  return (
      <div className='flex items-center justify-center w-screen h-screen'>
      {/* <ImSpinner9 className="ease-in-out animate-spin" size={100} /> */}
      <Image className="w-56 ease-in-out animate-pulse" src="/imgs/logo.png" width={160} height={75} alt="logo" />
      </div>
  )
}

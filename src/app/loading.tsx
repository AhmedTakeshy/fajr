import Image from 'next/image'

export default function Loading() {
  return (
      <div className='flex items-center justify-center w-screen h-screen'>
      <Image className="w-56 ease-in-out animate-pulse" src="/imgs/logo.png" width={160} height={75} alt="logo" />
      </div>
  )
}

// "use client"
import { ImSpinner9 } from 'react-icons/im'

export default function loading() {
  return (
      <div className='flex items-center justify-center w-screen '>
      <ImSpinner9 className="ease-in-out animate-spin" size={100} />
      </div>
  )
}

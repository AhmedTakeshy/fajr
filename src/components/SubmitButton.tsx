"use client"
import { ImSpinner9 } from 'react-icons/im'
import { Button } from './ui/button'


type Props = {
    className?: string
    text: string,
    pending?: boolean
}

export default function SubmitButton({ className, text,pending }: Props) {


  return (
      <Button disabled={pending} type="submit" className="w-full !mt-4">{pending ? <ImSpinner9 className="ease-in-out animate-spin" size={25} /> : text}</Button>
  )
}

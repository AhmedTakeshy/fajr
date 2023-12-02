"use client"
import { ImSpinner9 } from 'react-icons/im'
import { Button } from './ui/button'


type Props = {
    className?: string
    text: string,
    pending?: boolean,
    va?: "link" | "outline" | "default" | "destructive" | "secondary" | "ghost" | null | undefined
    sz?: "default" | "sm" | "lg" | "icon" | null | undefined
    fn?: () => void
    frmAc?: () => void
}

export default function SubmitButton({ className, text,pending,va,sz,fn,frmAc }: Props) {


  return (
    <Button formAction={frmAc} onClick={fn} size={sz} variant={va} disabled={pending} type="submit" className={`${className ? className :"w-full !mt-4"} `}>{pending ? <ImSpinner9 className="ease-in-out animate-spin" size={25} /> : text}</Button>
  )
}

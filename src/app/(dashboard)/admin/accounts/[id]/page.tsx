import { getUserById } from '@/_actions/userActions'
import UpdateUserForm from '@/components/dashboard/UpdateUserForm'
import React from 'react'


type Props = {
    params: { id: string }
}

export default async function page({params}:Props) {
    const {id} = params
    console.log("🚀 ~ file: page.tsx:12 ~ page ~ id:", id)
    const user = !!id && await getUserById(parseInt(id))
  return (
    <UpdateUserForm user={user as User}/>
  )
}

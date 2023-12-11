import { getUserById } from '@/_actions/userActions'
import UpdateUserForm from '@/components/dashboard/UpdateUserForm'
import React from 'react'


type Props = {
    params: { id: string }
}

export default async function page({params}:Props) {
    const {id} = params
    const user = !!id && await getUserById(parseInt(id))
  return (
    <UpdateUserForm user={user as User}/>
  )
}

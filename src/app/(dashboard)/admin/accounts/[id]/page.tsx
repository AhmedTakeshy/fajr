import { getUserById } from '@/_actions/userActions'
import UpdateUserForm from '@/components/dashboard/UpdateUserForm'
import React from 'react'


type Props = {
    params: { id: string }
}

export default async function page({params}:Props) {
    const {id} = params
    const user:User = await getUserById(parseInt(id))as User
  return (
    <UpdateUserForm user={user}/>
  )
}

import { getUserById, getUsers } from '@/_actions/userActions'
import UpdateUserForm from '@/components/dashboard/UpdateUserForm'
import React from 'react'


type Props = {
    params: { id: string }
}

export async function generateStaticParams() {
  const users:User[] = await getUsers()

  return users.map((user) => ({
    id: `${user.publicId.slice(0, 10) + user.id + user.publicId.slice(10, -11)}`,
  }))
}


export default async function page({params}:Props) {
    const {id} = params
    const user = await getUserById(parseInt(id))
  return (
    <UpdateUserForm user={user}/>
  )
}

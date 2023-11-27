import { FaKhanda } from 'react-icons/fa';
import Link from 'next/link';
import { ModeToggler } from '../ModeToggler';
import { buttonVariants } from '../ui/button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import SignoutButton from './SignoutButton';
import NavMenu from './NavMenu';
import Image from 'next/image';




export default async function Navbar() {
    const session = await getServerSession(authOptions)
    const avatar = `https://ui-avatars.com/api/?name=${session?.user?.name}&background=random&rounded=true&size=128&font-size=0.50`;
    const image = session?.user?.image;

    return (
        <header dir='rtl' className="bg-slate-200 dark:bg-gray-900">
            <div className="relative flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
                <Link href="/" className="flex items-center">
                    <Image className="w-20 ml-auto" src="/imgs/logo.svg" width={80} height={80} alt="logo" />
                </Link>
                <div className='flex items-center justify-end gap-3'>
                    <ModeToggler className="inline-flex md:hidden" />
                    <NavMenu />
                </div>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <div className="flex flex-col gap-2 p-4 mt-4 font-medium border rounded-lg md:p-0 md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 md:items-center">
                        {
                            session?.user ?
                                <div className='flex items-center justify-center gap-2'>
                                    <Image src={image && !image.includes("fbsbx") ? image : avatar} alt={`${session.user.name} pic`} width={35} height={35} className="object-cover rounded-full" />
                                    <p>{session.user.name}</p>
                                </div>
                                :
                                <Link href="/signin" className={buttonVariants({ variant: "outline" })}>سجل دخول</Link>
                        }
                        {session?.user && (<SignoutButton />)}
                        <ModeToggler className="md:inline-flex" />
                    </div>
                </div>
            </div>
        </header>
    )
}



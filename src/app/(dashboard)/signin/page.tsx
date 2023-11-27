import { SignInForm } from '@/components/dashboard/SignInForm'

export default function SignIn() {
  return (
    <div className='flex flex-col items-center justify-center gap-8 mx-auto max-w-xs w-full h-screen'>
      <p className='text-2xl'>برجاء تسجيل الدخول</p>
          <SignInForm />
      </div>

  )
}

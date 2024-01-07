import DangerAlert from "@/components/shared/DangerAlert"
import { useToast } from "@/components/ui/use-toast"
import { AuthFn } from "@/query/AuthFn"
import { LoginError, LoginInput } from "@/types/auth.types"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { IoAnalyticsSharp } from "react-icons/io5"

export default function LoginPage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<LoginInput>()
  const { toast } = useToast()

  const { mutate: login, status: registerStatus } = useMutation({
    mutationFn: AuthFn.login,
    onMutate: () => {},
    onSuccess: (data) => {
      toast({
        description: "Success login",
      })
      router.push("/")
    },
    onError: (error: LoginError) => {
      const { status } = error.response
      if (status === 401) {
        setError("root", { message: "Invalid username or password" })
      }
    },
  })

  function onSubmit(input: LoginInput) {
    login(input)
  }
  return (
    <section className='bg-zinc-50'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0'>
        <span className='flex items-center mb-3 text-7xl text-zinc-950'>
          <IoAnalyticsSharp />
        </span>
        {errors?.root?.message && <DangerAlert text={errors?.root?.message} />}

        <div className='w-full bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <div className='flex flex-col gap-1'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-zinc-900 md:text-2xl'>
                Sign in to your account
              </h1>
            </div>
            <form
              className='space-y-4 md:space-y-6'
              onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor='username'
                  className='block mb-2 text-sm font-medium text-zinc-900'>
                  Your username
                </label>
                <input
                  type='text'
                  id='username'
                  className='bg-zinc-50 border border-zinc-300 text-zinc-900 sm:text-sm rounded-lg focus:ring-zinc-600 focus:border-zinc-600 block w-full p-2.5'
                  {...register("username", { required: true })}
                />
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-zinc-900'>
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  placeholder='••••••••'
                  className='bg-zinc-50 border border-zinc-300 text-zinc-900 sm:text-sm rounded-lg focus:ring-zinc-600 focus:border-zinc-600 block w-full p-2.5'
                  {...register("password", { required: true })}
                />
              </div>
              <button
                type='submit'
                className='w-full text-white bg-zinc-950 hover:bg-zinc-700 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
                Sign in
              </button>
              <p className='text-sm font-light text-zinc-500'>
                Dont have an account yet?{" "}
                <Link
                  href='/register'
                  className='font-medium text-zinc-600 hover:underline'>
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

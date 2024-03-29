import Link from "next/link"
import { IoAnalyticsSharp } from "react-icons/io5"
import { useForm } from "react-hook-form"
import { useState } from "react"
import UploadDialog from "./Dialog"
import { RegisterError, RegisterInput } from "@/types/auth.types"
import { useMutation } from "@tanstack/react-query"
import { UploadFn } from "@/query/UploadFn"
import { useToast } from "@/components/ui/use-toast"
import { AuthFn } from "@/query/AuthFn"
import { getErrorMessageByLoc } from "@/utils/errorValidator"

type dataForm = Omit<RegisterInput, "photo">

export default function RegisterPage() {
  const { toast } = useToast()
  const [showDialog, setShowDialog] = useState(false)
  const [data, setData] = useState<RegisterInput>()
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setError,
    formState: { errors, isValid },
  } = useForm<RegisterInput>()

  function handleOpenDialog() {
    console.log("MASUK")

    setShowDialog(true)
    setData(getValues())
  }

  const [photoCode, setPhotoCode] = useState("")

  const { mutate: uploadPhoto, status: uploadStatus } = useMutation({
    mutationFn: UploadFn.post,
    onMutate: () => {},
    onSuccess: (data) => {
      toast({
        description: "Success upload photo",
      })
      setPhotoCode(data)
    },
    onError: (error: any) => {
      const { detail } = error.response.data
      if (detail.code === "IMAGE_TOO_BIG") {
        setError("photos", { message: "Image size is too big" })
      }
      toast({ description: "Error upload photo" })
    },
  })

  const { mutate: registerUser, status: registerStatus } = useMutation({
    mutationFn: AuthFn.register,
    onMutate: () => {},
    onSuccess: (data) => {
      toast({
        description: "Success register user",
      })
    },
    onError: (error: RegisterError) => {
      const { detail } = error.response.data
      setError("email", { message: getErrorMessageByLoc(detail, "email") })
      setError("phone", { message: getErrorMessageByLoc(detail, "phone") })
      setError("password", {
        message: getErrorMessageByLoc(detail, "password"),
      })
      setError("age", { message: getErrorMessageByLoc(detail, "age") })
      setError("name", { message: getErrorMessageByLoc(detail, "name") })
      setError("photos", { message: getErrorMessageByLoc(detail, "photos") })
      toast({ description: "Error register user" })
    },
    onSettled: () => {
      setShowDialog(false)
    },
  })

  function handleClick() {
    registerUser({ ...data, photos: [photoCode] })
  }

  function onSubmit(input: any) {
    console.log(input)
  }

  return (
    <section className='bg-zinc-50'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0'>
        <span className='flex items-center mb-3 text-7xl text-zinc-950'>
          <IoAnalyticsSharp />
        </span>
        <div className='w-full bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-zinc-900 md:text-2xl'>
              Create an account
            </h1>
            <form
              className='space-y-4'
              onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-zinc-900'>
                  Your email
                </label>
                <input
                  type='type'
                  id='email'
                  className='bg-zinc-50 border border-zinc-300 text-zinc-900 sm:text-sm rounded-lg focus:ring-zinc-600 focus:border-zinc-600 block w-full p-2.5'
                  placeholder='name@company.com'
                  {...register("email")}
                />
                <h5 className='text-xs text-red-500 mt-1 capitalize'>
                  {errors.email?.message}
                </h5>
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
                  {...register("password")}
                />
                <h5 className='text-xs text-red-500 mt-1 capitalize'>
                  {errors.password?.message}
                </h5>
              </div>
              <div>
                <label
                  htmlFor='name'
                  className='block mb-2 text-sm font-medium text-zinc-900'>
                  Your Name
                </label>
                <input
                  type='text'
                  id='name'
                  className='bg-zinc-50 border border-zinc-300 text-zinc-900 sm:text-sm rounded-lg focus:ring-zinc-600 focus:border-zinc-600 block w-full p-2.5'
                  {...register("name")}
                />
                <h5 className='text-xs text-red-500 mt-1 capitalize'>
                  {errors.name?.message}
                </h5>
              </div>
              <div>
                <label
                  htmlFor='phone'
                  className='block mb-2 text-sm font-medium text-zinc-900'>
                  Phone Number
                </label>
                <input
                  type='text'
                  id='phone'
                  className='bg-zinc-50 border border-zinc-300 text-zinc-900 sm:text-sm rounded-lg focus:ring-zinc-600 focus:border-zinc-600 block w-full p-2.5'
                  {...register("phone")}
                />
                <h5 className='text-xs text-red-500 mt-1 capitalize'>
                  {errors.phone?.message}
                </h5>
              </div>
              <div>
                <label
                  htmlFor='age'
                  className='block mb-2 text-sm font-medium text-zinc-900'>
                  Age
                </label>
                <input
                  type='number'
                  id='age'
                  className='bg-zinc-50 border border-zinc-300 text-zinc-900 sm:text-sm rounded-lg focus:ring-zinc-600 focus:border-zinc-600 block w-full p-2.5'
                  {...register("age")}
                />
                <h5 className='text-xs text-red-500 mt-1 capitalize'>
                  {errors.age?.message}
                </h5>
              </div>

              <button
                onClick={handleOpenDialog}
                className='w-full text-white bg-zinc-950 hover:bg-zinc-700 focus:ring-2 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
                Submit
              </button>
              <p className='text-sm font-light text-zinc-500'>
                Already have an account?{" "}
                <Link
                  href='/login'
                  className='font-medium text-zinc-600 hover:underline'>
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <UploadDialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        data={data}
        uploadPhoto={uploadPhoto}
        handleClick={handleClick}
        errorMsg={errors.photos?.message}
      />
    </section>
  )
}

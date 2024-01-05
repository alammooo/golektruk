import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RegisterInput } from "."
import { Dispatch, SetStateAction, useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { apiUrl } from "@/utils/apiUrl"
import { useToast } from "@/components/ui/use-toast"
import { useMutation } from "@tanstack/react-query"
import { UploadFn } from "@/query/UploadFn"

type Props = {
  data: RegisterInput | undefined
  showDialog: boolean
  setShowDialog: Dispatch<SetStateAction<boolean>>
}

export default function UploadDialog({
  data,
  showDialog,
  setShowDialog,
}: Props) {
  const { toast } = useToast()
  const { register, handleSubmit } = useForm<RegisterInput>()
  const [filePreview, setFilePreview] = useState<string | ArrayBuffer | null>(
    null
  )
  const [photoCode, setPhotoCode] = useState("")

  const { mutate: uploadPhoto, status: uploadStatus } = useMutation({
    mutationFn: UploadFn.upload,
    onMutate: () => {},
    onSuccess: (data) => {
      toast({
        description: "Success upload photo",
      })
      console.log(data, "HALLO RESPONSE✅✅✅")
      setPhotoCode(data)
    },
    onError: (error: any) => {
      toast({ description: "Error upload photo" })
    },
  })

  function onSubmit(input: any) {
    const formData = new FormData()
    formData.append("file", input.photo[0])
    const reader = new FileReader()
    reader.onloadend = () => {
      setFilePreview(reader.result)
    }
    reader.readAsDataURL(input?.photo[0])

    uploadPhoto(formData)
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFilePreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      const formData = new FormData()
      formData.append("file", file)

      uploadPhoto(formData)
    }
  }

  return (
    <Dialog
      open={showDialog}
      onOpenChange={() => setShowDialog(false)}>
      <DialogContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-3'>
          <div>
            <h5 className='font-semibold text-lg mb-2'>Please upload photo</h5>
            <div className='flex items-center justify-center w-full'>
              <label
                htmlFor='dropzone-file'
                className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'>
                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                  {filePreview ? (
                    <img
                      src={filePreview as string}
                      className='h-60'
                    />
                  ) : (
                    <>
                      <svg
                        className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 20 16'>
                        <path
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          stroke-width='2'
                          d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                        />
                      </svg>
                      <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                        <span className='font-semibold'>Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className='text-xs text-gray-500 dark:text-gray-400'>
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </>
                  )}
                </div>
                <input
                  id='dropzone-file'
                  type='file'
                  className='hidden'
                  {...register("photo")}
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
          <Button type='submit' className="w-full">Create an account</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

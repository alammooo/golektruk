import { Fragment } from "react"
import { Disclosure, Menu, Transition } from "@headlessui/react"
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { LayoutProps } from "@/types/layout.types"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/router"

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
]

export default function MainLayout({ children }: LayoutProps) {
  const router = useRouter()

  function handleLogout() {
    sessionStorage.clear()
    router.replace("/login")
  }
  return (
    <div className='antialiased bg-zinc-50 dark:bg-zinc-900'>
      <nav className='bg-white border-b border-zinc-200 px-4 py-2.5 dark:bg-zinc-800 dark:border-zinc-700 fixed left-0 right-0 top-0 z-50'>
        <div className='flex flex-wrap justify-between items-center'>
          <div className='flex justify-start items-center'>
            <Link
              href={"/"}
              className='text-xl font-bold'>
              Laporan Analytics
            </Link>
          </div>
          <Button
            variant='secondary'
            onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </nav>

      <main className='p-4 h-auto pt-20 min-h-screen'>
        {children}
        {/* <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4'>
          <div className='border-2 border-dashed border-zinc-300 rounded-lg dark:border-zinc-600 h-32 md:h-64'></div>
          <div className='border-2 border-dashed rounded-lg border-zinc-300 dark:border-zinc-600 h-32 md:h-64'></div>
          <div className='border-2 border-dashed rounded-lg border-zinc-300 dark:border-zinc-600 h-32 md:h-64'></div>
          <div className='border-2 border-dashed rounded-lg border-zinc-300 dark:border-zinc-600 h-32 md:h-64'></div>
        </div>
        <div className='border-2 border-dashed rounded-lg border-zinc-300 dark:border-zinc-600 h-96 mb-4'></div>
        <div className='grid grid-cols-2 gap-4 mb-4'>
          <div className='border-2 border-dashed rounded-lg border-zinc-300 dark:border-zinc-600 h-48 md:h-72'></div>
          <div className='border-2 border-dashed rounded-lg border-zinc-300 dark:border-zinc-600 h-48 md:h-72'></div>
          <div className='border-2 border-dashed rounded-lg border-zinc-300 dark:border-zinc-600 h-48 md:h-72'></div>
          <div className='border-2 border-dashed rounded-lg border-zinc-300 dark:border-zinc-600 h-48 md:h-72'></div>
        </div>
        <div className='border-2 border-dashed rounded-lg border-zinc-300 dark:border-zinc-600 h-96 mb-4'></div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='border-2 border-dashed rounded-lg border-zinc-300 dark:border-zinc-600 h-48 md:h-72'></div>
          <div className='border-2 border-dashed rounded-lg border-zinc-300 dark:border-zinc-600 h-48 md:h-72'></div>
          <div className='border-2 border-dashed rounded-lg border-zinc-300 dark:border-zinc-600 h-48 md:h-72'></div>
          <div className='border-2 border-dashed rounded-lg border-zinc-300 dark:border-zinc-600 h-48 md:h-72'></div>
        </div> */}
      </main>
    </div>
  )
}

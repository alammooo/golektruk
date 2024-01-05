import { Fragment } from "react"
import { Disclosure, Menu, Transition } from "@headlessui/react"
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { LayoutProps } from "@/types/layout.types"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}

export default function MainLayout({ children }: LayoutProps) {
  return (
    <div className='antialiased bg-zinc-50 dark:bg-zinc-900'>
      <nav className='bg-white border-b border-zinc-200 px-4 py-2.5 dark:bg-zinc-800 dark:border-zinc-700 fixed left-0 right-0 top-0 z-50'>
        <div className='flex flex-wrap justify-between items-center'>
          <div className='flex justify-start items-center'>
            <button
              data-drawer-target='drawer-navigation'
              data-drawer-toggle='drawer-navigation'
              aria-controls='drawer-navigation'
              className='p-2 mr-2 text-zinc-600 rounded-lg cursor-pointer md:hidden hover:text-zinc-900 hover:bg-zinc-100 focus:bg-zinc-100 dark:focus:bg-zinc-700 focus:ring-2 focus:ring-zinc-100 dark:focus:ring-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white'>
              <svg
                aria-hidden='true'
                className='w-6 h-6'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  fill-rule='evenodd'
                  d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                  clip-rule='evenodd'></path>
              </svg>
              <svg
                aria-hidden='true'
                className='hidden w-6 h-6'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  fill-rule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clip-rule='evenodd'></path>
              </svg>
              <span className='sr-only'>Toggle sidebar</span>
            </button>
            <Link
              href={"/"}
              className='text-xl font-semibold'>
              Laporan Analytics
            </Link>
          </div>
          <Button variant='secondary'>Export Laporan</Button>
        </div>
      </nav>

      <main className='p-4 h-auto pt-20'>
        {children}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4'>
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
        </div>
      </main>
    </div>
  )
}

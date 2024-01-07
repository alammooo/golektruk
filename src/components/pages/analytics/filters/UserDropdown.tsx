import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Dispatch, SetStateAction, useState } from "react"

type User = {
  value: string | undefined
  label: string
}

type Props = {
  setUserType: Dispatch<SetStateAction<string | undefined>>
  disabledState: boolean
}

type InsideProps = {
  setOpen: (open: boolean) => void
  setSelectedUser: (platform: User | null) => void
  setUserType: Dispatch<SetStateAction<string | undefined>>
}

const usersType: User[] = [
  {
    value: "login",
    label: "Login",
  },
  {
    value: "guest",
    label: "Guest",
  },
  {
    value: undefined,
    label: "All",
  },
]

export function UserDropdown({ setUserType, disabledState }: Props) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  if (isDesktop) {
    return (
      <Popover
        open={open}
        onOpenChange={setOpen}>
        <PopoverTrigger
          asChild
          disabled={disabledState}
          className={`${disabledState ? "cursor-not-allowed" : ""}`}>
          <Button
            variant='outline'
            className='w-[150px] justify-start'>
            {selectedUser ? <>{selectedUser.label}</> : <>+ Set user</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='w-[200px] p-0'
          align='start'>
          <UserList
            setOpen={setOpen}
            setSelectedUser={setSelectedUser}
            setUserType={setUserType}
          />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}>
      <DrawerTrigger
        asChild
        disabled={disabledState}
        className={`${disabledState ? "cursor-not-allowed" : ""}`}>
        <Button
          variant='outline'
          className='w-full justify-start'>
          {selectedUser ? <>{selectedUser.label}</> : <>+ Set user</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='mt-4 border-t'>
          <UserList
            setOpen={setOpen}
            setSelectedUser={setSelectedUser}
            setUserType={setUserType}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function UserList({ setOpen, setSelectedUser, setUserType }: InsideProps) {
  return (
    <Command>
      <CommandInput placeholder='Filter user...' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {usersType.map((user) => (
            <CommandItem
              key={user.value}
              value={user.value}
              onSelect={(value) => {
                setSelectedUser(
                  usersType.find((ele) => ele.value === value) || null
                )
                setUserType(user.value)
                setOpen(false)
              }}>
              {user.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

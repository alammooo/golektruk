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
import { useState } from "react"

type Platform = {
  value: string
  label: string
}

const platforms: Platform[] = [
  {
    value: "desktop",
    label: "Desktop",
  },
  {
    value: "responsive",
    label: "Responsive",
  },
  {
    value: "mobile",
    label: "Mobile",
  },
]

export function PlatformDropdown() {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null
  )

  if (isDesktop) {
    return (
      <Popover
        open={open}
        onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className='w-[150px] justify-start'>
            {selectedPlatform ? (
              <>{selectedPlatform.label}</>
            ) : (
              <>+ Set platform</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='w-[200px] p-0'
          align='start'>
          <PlatformList
            setOpen={setOpen}
            setSelectedPlatform={setSelectedPlatform}
          />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant='outline'
          className='w-full justify-start'>
          {selectedPlatform ? (
            <>{selectedPlatform.label}</>
          ) : (
            <>+ Set platform</>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='mt-4 border-t'>
          <PlatformList
            setOpen={setOpen}
            setSelectedPlatform={setSelectedPlatform}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function PlatformList({
  setOpen,
  setSelectedPlatform,
}: {
  setOpen: (open: boolean) => void
  setSelectedPlatform: (platform: Platform | null) => void
}) {
  return (
    <Command>
      <CommandInput placeholder='Filter platform...' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {platforms.map((platform) => (
            <CommandItem
              key={platform.value}
              value={platform.value}
              onSelect={(value) => {
                setSelectedPlatform(
                  platforms.find((ele) => ele.value === value) || null
                )
                setOpen(false)
              }}>
              {platform.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

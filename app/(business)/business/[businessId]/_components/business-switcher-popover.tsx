'use client'

import { Business } from '@prisma/client'
import { CheckIcon, ChevronsUpDownIcon, PlusIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { useModal } from '@/hooks/use-modal'
import { cn } from '@/lib/utils'

type Props = {
	businesses: Business[]
}

export const BusinessSwitcherPopover = ({ businesses }: Props) => {
	const params = useParams()
	const router = useRouter()
	const { onOpen } = useModal()

	const [open, setOpen] = useState<boolean>(false)

	const selectedBusiness = businesses.find(
		(business) => business.id === params.businessId
	)

	const onBusinessSelect = (businessId: string) => {
		router.push(`/business/${businessId}`)
		router.refresh()
		setOpen(false)
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					role='combobox'
					variant='outline'
					className='justify-between w-full gap-x-2'
				>
					<span className='truncate'>{selectedBusiness?.name}</span>

					<ChevronsUpDownIcon className='w-4 h-4 text-muted-foreground shrink-0' />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				align='start'
				className='dark:bg-[#09090b] p-0 w-[268px]'
			>
				<Command className='dark:bg-[#09090b]'>
					<CommandList>
						<CommandInput placeholder='Search for a business' />
						<CommandEmpty className='py-2'>
							No business found.
						</CommandEmpty>
						<CommandGroup heading='Business'>
							{businesses.map((business) => (
								<CommandItem
									key={business.id}
									className={cn(
										'relative pl-8 cursor-pointer',
										selectedBusiness?.id === business.id &&
											'bg-slate-100 dark:bg-[#050505]'
									)}
									onSelect={() =>
										onBusinessSelect(business.id)
									}
								>
									{selectedBusiness?.id === business.id && (
										<CheckIcon className='absolute w-4 h-4 left-2 shrink-0' />
									)}

									<span className='truncate'>
										{business.name}
									</span>
								</CommandItem>
							))}
						</CommandGroup>
						<CommandSeparator />
					</CommandList>
					<CommandList>
						<CommandGroup>
							<CommandItem
								onSelect={() => {
									onOpen('createBusiness')
									setOpen(false)
								}}
								className='cursor-pointer gap-x-2'
							>
								<PlusIcon className='w-4 h-4' />
								Add business
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

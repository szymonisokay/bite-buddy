'use client'

import { Business } from '@prisma/client'
import { CheckIcon, ChevronsUpDownIcon, PlusCircleIcon } from 'lucide-react'
import { useParams } from 'next/navigation'

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
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { TooltipHover } from '../tooltip-hover'

type Props = {
	businesses: Business[]
}

export const BusinessSelect = ({ businesses }: Props) => {
	const params = useParams()
	const [open, setOpen] = useState<boolean>(false)

	const selectedBusiness = businesses.find(
		(business) => business.id === params.businessId
	)

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					role='combobox'
					variant='outline'
					className='justify-between w-full gap-x-2'
				>
					<TooltipHover content={selectedBusiness?.name}>
						<span className='truncate'>
							{selectedBusiness?.name}
						</span>
					</TooltipHover>
					<ChevronsUpDownIcon className='w-4 h-4 text-muted-foreground shrink-0' />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				align='start'
				className='dark:bg-[#09090b] p-0 w-[218px]'
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
											'bg-slate-100 dark:bg-[#040405]'
									)}
								>
									<CheckIcon className='absolute w-4 h-4 left-2 shrink-0' />
									<TooltipHover content={business.name}>
										<span className='truncate'>
											{business.name}
										</span>
									</TooltipHover>
								</CommandItem>
							))}
						</CommandGroup>
						<CommandSeparator />
					</CommandList>
					<CommandList>
						<CommandGroup>
							<CommandItem
								onSelect={() => {
									console.log('jet')
									setOpen(false)
								}}
								className='cursor-pointer gap-x-2'
							>
								<PlusCircleIcon className='w-4 h-4' />
								Add business
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

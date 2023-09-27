'use client'

import {
	CopyPlusIcon,
	MoreVerticalIcon,
	PencilIcon,
	TrashIcon,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Meal } from './columns'

type Props = {
	meal: Meal
}

export const ActionsMenu = ({ meal }: Props) => {
	const router = useRouter()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='w-8 h-8 p-0'>
					<span className='sr-only'>Open menu</span>
					<MoreVerticalIcon className='w-4 h-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuItem
					onClick={() => router.push(`meals/${meal.id}`)}
					className='group'
				>
					<PencilIcon className='w-4 h-4 mr-2 duration-200 text-muted-foreground group-hover:text-primary' />
					Edit meal
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => navigator.clipboard.writeText(meal.id)}
					className='group'
				>
					<CopyPlusIcon className='w-4 h-4 mr-2 duration-200 text-muted-foreground group-hover:text-primary' />
					Duplicate meal
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => navigator.clipboard.writeText(meal.id)}
					className='text-red-700 group hover:!text-red-700'
				>
					<TrashIcon className='w-4 h-4 mr-2 duration-200 text-red-700/50 group-hover:text-red-700' />
					Delete meal
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

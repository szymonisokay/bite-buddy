'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'

import { ActionsMenu } from './actions-menu'

export type Meal = {
	id: string
	name: string
	category: string
	price: number
	active: boolean
	featured?: boolean
}

export const columns: ColumnDef<Meal>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => {
			const meal = row.original

			return (
				<Link
					prefetch={false}
					href={`meals/${meal.id}`}
					className='flex items-center gap-x-2 group'
				>
					<span>{meal.name}</span>

					<ExternalLinkIcon className='w-4 h-4 duration-200 text-muted-foreground group-hover:text-primary' />
				</Link>
			)
		},
	},
	{
		accessorKey: 'category',
		header: 'Category',
	},
	{
		accessorKey: 'price',
		header: 'Price',
		cell: ({ row }) => {
			const price = parseFloat(row.getValue('price'))
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			}).format(price)

			return <div>{formatted}</div>
		},
	},
	{
		accessorKey: 'active',
		header: 'Active',
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const meal = row.original

			return <ActionsMenu meal={meal} />
		},
	},
]

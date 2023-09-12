'use client'

import {
	ClipboardListIcon,
	CoinsIcon,
	HomeIcon,
	LineChartIcon,
	SettingsIcon,
	ShoppingBagIcon,
} from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { NavigationItem } from '@/types'

type Props = {
	label: string
	items: NavigationItem[]
}

export const BusinessSection = ({ label, items }: Props) => {
	const params = useParams()
	const pathname = usePathname()

	return (
		<div className='mt-4'>
			<p className='text-sm text-white'>{label}</p>
			<div className='flex flex-col w-full mt-2 text-sm gap-y-3'>
				{items.map((item) => {
					const href = `/business/${params.businessId}${item.href}`

					return (
						<Link
							key={item.href}
							href={href}
							className={cn(
								'px-4 py-3 bg-primary-foreground/0 rounded-md flex gap-x-3 items-center text-muted-foreground hover:text-[#44d9d3] hover:bg-primary-foreground/40 duration-200',
								pathname === href &&
									'text-[#44d9d3] bg-primary-foreground/40'
							)}
						>
							{item.label === 'Home' && (
								<HomeIcon className='w-5 h-5' />
							)}

							{item.label === 'Products' && (
								<ShoppingBagIcon className='w-5 h-5' />
							)}

							{item.label === 'Prices' && (
								<CoinsIcon className='w-5 h-5' />
							)}

							{item.label === 'Orders' && (
								<ClipboardListIcon className='w-5 h-5' />
							)}

							{item.label === 'Sales' && (
								<LineChartIcon className='w-5 h-5' />
							)}

							{item.label === 'Settings' && (
								<SettingsIcon className='w-5 h-5' />
							)}

							{item.label}
						</Link>
					)
				})}
			</div>
		</div>
	)
}

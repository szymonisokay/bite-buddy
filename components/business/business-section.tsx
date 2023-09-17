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
		<div className='mt-4 first-of-type:mt-0'>
			<p className='px-4 text-sm'>{label}</p>
			<div className='flex flex-col w-full mt-2 text-sm'>
				{items.map((item) => {
					const href = `/business/${params.businessId}${item.href}`

					return (
						<Link
							key={item.href}
							href={href}
							className={cn(
								'px-8 py-3 bg-primary-foreground/0  flex gap-x-3 items-center text-muted-foreground hover:text-[#1a8986] dark:hover:text-[#44d9d3] hover:bg-[#125755]/10 duration-200 relative',
								pathname === href &&
									'text-[#1a8986] dark:text-[#44d9d3] bg-[#125755]/10 before:absolute before:h-full before:w-[4px] before:bg-[#1a8986] before:left-0'
							)}
						>
							{item.label === 'Home' && (
								<HomeIcon className='w-4 h-4' />
							)}

							{item.label === 'Products' && (
								<ShoppingBagIcon className='w-4 h-4' />
							)}

							{item.label === 'Prices' && (
								<CoinsIcon className='w-4 h-4' />
							)}

							{item.label === 'Orders' && (
								<ClipboardListIcon className='w-4 h-4' />
							)}

							{item.label === 'Sales' && (
								<LineChartIcon className='w-4 h-4' />
							)}

							{item.label === 'Settings' && (
								<SettingsIcon className='w-4 h-4' />
							)}

							<span>{item.label}</span>
						</Link>
					)
				})}
			</div>
		</div>
	)
}

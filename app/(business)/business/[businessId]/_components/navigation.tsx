'use client'

import {
	BookOpenIcon,
	FileTextIcon,
	LayoutDashboardIcon,
	SettingsIcon,
	ShoppingBagIcon,
} from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { useParams, usePathname } from 'next/navigation'

export const Navigation = () => {
	const pathname = usePathname()
	const params = useParams()

	const routes = [
		{
			label: 'Dashboard',
			href: '',
			icon: LayoutDashboardIcon,
		},
		{
			label: 'Menu',
			href: '/menu',
			icon: BookOpenIcon,
		},
		{
			label: 'Products',
			href: '/products',
			icon: ShoppingBagIcon,
		},
		{
			label: 'Orders',
			href: '/orders',
			icon: FileTextIcon,
		},
		{
			label: 'Settings',
			href: '/settings',
			icon: SettingsIcon,
		},
	]

	return (
		<div className='flex flex-col flex-1 gap-2 mt-4'>
			{routes.map(({ label, href, icon: Icon }) => {
				const hrefPath = `/business/${params?.businessId}${href}`
				const active = pathname === hrefPath

				return (
					<Link
						key={href}
						prefetch={false}
						href={hrefPath}
						className={cn(
							'flex items-center gap-4 px-4 py-2 text-neutral-800 hover:bg-neutral-200/50 rounded-md',
							active && 'bg-neutral-200/50'
						)}
					>
						<Icon className='w-5 h-5 ' />

						<span className='font-normal'>{label}</span>
					</Link>
				)
			})}
		</div>
	)
}

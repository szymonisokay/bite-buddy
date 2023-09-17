'use client'

import { ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

import { checkForUuid } from '@/lib/check-uuid'
import { cn } from '@/lib/utils'

export const BusinessBreadcrumbs = () => {
	const pathname = usePathname()
	const params = useParams()

	const breadcrumbPath = pathname.split('/').pop()

	const isUuid = checkForUuid(breadcrumbPath ?? '')

	return (
		<div className='flex items-center gap-x-2'>
			{!isUuid ? (
				<Link
					href={`/business/${params.businessId}`}
					className={cn(
						'flex items-center gap-x-2',
						!isUuid && 'text-muted-foreground'
					)}
				>
					<span className='text-sm'>Dashboard</span>
				</Link>
			) : (
				<span className='text-sm'>Dashboard</span>
			)}

			{!isUuid && (
				<>
					<ChevronRightIcon className='w-4 h-4 text-muted-foreground' />
					<p className='text-sm capitalize'>{breadcrumbPath}</p>
				</>
			)}
		</div>
	)
}

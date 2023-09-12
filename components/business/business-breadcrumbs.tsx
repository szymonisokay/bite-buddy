'use client'

import { Business } from '@prisma/client'
import { ChevronRightIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { checkForUuid } from '../../lib/check-uuid'
import { BusinessSelect } from './business-select'

type Props = {
	businesses: Business[]
}

export const BusinessBreadcrumbs = ({ businesses }: Props) => {
	const pathname = usePathname()

	const breadcrumbPath = pathname.split('/').pop()

	const isUuid = checkForUuid(breadcrumbPath ?? '')

	return (
		<div className='flex items-center gap-x-4'>
			<BusinessSelect businesses={businesses} />

			{!isUuid && (
				<>
					<ChevronRightIcon className='text-muted-foreground' />
					<p className='capitalize'>{breadcrumbPath}</p>
				</>
			)}
		</div>
	)
}

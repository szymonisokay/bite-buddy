import { redirect } from 'next/navigation'

import { Skeleton } from '@/components/ui/skeleton'
import { db } from '@/lib/db'
import { getProfile } from '@/lib/get-profile'

import { BusinessSwitcherPopover } from './business-switcher-popover'

export const BusinessSwitcher = async () => {
	const profile = await getProfile()

	if (!profile) {
		redirect('/')
	}

	const businesses = await db.business.findMany({
		where: {
			ownerId: profile.id,
		},
	})

	return <BusinessSwitcherPopover businesses={businesses} />
}

const BusinessSwitcherSkeleton = () => {
	return <Skeleton className='w-full h-10' />
}

BusinessSwitcher.Skeleton = BusinessSwitcherSkeleton

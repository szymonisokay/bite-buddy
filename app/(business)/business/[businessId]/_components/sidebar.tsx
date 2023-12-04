import { Suspense } from 'react'

import { BusinessSwitcher } from './business-switcher'
import { Navigation } from './navigation'
import { UserProfile } from './user-profile'

export const Sidebar = () => {
	return (
		<aside className='p-4 w-[300px] hidden md:flex flex-col gap-4'>
			<Suspense fallback={<UserProfile.Skeleton />}>
				<UserProfile />
			</Suspense>

			<Suspense fallback={<BusinessSwitcher.Skeleton />}>
				<BusinessSwitcher />
			</Suspense>

			<Navigation />
		</aside>
	)
}

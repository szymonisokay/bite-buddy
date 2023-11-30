import { Suspense } from 'react'

import { BusinessSwitcher } from './business-switcher'

export const Sidebar = () => {
	return (
		<aside className='p-4 pt-8 w-[300px] hidden md:flex'>
			<Suspense fallback={<BusinessSwitcher.Skeleton />}>
				<BusinessSwitcher />
			</Suspense>
		</aside>
	)
}

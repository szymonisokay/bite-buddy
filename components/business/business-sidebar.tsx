import { redirectToSignIn } from '@clerk/nextjs'

import {
	DashboardNavigationItems,
	OverviewNavigationItems,
	ProductsNavigationItems,
	SettingsNavigationItems,
} from '@/constants'
import { getUser } from '@/lib/get-user'

import { BusinessAvatar } from './business-avatar'
import { BusinessSection } from './business-section'

export const BusinessSidebar = async () => {
	const user = await getUser()

	if (!user) {
		return redirectToSignIn()
	}

	return (
		<div className='w-[250px] dark:bg-[#060607] overflow-hidden'>
			<BusinessAvatar user={user} />

			<div className='p-4'>
				<BusinessSection
					label='Dashboard'
					items={DashboardNavigationItems}
				/>

				<BusinessSection
					label='Products'
					items={ProductsNavigationItems}
				/>

				<BusinessSection
					label='Overview'
					items={OverviewNavigationItems}
				/>

				<BusinessSection
					label='Settings'
					items={SettingsNavigationItems}
				/>
			</div>
		</div>
	)
}

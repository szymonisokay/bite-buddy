import { redirectToSignIn } from '@clerk/nextjs'

import { ThemeToggle } from '@/components/theme-toggle'
import {
	DashboardNavigationItems,
	OverviewNavigationItems,
	ProductsNavigationItems,
	SettingsNavigationItems,
} from '@/constants'
import { getUser } from '@/lib/get-user'
import { prismadb } from '@/lib/prisma'

import { BusinessAvatar } from './business-avatar'
import { BusinessSection } from './business-section'
import { BusinessSelect } from './business-select'

export const BusinessSidebar = async () => {
	const user = await getUser()

	if (!user) {
		return redirectToSignIn()
	}

	const businesses = await prismadb.business.findMany({
		where: {
			ownerId: user.id,
		},
	})

	return (
		<div className='w-[250px] shrink-0 bg-slate-100 dark:bg-[#050505] overflow-hidden hidden md:flex flex-col'>
			<BusinessAvatar user={user} />

			<div className='p-4'>
				<BusinessSelect businesses={businesses} />
			</div>

			<div className='py-4'>
				<BusinessSection
					label='Dashboard'
					items={DashboardNavigationItems}
				/>

				<BusinessSection label='Menu' items={ProductsNavigationItems} />

				<BusinessSection
					label='Overview'
					items={OverviewNavigationItems}
				/>

				<BusinessSection
					label='Settings'
					items={SettingsNavigationItems}
				/>
			</div>

			<div className='p-4 mt-auto'>
				<ThemeToggle />
			</div>
		</div>
	)
}

import { redirect } from 'next/navigation'

import { db } from '@/lib/db'
import { getProfile } from '@/lib/get-profile'

import { MobileSidebar } from './_components/mobile-sidebar'
import { Sidebar } from './_components/sidebar'
import { TopBar } from './_components/topbar'

type Params = {
	children: React.ReactNode
}

const BusinessIdLayout = async ({ children }: Params) => {
	const profile = await getProfile()

	if (!profile) {
		redirect('/')
	}

	const businesses = await db.business.findMany({
		where: {
			ownerId: profile.id,
		},
	})

	return (
		<div className='flex h-full bg-neutral-50'>
			<Sidebar />
			<MobileSidebar profile={profile} businesses={businesses} />

			<div className='flex flex-col flex-1 bg-white rounded-md md:m-4 md:ml-0 md:shadow-sm'>
				<TopBar />

				<main className='flex-1 p-4 overflow-y-auto'>
					{/* <PageHeading /> */}
					{children}
				</main>
			</div>
		</div>
	)
}

export default BusinessIdLayout

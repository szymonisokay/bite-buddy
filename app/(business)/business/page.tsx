import { redirect } from 'next/navigation'

import { db } from '@/lib/db'
import { getProfile } from '@/lib/get-profile'
import { UserButton } from '@clerk/nextjs'

const BusinessPage = async () => {
	const profile = await getProfile()

	if (!profile) {
		return redirect('/')
	}

	const business = await db.business.findFirst({
		where: {
			ownerId: profile.id,
		},
	})

	if (business) {
		redirect(`/business/${business.id}`)
	}

	return (
		<div>
			business
			<UserButton afterSignOutUrl='/' />
		</div>
	)
}

export default BusinessPage

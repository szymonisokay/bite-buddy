import { redirect } from 'next/navigation'

import { CreateInitialBusinessModal } from '@/components/modals/create-initial-business-modal'
import { db } from '@/lib/db'
import { getProfile } from '@/lib/get-profile'

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

	return <CreateInitialBusinessModal />
}

export default BusinessPage

import { redirect } from 'next/navigation'

import { BusinessLocationForm } from '@/components/forms/business-location-form'
import { db } from '@/lib/db'

type Props = {
	businessId: string
}

export const BusinessLocationTab = async ({ businessId }: Props) => {
	const business = await db.business.findUnique({
		where: {
			id: businessId,
		},
		include: {
			location: true,
		},
	})

	if (!business) {
		return redirect('/business')
	}
	return <BusinessLocationForm business={business} />
}

import { redirect } from 'next/navigation'

import { BusinessDetailsForm } from '@/components/forms/business-details-form'
import { db } from '@/lib/db'

type Props = {
	businessId: string
}

export const BusinessDetailsTab = async ({ businessId }: Props) => {
	const business = await db.business.findUnique({
		where: {
			id: businessId,
		},
	})

	if (!business) {
		return redirect('/business')
	}
	return <BusinessDetailsForm business={business} />
}

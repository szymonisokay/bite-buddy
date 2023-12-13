import { redirect } from 'next/navigation'

import { BusinessGeneralForm } from '@/components/forms/business-general-form'
import { db } from '@/lib/db'

type Props = {
	businessId: string
}

export const BusinessGeneralTab = async ({ businessId }: Props) => {
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

	const menu = await db.menu.findFirst({
		where: {
			businessId,
		},
	})

	return <BusinessGeneralForm business={business} menu={menu} />
}

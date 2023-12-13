import { redirect } from 'next/navigation'

import { BusinessInformationForm } from '@/components/forms/business-information-form'
import { Heading } from '@/components/heading'
import { db } from '@/lib/db'

type Props = {
	businessId?: string
}

export const BusinessInformationTab = async ({ businessId }: Props) => {
	const business = await db.business.findUnique({
		where: {
			id: businessId,
		},
	})

	if (!business) {
		return redirect('/business')
	}

	return (
		<>
			<BusinessInformationForm business={business} />

			<Heading
				border
				title='Owner information'
				description='Basic information about the owner of the business'
				className='mt-4'
			/>
		</>
	)
}

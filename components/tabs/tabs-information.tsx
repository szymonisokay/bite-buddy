'use client'

import { BusinessAvatar } from '@/components/business/business-avatar'
import { BusinessInformationForm } from '@/components/forms/business-information-form'
import { Heading } from '@/components/heading'
import { BusinessWithOwner } from '@/types'

type Props = {
	business: BusinessWithOwner
}

export const Tabsinformation = ({ business }: Props) => {
	return (
		<>
			<BusinessInformationForm business={business} />

			<div className='mt-4' />
			<Heading
				border
				title='Owner information'
				description='Basic information about the owner of the business'
			/>
			<BusinessAvatar user={business.owner} />
		</>
	)
}

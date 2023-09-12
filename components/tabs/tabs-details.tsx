import { Business } from '@prisma/client'

import { BusinessDetailsForm } from '@/components/forms/business-details-form'

type Props = {
	business: Business
}

export const TabsDetails = ({ business }: Props) => {
	return <BusinessDetailsForm business={business} />
}

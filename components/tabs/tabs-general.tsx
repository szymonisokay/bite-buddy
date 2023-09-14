import { Business } from '@prisma/client'

import { BusinessGeneralForm } from '@/components/forms/business-general-form'

type Props = {
	business: Business
}

export const TabsGeneral = ({ business }: Props) => {
	return <BusinessGeneralForm business={business} />
}

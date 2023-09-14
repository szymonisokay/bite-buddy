import { Meal } from '@prisma/client'

import { BusinessGeneralForm } from '@/components/forms/business-general-form'
import { BusinessWithOwnerWithLocation } from '@/types'

type Props = {
	business: BusinessWithOwnerWithLocation
	meals: Meal[]
}

export const TabsGeneral = async ({ business, meals }: Props) => {
	return <BusinessGeneralForm business={business} meals={meals} />
}

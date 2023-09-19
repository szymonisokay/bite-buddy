import { Menu } from '@prisma/client'

import { BusinessGeneralForm } from '@/components/forms/business-general-form'
import { BusinessWithOwnerWithLocation } from '@/types'

type Props = {
	business: BusinessWithOwnerWithLocation
	menu: Menu | null
}

export const TabsGeneral = async ({ business, menu }: Props) => {
	return <BusinessGeneralForm business={business} menu={menu} />
}

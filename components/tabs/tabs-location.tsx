import { BusinessLocationForm } from '@/components/forms/business-location-form'
import { BusinessWithOwnerWithLocation } from '@/types'

type Props = {
	business: BusinessWithOwnerWithLocation
}

export const TabsLocation = ({ business }: Props) => {
	return <BusinessLocationForm business={business} />
}

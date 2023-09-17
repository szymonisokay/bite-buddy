'use client'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Business } from '@prisma/client'
import { useParams } from 'next/navigation'

type Props = {
	businesses: Business[]
}

export const BusinessSelect = ({ businesses }: Props) => {
	const params = useParams()

	const selectedBusiness = businesses.find(
		(business) => business.id === params.businessId
	)

	return (
		<Select value={params.businessId as string}>
			<SelectTrigger
				title={selectedBusiness?.name}
				className='w-full business-select'
			>
				<SelectValue placeholder='Select business' />
			</SelectTrigger>
			<SelectContent className='max-h-[300px]'>
				{businesses.map((business) => (
					<SelectItem key={business.id} value={business.id}>
						{business.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}

'use server'

import { db } from '@/lib/db'
import { getProfile } from '@/lib/get-profile'
import { Location } from '@prisma/client'

export const updateBusinessLocation = async (
	businessId: string,
	location: Pick<
		Location,
		| 'street1'
		| 'street2'
		| 'city'
		| 'postalCode'
		| 'country'
		| 'latitude'
		| 'longitude'
		| 'deliveryRange'
	>
) => {
	try {
		const profile = await getProfile()

		if (!profile) {
			throw new Error('Not authenticated')
		}

		const business = await db.business.findFirst({
			where: {
				id: businessId,
			},
		})

		if (!business) {
			throw new Error('Business not found')
		}

		if (business.ownerId !== profile.id) {
			throw new Error('Not authorized')
		}

		await db.business.update({
			where: {
				id: business.id,
				ownerId: profile.id,
			},
			data: {
				location: {
					upsert: {
						create: location,
						update: location,
					},
				},
			},
		})

		return true
	} catch (error: any) {
		console.log('[UPDATE_BUSINESS_LOCATION]' + error)
		throw new Error(error.message)
	}
}

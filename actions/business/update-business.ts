'use server'

import { db } from '@/lib/db'
import { getProfile } from '@/lib/get-profile'
import { Business } from '@prisma/client'

export const updateBusiness = async (
	businessId: string,
	data: Partial<Business>
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
			data,
		})

		return true
	} catch (error: any) {
		console.log('[UPDATE_BUSINESS]' + error)
		throw new Error(error.message)
	}
}

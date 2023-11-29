'use server'

import { CreateBusinessFormValues } from '@/components/forms/create-business-form'
import { db } from '@/lib/db'
import { getProfile } from '@/lib/get-profile'

export const createBusiness = async (values: CreateBusinessFormValues) => {
	try {
		const profile = await getProfile()

		if (!profile) {
			throw new Error('Not authenticated')
		}

		if (!values.name) {
			throw new Error('Name for your business must be provided')
		}

		const business = await db.business.create({
			data: {
				...values,
				ownerId: profile.id,
			},
		})

		return business.id
	} catch (error: any) {
		console.log('[CREATE_BUSINESS]' + error)
		throw new Error(error.message)
	}
}

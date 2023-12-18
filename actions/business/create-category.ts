'use server'

import { MealCategory } from '@prisma/client'

import { db } from '@/lib/db'
import { getProfile } from '@/lib/get-profile'

export const createCategory = async (
	businessId: string,
	category: Pick<MealCategory, 'name' | 'description'>
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

		const categoryExists = await db.mealCategory.findFirst({
			where: {
				name: {
					contains: category.name,
				},
			},
		})

		if (!!categoryExists) {
			throw new Error('Category already exists')
		}

		const newCategory = await db.mealCategory.create({
			data: { ...category, businessId },
		})

		return newCategory.id
	} catch (error: any) {
		console.log('[CREATE_CATEGORY]', error)
		throw new Error(error.message)
	}
}

import { NextResponse } from 'next/server'

import { getUser } from '@/lib/get-user'
import { prismadb } from '@/lib/prisma'

export async function POST(
	req: Request,
	{ params }: { params: { businessId: string } }
) {
	try {
		const user = getUser()

		if (!user) {
			return new NextResponse('Unathorized', { status: 401 })
		}

		const { name, description, category, price } = await req.json()

		if (!name || !category || !price) {
			return new NextResponse('Required fields must be provided', {
				status: 400,
			})
		}

		const meal = await prismadb.meal.create({
			data: {
				name,
				description,
				category,
				price: Number(price),
				businessId: params.businessId,
			},
		})

		if (!meal) {
			return new NextResponse('Meal could not be created', {
				status: 400,
			})
		}

		return NextResponse.json(meal.id)
	} catch (error) {
		console.log('[MEALS_POST]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

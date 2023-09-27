import { NextResponse } from 'next/server'

import { getUser } from '@/lib/get-user'
import { prismadb } from '@/lib/prisma'

type Params = {
	businessId: string
	mealId: string
}

export async function PUT(req: Request, { params }: { params: Params }) {
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

		await prismadb.meal.update({
			where: {
				id: params.mealId,
			},
			data: {
				name,
				description,
				category,
				price: Number(price),
			},
		})

		return NextResponse.json(true)
	} catch (error) {
		console.log('[MEALS_PUT]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

export async function DELETE(req: Request, { params }: { params: Params }) {
	try {
		const user = getUser()

		if (!user) {
			return new NextResponse('Unathorized', { status: 401 })
		}

		await prismadb.meal.delete({
			where: {
				id: params.mealId,
			},
		})

		return NextResponse.json(true)
	} catch (error) {
		console.log('[MEALS_DELETE]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

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

		const { active, featured } = await req.json()

		await prismadb.meal.update({
			where: {
				id: params.mealId,
			},
			data: {
				active,
				featured,
			},
		})

		return NextResponse.json(true)
	} catch (error) {
		console.log('[MEALS_PUT]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

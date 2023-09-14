import { getUser } from '@/lib/get-user'
import { prismadb } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PUT(
	req: Request,
	{ params }: { params: { businessId: string } }
) {
	try {
		const user = await getUser()

		if (!user) {
			return new NextResponse('Unathorized', { status: 401 })
		}

		const {
			name,
			bio,
			openHour,
			closeHour,
			deliveryHourStart,
			deliveryHourEnd,
			category,
			visibleInApp,
		} = await req.json()

		const business = await prismadb.business.update({
			where: {
				id: params.businessId,
				ownerId: user.id,
			},
			data: {
				name,
				bio,
				openHour,
				closeHour,
				deliveryHourStart,
				deliveryHourEnd,
				category,
				visibleInApp,
			},
		})

		return NextResponse.json(business)
	} catch (error) {
		console.log('[BUSINESSID_PUT]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

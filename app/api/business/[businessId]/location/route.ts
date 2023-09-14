import { NextResponse } from 'next/server'

import { getUser } from '@/lib/get-user'
import { prismadb } from '@/lib/prisma'

export async function PUT(
	req: Request,
	{ params }: { params: { businessId: string } }
) {
	try {
		const user = await getUser()

		if (!user) {
			return new NextResponse('Unathorized', { status: 401 })
		}

		const { location, ...data } = await req.json()

		await prismadb.business.update({
			where: {
				id: params.businessId,
				ownerId: user.id,
			},
			data: {
				location: {
					upsert: {
						update: {
							...data,
						},
						create: {
							...data,
						},
					},
				},
			},
		})

		return NextResponse.json(true)
	} catch (error) {
		console.log('[BUSINESSID_LOCATION_PUT]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

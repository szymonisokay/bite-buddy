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
			return new NextResponse('Unauthorized', { status: 401 })
		}

		const menu = await prismadb.menu.findUnique({
			where: {
				businessId: params.businessId,
			},
		})

		if (menu) {
			return new NextResponse(
				'You can have only one menu active in the business',
				{ status: 400 }
			)
		}

		await prismadb.menu.create({
			data: {
				businessId: params.businessId,
			},
		})

		return NextResponse.json(true)
	} catch (error) {
		return new NextResponse('Internal error', { status: 500 })
	}
}

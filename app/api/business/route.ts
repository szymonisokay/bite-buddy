import { NextResponse } from 'next/server'

import { getUser } from '@/lib/get-user'
import { prismadb } from '@/lib/prisma'

export async function POST(req: Request) {
	try {
		const user = await getUser()

		if (!user) {
			return new NextResponse('Unathorized', { status: 401 })
		}

		const { name, bio } = await req.json()

		if (!name) {
			return new NextResponse('Name is required', { status: 400 })
		}

		const business = await prismadb.business.create({
			data: {
				name,
				bio,
				ownerId: user.id,
			},
		})

		return NextResponse.json(business)
	} catch (error) {
		console.log('[BUSINESS_POST]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

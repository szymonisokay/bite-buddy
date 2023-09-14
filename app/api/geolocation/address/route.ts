import { NextResponse } from 'next/server'
import qs from 'query-string'

import { getUser } from '@/lib/get-user'

export async function POST(req: Request) {
	try {
		const user = await getUser()

		if (!user) {
			return new NextResponse('Unathorized', { status: 401 })
		}

		const { city, street1, street2, postalCode } = await req.json()

		const url = qs.stringifyUrl(
			{
				url: 'https://nominatim.openstreetmap.org/search',
				query: {
					city,
					street: street1 ? `${street1} ${street2}` : '',
					postalCode,
					format: 'json',
				},
			},
			{ skipNull: true }
		)

		const response = await fetch(url)
		const location = await response.json()

		if (!location.length) {
			return new NextResponse('Invalid address', { status: 400 })
		}

		return NextResponse.json({
			longitude: +location[0].lon,
			latitude: +location[0].lat,
		})
	} catch (error) {
		console.log('[GEOLOCATION_ADDRESS', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

'use server'

import { Location } from '@prisma/client'
import qs from 'query-string'

import { getProfile } from '@/lib/get-profile'

export const getLocationByAddress = async ({
	street1,
	street2,
	city,
	postalCode,
}: Pick<Location, 'street1' | 'street2' | 'city' | 'postalCode'>) => {
	try {
		const profile = await getProfile()

		if (!profile) {
			throw new Error('Not authenticated')
		}

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

		const location = await (await fetch(url)).json()

		if (!location.length) {
			throw new Error('Invalid address')
		}

		return {
			longitude: Number(location[0].lon),
			latitude: Number(location[0].lat),
		}
	} catch (error: any) {
		console.log('[GEOLOCATION_ADDRESS', error)
		throw new Error(error.message)
	}
}

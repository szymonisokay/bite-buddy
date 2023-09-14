import axios from 'axios'

export const getLocationByAddress = async (data: any) => {
	const response = await axios.post('/api/geolocation/address', data)

	return response.data as { longitude: number; latitude: number }
}

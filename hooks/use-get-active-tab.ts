'use client'

import { useSearchParams } from 'next/navigation'

export const useGetActiveTab = () => {
	const searchParams = useSearchParams()

	const tab = searchParams.get('tab') || ''

	return tab
}

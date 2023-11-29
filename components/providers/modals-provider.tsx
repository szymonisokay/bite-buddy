'use client'

import { useMounted } from '@/hooks/use-mounted'

export const ModalsProvider = () => {
	const { mounted } = useMounted()

	if (!mounted) {
		return null
	}

	return <></>
}

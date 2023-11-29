'use client'

import { CreateInitialBusinessModal } from '@/components/modals/create-business-modal'
import { useEffect, useState } from 'react'

export const ModalsProvider = () => {
	const [mounted, setMounted] = useState<boolean>(false)

	useEffect(() => {
		setMounted(true)
	})

	if (!mounted) {
		return null
	}

	return (
		<>
			<CreateInitialBusinessModal />
		</>
	)
}

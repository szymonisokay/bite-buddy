'use client'

import { useSelectedLayoutSegments } from 'next/navigation'

export const PageHeading = () => {
	const segments = useSelectedLayoutSegments()

	return (
		<div className='pb-4 text-xl font-extrabold capitalize'>
			{segments[1] || 'Dashboard'}
		</div>
	)
}

'use client'

import { useEffect, useState } from 'react'

export const useWindowResize = () => {
	const [width, setWidth] = useState<number>(0)

	useEffect(() => {
		const onWindowResize = () => {
			setWidth(window.innerWidth)
		}

		window.addEventListener('resize', onWindowResize)

		return () => {
			window.removeEventListener('resize', onWindowResize)
		}
	}, [])

	return width
}

'use client'

import { StoreIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const NavigationAction = () => {
	const router = useRouter()

	return (
		<button
			onClick={() => router.push('/create-business')}
			className='flex items-center px-4 py-2 duration-200 border rounded-md cursor-pointer hover:bg-muted'
		>
			<StoreIcon className='w-5 h-5' />
			<div className='flex flex-col ml-4 text-left'>
				<p className='font-semibold tracking-tight'>Start business</p>
				<p className='text-xs text-muted-foreground'>
					Deliver from your own restaurant
				</p>
			</div>
		</button>
	)
}

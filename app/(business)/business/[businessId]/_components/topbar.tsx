'use client'

import { MenuIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useMobileSidebar } from '@/hooks/use-mobile-sidebar'

export const TopBar = () => {
	const { setOpen } = useMobileSidebar()

	return (
		<header className='flex w-full p-4 border-b'>
			<Button
				onClick={setOpen}
				variant='ghost'
				size='sm'
				className='block md:hidden'
			>
				<MenuIcon className='w-5 h-5' />
			</Button>
			{/* TODO: search component */}

			<div className='ml-auto'>
				{/* <Suspense fallback={<UserProfile.Skeleton />}>
					<UserProfile />
				</Suspense> */}
				topbar
			</div>
		</header>
	)
}

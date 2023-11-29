import { Suspense } from 'react'

import { UserProfile } from './user-profile'

export const TopBar = () => {
	return (
		<header className='flex w-full p-4 border-b'>
			{/* TODO: search component */}

			<div className='ml-auto'>
				<Suspense fallback={<UserProfile.Skeleton />}>
					<UserProfile />
				</Suspense>
			</div>
		</header>
	)
}

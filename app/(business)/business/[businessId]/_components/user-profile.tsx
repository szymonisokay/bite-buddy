import Image from 'next/image'

import { Skeleton } from '@/components/ui/skeleton'
import { getProfile } from '@/lib/get-profile'

export const UserProfile = async () => {
	const profile = await getProfile()

	return (
		<div className='flex items-center gap-3'>
			<div className='relative w-8 h-8'>
				<Image
					fill
					src={profile?.imageUrl || ''}
					alt={profile?.name || ''}
					className='rounded-md'
				/>
			</div>
		</div>
	)
}

const UserProfileSkeleton = () => {
	return <Skeleton className='w-8 h-8 rounded-md' />
}

UserProfile.Skeleton = UserProfileSkeleton

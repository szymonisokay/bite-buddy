import { ChevronDownIcon } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { getProfile } from '@/lib/get-profile'

export const UserProfile = async () => {
	const profile = await getProfile()

	return (
		<div className='flex items-center gap-3 py-4 w-[268px]'>
			<div className='relative w-9 h-9 shrink-0'>
				<Image
					fill
					src={profile?.imageUrl || ''}
					alt={profile?.name || ''}
					className='rounded-full'
					sizes='40px'
				/>
			</div>
			<div className='flex-1 truncate'>
				<p className='font-semibold leading-tight text-primary'>
					{profile?.name}
				</p>
				<p className='text-xs truncate text-muted-foreground'>
					{profile?.email}
				</p>
			</div>

			<Button variant='ghost' size='sm' className='w-8 h-8 px-0 shrink-0'>
				<ChevronDownIcon className='w-4 h-4 text-muted-foreground' />
			</Button>
		</div>
	)
}

const UserProfileSkeleton = () => {
	return (
		<div className='flex gap-3 py-4'>
			<Skeleton className='rounded-full w-9 h-9' />

			<div className='flex-1 space-y-1'>
				<Skeleton className='w-2/3 h-4' />
				<Skeleton className='w-4/5 h-2' />
			</div>
		</div>
	)
}

UserProfile.Skeleton = UserProfileSkeleton

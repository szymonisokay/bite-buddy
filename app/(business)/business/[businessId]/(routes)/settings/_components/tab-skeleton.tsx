import { Skeleton } from '@/components/ui/skeleton'

export const TabSkeleton = () => {
	return (
		<div className='w-full mt-4'>
			<div className='space-y-1'>
				<Skeleton className='w-1/3 h-5' />
				<Skeleton className='w-2/4 h-4' />
			</div>

			<div className='mt-8 space-y-1'>
				<Skeleton className='w-20 h-5' />
				<Skeleton className='w-full h-10' />
			</div>

			<div className='mt-4 space-y-1'>
				<Skeleton className='w-20 h-5' />
				<Skeleton className='w-full h-10' />
			</div>
		</div>
	)
}

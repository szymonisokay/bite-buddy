'use client'

import { ArrowLeft, BellIcon, LogOutIcon } from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'

import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'
import { checkForUuid } from '../../lib/check-uuid'

type Props = {
	title: string
	description?: string
}

export const BusinessTopBar = ({ title, description }: Props) => {
	const router = useRouter()
	const params = useParams()
	const pathname = usePathname()

	const isDashboard = checkForUuid(pathname.split('/').pop() ?? '')

	return (
		<div className='p-4 pt-6 pl-0 flex items-center fixed top-0 right-0 w-full md:w-[calc(100%-250px)] backdrop-blur z-10'>
			<div className='flex gap-x-2'>
				{!isDashboard && (
					<Button
						onClick={() => router.back()}
						variant='ghost'
						size='icon'
					>
						<ArrowLeft />
					</Button>
				)}
				<Heading title={title} description={description} />
			</div>

			<div className='flex items-center ml-auto gap-x-2'>
				<Button size='icon' variant='ghost'>
					<BellIcon className='w-4 h-4' />
				</Button>

				<Button size='icon' variant='outline'>
					<LogOutIcon className='w-4 h-4' />
				</Button>
			</div>
		</div>
	)
}

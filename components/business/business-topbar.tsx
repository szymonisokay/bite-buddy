import { redirectToSignIn } from '@clerk/nextjs'
import { BellIcon, LogOutIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { getUser } from '@/lib/get-user'

import { BusinessBreadcrumbs } from './business-breadcrumbs'

export const BusinessTopBar = async () => {
	const user = await getUser()

	if (!user) {
		return redirectToSignIn()
	}

	return (
		<div className='h-[68px] p-4 flex items-center border-b fixed w-full md:w-[calc(100%-250px)] backdrop-blur z-10'>
			<BusinessBreadcrumbs />

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

import { redirectToSignIn } from '@clerk/nextjs'
import { BellIcon, LogOutIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { getUser } from '@/lib/get-user'
import { prismadb } from '@/lib/prisma'

import { BusinessBreadcrumbs } from './business-breadcrumbs'

export const BusinessTopBar = async () => {
	const user = await getUser()

	if (!user) {
		return redirectToSignIn()
	}

	const businesses = await prismadb.business.findMany({
		where: {
			ownerId: user.id,
		},
	})

	return (
		<div className='h-[68px] p-4 flex items-center border-b'>
			<BusinessBreadcrumbs businesses={businesses} />

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

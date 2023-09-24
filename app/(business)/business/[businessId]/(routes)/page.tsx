import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { BusinessTopBar } from '@/components/business/business-topbar'
import { getUser } from '@/lib/get-user'
import { prismadb } from '@/lib/prisma'

const BusinessIdPage = async ({
	params,
}: {
	params: {
		businessId: string
	}
}) => {
	const user = await getUser()

	if (!user) {
		return redirectToSignIn()
	}

	const business = await prismadb.business.findUnique({
		where: {
			id: params.businessId,
			ownerId: user.id,
		},
	})

	if (!business) {
		return redirect('/')
	}

	return (
		<div className='p-4'>
			<BusinessTopBar
				title='Dashboard'
				description='Overview of your business'
			/>
			{business.name}
		</div>
	)
}

export default BusinessIdPage

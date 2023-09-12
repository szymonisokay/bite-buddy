import { redirectToSignIn } from '@clerk/nextjs'

import { getUser } from '@/lib/get-user'
import { prismadb } from '@/lib/prisma'
import { redirect } from 'next/navigation'

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

	return <div className='p-4'>{business.name}</div>
}

export default BusinessIdPage

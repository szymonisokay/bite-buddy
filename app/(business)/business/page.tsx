import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { getUser } from '@/lib/get-user'
import { prismadb } from '@/lib/prisma'

const BusinessPage = async () => {
	const user = await getUser()

	if (!user) {
		return redirectToSignIn()
	}

	const business = await prismadb.business.findFirst({
		where: {
			ownerId: user.id,
		},
	})

	if (!business) {
		return redirect('/')
	}

	return redirect(`/business/${business.id}`)
}

export default BusinessPage

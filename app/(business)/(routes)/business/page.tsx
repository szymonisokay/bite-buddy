import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { InitialBusinessForm } from '@/components/forms/initial-business-form'
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { createUser } from '@/lib/create-user'
import { getUser } from '@/lib/get-user'
import { prisma } from '@/lib/prisma'

const BusinessPage = async () => {
	await createUser()

	const user = await getUser()

	if (!user) {
		return redirectToSignIn()
	}

	const business = await prisma.business.findUnique({
		where: {
			ownerId: user.id,
		},
	})

	if (business) {
		return redirect(`/business/${business.id}`)
	}

	return (
		<div className='flex items-center justify-center h-full'>
			<Card className='max-w-[400px]'>
				<CardHeader>
					<CardTitle className='text-xl'>
						Welcome to BiteBuddy!
					</CardTitle>
					<CardDescription>
						Fill in necessary information of Your company and start
						delivering via our app.
					</CardDescription>
				</CardHeader>
				<InitialBusinessForm />
			</Card>
		</div>
	)
}

export default BusinessPage

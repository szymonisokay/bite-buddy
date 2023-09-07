import { currentUser } from '@clerk/nextjs'

import { prisma } from '@/lib/prisma'

export const createUser = async () => {
	const clerkUser = await currentUser()

	if (!clerkUser) return null

	const user = await prisma.user.findUnique({
		where: {
			userId: clerkUser.id,
		},
	})

	if (user) {
		return user
	}

	const newUser = await prisma.user.create({
		data: {
			userId: clerkUser.id,
			name: `${clerkUser.firstName} ${clerkUser.lastName}`,
			email: clerkUser.emailAddresses[0].emailAddress,
			imageUrl: clerkUser.imageUrl,
		},
	})

	return newUser
}

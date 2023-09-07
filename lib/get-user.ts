import { auth } from '@clerk/nextjs'

import { prisma } from '@/lib/prisma'

export const getUser = async () => {
	const { userId } = auth()

	if (!userId) {
		return null
	}

	const user = await prisma.user.findUnique({
		where: {
			userId,
		},
	})

	return user
}

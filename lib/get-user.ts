import { auth } from '@clerk/nextjs'

import { prismadb } from '@/lib/prisma'

export const getUser = async () => {
	const { userId } = auth()

	if (!userId) {
		return null
	}

	const user = await prismadb.user.findUnique({
		where: {
			userId,
		},
	})

	return user
}

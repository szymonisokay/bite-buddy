import { PrismaClient } from '@prisma/client'

declare global {
	var prismadb: PrismaClient | undefined
}

export const prismadb = globalThis.prismadb || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
	globalThis.prismadb = prismadb
}

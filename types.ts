import { Business, Location, User } from '@prisma/client'

export type NavigationItem = {
	label: string
	href: string
}

export type BusinessWithOwner = Business & {
	owner: User
}

export type BusinessWithOwnerWithLocation = BusinessWithOwner & {
	location: Location | null
}

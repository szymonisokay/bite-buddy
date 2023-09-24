import { redirectToSignIn } from '@clerk/nextjs'

import { BusinessTopBar } from '@/components/business/business-topbar'
import { Empty } from '@/components/empty'
import { MenuActionsTopbar } from '@/components/menu/menu-actions-topbar'
import { getUser } from '@/lib/get-user'
import { prismadb } from '@/lib/prisma'

const MenuPage = async ({ params }: { params: { businessId: string } }) => {
	const user = await getUser()

	if (!user) {
		return redirectToSignIn()
	}

	const menu = await prismadb.menu.findUnique({
		where: {
			businessId: params.businessId,
		},
	})

	const meals = await prismadb.meal.findMany({
		where: {
			businessId: params.businessId,
		},
	})

	return (
		<>
			<BusinessTopBar
				title='Menu'
				description='Manage your active menu and meals'
			/>

			<MenuActionsTopbar menu={menu} />

			{!menu && (
				<Empty
					title='It seems like you have no active menu'
					description='Create one right now'
					actionLabel='Create your first menu'
					href='menu/create'
				/>
			)}

			{menu && !meals.length && (
				<Empty
					title='You have no created meals'
					actionLabel='Create your first meal'
					href='meals'
				/>
			)}
		</>
	)
}

export default MenuPage

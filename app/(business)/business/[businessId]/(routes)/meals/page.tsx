import { redirectToSignIn } from '@clerk/nextjs'

import { BusinessTopBar } from '@/components/business/business-topbar'
import { getUser } from '@/lib/get-user'
import { prismadb } from '@/lib/prisma'

import { ActionsTopbar } from './_components/ActionsTopbar'
import { columns } from './columns'
import { DataTable } from './data-table'

const MealsPage = async ({ params }: { params: { businessId: string } }) => {
	const user = getUser()

	if (!user) {
		return redirectToSignIn()
	}

	const meals = await prismadb.meal.findMany({
		where: {
			businessId: params.businessId,
		},
	})

	return (
		<>
			<BusinessTopBar title='Meals' description='Manage your meals' />

			<ActionsTopbar />

			<div className='mt-4'>
				<DataTable columns={columns} data={meals} />
			</div>
		</>
	)
}

export default MealsPage

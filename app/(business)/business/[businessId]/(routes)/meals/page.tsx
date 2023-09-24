import { BusinessTopBar } from '@/components/business/business-topbar'

import { ActionsTopbar } from './_components/ActionsTopbar'

const MealsPage = () => {
	return (
		<>
			<BusinessTopBar title='Meals' description='Manage your meals' />

			<ActionsTopbar />
		</>
	)
}

export default MealsPage

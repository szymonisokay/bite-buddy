import { BusinessTopBar } from '@/components/business/business-topbar'
import { Button } from '../../../../../../components/ui/button'

const MenuPage = () => {
	return (
		<>
			<BusinessTopBar
				title='Menu'
				description='Manage your active menu and meals'
			/>

			<Button className='self-end' variant='primary'>
				Create meal
			</Button>
		</>
	)
}

export default MenuPage

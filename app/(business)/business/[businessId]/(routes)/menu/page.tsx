import { Heading } from '@/components/heading'
import { MenuTabs } from '@/components/menu/menu-tabs'

const MenuPage = () => {
	return (
		<>
			<Heading
				border
				title='Menu'
				description='Manage your active menu and meals'
			/>

			<MenuTabs />
		</>
	)
}

export default MenuPage

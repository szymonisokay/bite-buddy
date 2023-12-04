import { Sidebar } from './_components/sidebar'
import { TopBar } from './_components/topbar'

type Params = {
	children: React.ReactNode
}

const BusinessIdLayout = ({ children }: Params) => {
	return (
		<div className='flex h-full bg-neutral-50'>
			<Sidebar />
			<div className='flex flex-col flex-1 bg-white rounded-md md:m-4 md:ml-0 md:shadow-sm'>
				<TopBar />

				<main className='flex-1 p-4 overflow-y-auto'>{children}</main>
			</div>
		</div>
	)
}

export default BusinessIdLayout

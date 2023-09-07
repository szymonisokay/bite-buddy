import { Sidebar } from '@/components/navigation/sidebar'
import { currentUser } from '@clerk/nextjs'

export const Topbar = async () => {
	const user = await currentUser()

	return (
		<div className='flex items-center px-4 py-3 border-b'>
			<Sidebar user={user} />
		</div>
	)
}

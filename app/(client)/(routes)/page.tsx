import { createUser } from '@/lib/create-user'
import { UserButton } from '@clerk/nextjs'

const LandingPage = async () => {
	await createUser()

	return (
		<div className='space-y-4'>
			<UserButton afterSignOutUrl='/' />
		</div>
	)
}

export default LandingPage

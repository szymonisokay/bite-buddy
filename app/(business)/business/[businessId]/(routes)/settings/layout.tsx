import { Suspense } from 'react'

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Suspense fallback={<p>Loading</p>}>{children}</Suspense>
		</>
	)
}

export default SettingsLayout

import { Topbar } from '@/components/navigation/topbar'

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<Topbar />
			{children}
		</div>
	)
}

export default LandingLayout

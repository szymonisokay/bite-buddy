import { TopBar } from './_components/topbar'

type Params = {
	children: React.ReactNode
}

const BusinessIdLayout = ({ children }: Params) => {
	return (
		<div>
			<TopBar />

			<main>{children}</main>
		</div>
	)
}

export default BusinessIdLayout

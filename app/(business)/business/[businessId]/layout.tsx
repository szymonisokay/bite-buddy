import { BusinessSidebar } from '@/components/business/business-sidebar'
import { BusinessTopBar } from '@/components/business/business-topbar'

const BusinessLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex h-full'>
			<BusinessSidebar />
			<main className='flex-1'>
				<BusinessTopBar />
				<section className='p-4'>{children}</section>
			</main>
		</div>
	)
}

export default BusinessLayout

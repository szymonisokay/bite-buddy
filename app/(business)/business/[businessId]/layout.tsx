import { BusinessSidebar } from '@/components/business/business-sidebar'
import { BusinessTopBar } from '@/components/business/business-topbar'
import { ScrollArea } from '@/components/ui/scroll-area'

const BusinessLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex h-full'>
			<BusinessSidebar />
			<main className='flex-1 w-full'>
				<ScrollArea className='w-full h-full'>
					<BusinessTopBar />
					<section className='p-4 pt-[84px]'>{children}</section>
				</ScrollArea>
			</main>
		</div>
	)
}

export default BusinessLayout

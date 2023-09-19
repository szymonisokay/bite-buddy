import { BusinessSidebar } from '@/components/business/business-sidebar'
import { ScrollArea } from '@/components/ui/scroll-area'

const BusinessLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex h-full'>
			<BusinessSidebar />
			<main className='flex-1 w-full'>
				<ScrollArea className='w-full h-full'>
					<section className='pt-[84px] h-full'>
						<div className='bg-white dark:bg-[#09090b] p-4 m-4 mt-0 ml-0 rounded-md h-[calc(100%-16px)]'>
							{children}
						</div>
					</section>
				</ScrollArea>
			</main>
		</div>
	)
}

export default BusinessLayout

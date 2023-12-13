import { Suspense } from 'react'

import { BusinessDetailsTab } from '@/components/tabs/business-details-tab'
import { BusinessGeneralTab } from '@/components/tabs/business-general-tab'
import { BusinessInformationTab } from '@/components/tabs/business-information-tab'
import { BusinessLocationTab } from '@/components/tabs/business-location-tab'
import { Tabs, TabsContent } from '@/components/ui/tabs'

import { SettingsTabsList } from './_components/settings-tabs-list'
import { TabSkeleton } from './_components/tab-skeleton'

type Params = {
	searchParams: {
		tab: string
	}
	params: {
		businessId: string
	}
}

const SettingsPage = ({ searchParams, params }: Params) => {
	const defaultValue = searchParams.tab || 'information'

	return (
		<Tabs defaultValue={defaultValue}>
			<SettingsTabsList />
			<TabsContent value='information'>
				<Suspense fallback={<TabSkeleton />}>
					<BusinessInformationTab businessId={params.businessId} />
				</Suspense>
			</TabsContent>
			<TabsContent value='details'>
				<Suspense fallback={<TabSkeleton />}>
					<BusinessDetailsTab businessId={params.businessId} />
				</Suspense>
			</TabsContent>
			<TabsContent value='location'>
				<Suspense fallback={<TabSkeleton />}>
					<BusinessLocationTab businessId={params.businessId} />
				</Suspense>
			</TabsContent>
			<TabsContent value='general'>
				<Suspense fallback={<TabSkeleton />}>
					<BusinessGeneralTab businessId={params.businessId} />
				</Suspense>
			</TabsContent>
		</Tabs>
	)
}

export default SettingsPage

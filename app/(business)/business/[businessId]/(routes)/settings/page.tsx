import { Suspense } from 'react'

import { BusinessInformationTab } from '@/components/tabs/business-information-tab'
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
			<TabsContent value='details'>hello</TabsContent>
		</Tabs>
	)
}

export default SettingsPage

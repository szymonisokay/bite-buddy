import { prismadb } from '@/lib/prisma'
import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { BusinessTopBar } from '@/components/business/business-topbar'
import { TabsDetails } from '@/components/tabs/tabs-details'
import { TabsGeneral } from '@/components/tabs/tabs-general'
import { Tabsinformation } from '@/components/tabs/tabs-information'
import { TabsLocation } from '@/components/tabs/tabs-location'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getUser } from '@/lib/get-user'

const BusinessSettingsPage = async ({
	params,
}: {
	params: { businessId: string }
}) => {
	const user = await getUser()

	if (!user) {
		return redirectToSignIn()
	}

	const business = await prismadb.business.findUnique({
		where: {
			id: params.businessId,
			ownerId: user.id,
		},
		include: {
			owner: true,
			location: true,
		},
	})

	if (!business) {
		return redirect('/')
	}

	const menu = await prismadb.menu.findUnique({
		where: {
			businessId: params.businessId,
		},
	})

	return (
		<>
			<BusinessTopBar
				title='Settings'
				description='Manage your business settings'
			/>
			<Tabs defaultValue='information'>
				<TabsList>
					<TabsTrigger value='information'>Information</TabsTrigger>
					<TabsTrigger value='details'>Details</TabsTrigger>
					<TabsTrigger value='location'>Location</TabsTrigger>
					<TabsTrigger value='general'>General</TabsTrigger>
				</TabsList>
				<TabsContent value='information'>
					<Tabsinformation business={business} />
				</TabsContent>
				<TabsContent value='details'>
					<TabsDetails business={business} />
				</TabsContent>
				<TabsContent value='location'>
					<TabsLocation business={business} />
				</TabsContent>
				<TabsContent value='general'>
					<TabsGeneral business={business} menu={menu} />
				</TabsContent>
			</Tabs>
		</>
	)
}

export default BusinessSettingsPage

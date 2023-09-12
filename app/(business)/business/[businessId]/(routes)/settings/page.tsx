import { prismadb } from '@/lib/prisma'
import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { TabsDetails } from '@/components/tabs/tabs-details'
import { Tabsinformation } from '@/components/tabs/tabs-information'
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

	return (
		<>
			<Tabs defaultValue='information'>
				<TabsList>
					<TabsTrigger value='information'>Information</TabsTrigger>
					<TabsTrigger value='details'>Details</TabsTrigger>
					<TabsTrigger value='location'>Location</TabsTrigger>
				</TabsList>
				<TabsContent value='information'>
					<Tabsinformation business={business} />
				</TabsContent>
				<TabsContent value='details'>
					<TabsDetails business={business} />
				</TabsContent>
			</Tabs>
		</>
	)
}

export default BusinessSettingsPage

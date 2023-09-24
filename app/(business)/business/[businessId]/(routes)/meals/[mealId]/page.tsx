import { BusinessTopBar } from '@/components/business/business-topbar'
import { MealInformationForm } from '@/components/forms/meal-information-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { prismadb } from '@/lib/prisma'
import { MealSettingsForm } from '../../../../../../../components/forms/meal-settings-form'

type Params = {
	businessId: string
	mealId: string
}

const MealIdPage = async ({ params }: { params: Params }) => {
	const meal = await prismadb.meal.findUnique({
		where: {
			id: params.mealId,
			businessId: params.businessId,
		},
	})

	return (
		<>
			<BusinessTopBar
				title='Create meal'
				description='Fill in all required fields'
			/>

			<Tabs defaultValue='info'>
				<TabsList>
					<TabsTrigger value='info'>Information</TabsTrigger>
					{/* {meal && ( */}
					<TabsTrigger value='settings'>Settings</TabsTrigger>
					{/* )} */}
				</TabsList>
				<TabsContent value='info'>
					<MealInformationForm meal={meal} />
				</TabsContent>
				<TabsContent value='settings'>
					<MealSettingsForm meal={meal} />
				</TabsContent>
			</Tabs>
		</>
	)
}

export default MealIdPage

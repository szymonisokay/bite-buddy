import { MealUpsertForm } from '@/components/forms/meal-upsert-form'
import { db } from '@/lib/db'

type Params = {
	businessId: string
	mealId: string
}

const MealPage = async ({ params }: { params: Params }) => {
	const { businessId, mealId } = params

	const meal = await db.meal.findFirst({
		where: {
			id: mealId,
			businessId,
		},
		include: {
			category: true,
		},
	})

	const categories = await db.mealCategory.findMany({
		where: {
			businessId,
		},
	})

	return (
		<div>
			<MealUpsertForm meal={meal} categories={categories} />
		</div>
	)
}

export default MealPage

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

	return (
		<div>
			<MealUpsertForm meal={meal} />
		</div>
	)
}

export default MealPage

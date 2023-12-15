'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Meal, MealCategory } from '@prisma/client'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { FormSwitch } from '@/components/form-switch'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
	name: z.string().min(3, { message: 'Please enter meal name' }),
	description: z.string().nullable(),
	price: z.number(),
	active: z.boolean(),
	featured: z.boolean(),
	categoryId: z.string(),
})

type FormValues = z.infer<typeof formSchema>

type Props = {
	meal:
		| (Meal & {
				category: MealCategory
		  })
		| null
}

export const MealUpsertForm = ({ meal }: Props) => {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: meal || {
			name: '',
			description: '',
			price: 0,
			active: false,
			featured: false,
			categoryId: '',
		},
	})

	const onSubmit = async (values: FormValues) => {
		console.log(values)
	}

	return (
		<Form {...form}>
			<form
				className='flex flex-col gap-4'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
					<div>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											value={field.value || ''}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='price'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Price</FormLabel>
									<FormControl>
										<Input
											{...field}
											onChange={(event) =>
												field.onChange(
													+event.target.value
												)
											}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>

					<div className=''>
						<FormField
							control={form.control}
							name='active'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<FormSwitch
											{...field}
											label='Active'
											description='Set visibility of this meal'
											// onChange={(value) =>
											// 	field.onChange(value)
											// }
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
				</div>

				<Button className='self-end'>Create meal</Button>
			</form>
		</Form>
	)
}

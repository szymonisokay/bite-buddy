'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Meal, MealCategory } from '@prisma/client'
import { StarIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { CategoryCommand } from '@/components/category-command'
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
	categories: MealCategory[]
}

export const MealUpsertForm = ({ meal, categories }: Props) => {
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
					<div className='space-y-1'>
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

						<FormField
							control={form.control}
							name='categoryId'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<FormControl>
										<CategoryCommand
											{...field}
											categories={categories}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>

					<div className='space-y-4'>
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
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='featured'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<FormSwitch
											{...field}
											label='Featured'
											description='Feature this meal at the top of the menu'
											icon={StarIcon}
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

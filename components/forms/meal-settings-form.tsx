'use client'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Meal } from '@prisma/client'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Heading } from '../heading'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Switch } from '../ui/switch'

const formSchema = z.object({
	active: z.boolean(),
	featured: z.boolean(),
})

type FormValues = z.infer<typeof formSchema>

type Props = {
	meal: Meal | null
}

export const MealSettingsForm = ({ meal }: Props) => {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: meal || {
			active: false,
			featured: false,
		},
	})

	const onSubmit = async (values: FormValues) => {
		console.log(values)
	}

	return (
		<Form {...form}>
			<form
				className='flex flex-col mt-4 gap-y-4'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<Heading
					border
					title='General settings'
					description='Set visibility and featured status'
				/>

				<FormField
					control={form.control}
					name='active'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div className='flex items-center justify-between gap-4'>
									<Label
										className='max-w-xs'
										htmlFor='active'
									>
										<p className='text-base'>Meal active</p>
										<p className='text-sm font-normal leading-tight text-muted-foreground'>
											Set visibility of this meal. By
											turning this option on you will be
											able to assign this meal to your
											menu.
										</p>
									</Label>
									<Switch
										id='active'
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='featured'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div className='flex items-center justify-between gap-4'>
									<Label
										className='max-w-xs'
										htmlFor='featured'
									>
										<p className='text-base'>
											Meal featured
										</p>
										<p className='text-sm font-normal leading-tight text-muted-foreground'>
											If this meal is present in your
											menu, it will be visible in special
											category in the top area of the menu
											in BiteBuddy app.
										</p>
									</Label>
									<Switch
										id='featured'
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button variant='primary' className='self-end'>
					Update
				</Button>

				<Heading
					border
					title='Delete meal'
					description='You can permanenty delete this meal. When meal is present in menu, it will be also deleted from the menu.'
				/>

				<Button
					type='button'
					variant='destructive'
					className='self-end'
				>
					Delete
				</Button>
			</form>
		</Form>
	)
}

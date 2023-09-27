'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Meal } from '@prisma/client'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import axios from 'axios'
import { Loader2Icon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useModalStore } from '../../hooks/use-modal-store'

const formSchema = z.object({
	active: z.boolean(),
	featured: z.boolean(),
})

type FormValues = z.infer<typeof formSchema>

type Props = {
	meal: Meal | null
}

export const MealSettingsForm = ({ meal }: Props) => {
	const params = useParams()
	const router = useRouter()
	const { onOpen } = useModalStore()

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: meal || {
			active: false,
			featured: false,
		},
	})

	const loading = form.formState.isSubmitting

	const onSubmit = async (values: FormValues) => {
		try {
			await axios.put(
				`/api/business/${params.businessId}/meals/${meal?.id}/settings`,
				values
			)

			router.refresh()

			toast.success('Meal updated')
		} catch (error) {
			console.log(error)
		}
	}

	const onMealDelete = async () => {
		onOpen('confirmMealDelete', {
			confirm: {
				title: 'Are you sure you want to delete this meal?',
				description: 'This action will permanently delete this meal',
				apiUrl: `/api/business/${params.businessId}/meals/${meal?.id}`,
				redirectUrl: `/business/${params.businessId}/meals`,
			},
		})
		// try {
		// 	await axios.delete(
		// 		`/api/business/${params.businessId}/meals/${meal?.id}`
		// 	)

		// 	router.refresh()
		// 	router.push(`/business/${params.businessId}/meals`)
		// 	toast.success('Meal deleted')
		// } catch (error) {
		// 	console.log(error)
		// }
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
										disabled={loading}
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
										disabled={loading}
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					disabled={loading}
					variant='primary'
					className='self-end'
				>
					{loading && (
						<Loader2Icon className='w-4 h-4 mr-2 animate-spin' />
					)}
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
					disabled={loading}
					onClick={onMealDelete}
				>
					Delete
				</Button>
			</form>
		</Form>
	)
}

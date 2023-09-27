'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Meal } from '@prisma/client'
import { DollarSignIcon, Loader2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const formSchema = z.object({
	name: z.string().min(1, { message: 'Name must be provided' }),
	description: z.string().optional(),
	category: z.string().min(1, { message: 'Category must be provided' }),
	price: z
		.string()
		.nonempty({ message: 'Price must be provided' })
		.regex(/^\d{0,8}(\.\d{1,4})?$/, {
			message: 'Invalid price',
		}),
})

type FormValues = z.infer<typeof formSchema>

type Props = {
	meal: Meal | null
}

export const MealInformationForm = ({ meal }: Props) => {
	const params = useParams()
	const router = useRouter()

	const form = useForm<FormValues>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: meal?.name || '',
			description: meal?.description || '',
			category: meal?.category || '',
			price: String(meal?.price || '') || '',
		},
	})

	const loading = form.formState.isSubmitting

	const onSubmit = async (values: FormValues) => {
		try {
			if (meal?.id) {
				await axios.put(
					`/api/business/${params.businessId}/meals/${meal.id}`,
					values
				)

				router.refresh()
				toast.success('Meal updated')
			} else {
				const response = await axios.post<string>(
					`/api/business/${params.businessId}/meals`,
					values
				)

				router.replace(`${response.data}`)
				router.refresh()
				toast.success('Meal created')
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Form {...form}>
			<form
				className='flex flex-col mt-4 gap-y-4'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<Heading
					border
					title='Basic information'
					description='Information about the meal'
				/>

				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Meal name'
									disabled={loading}
								/>
							</FormControl>
							<FormMessage />
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
									placeholder='Meal description'
									value={field.value || ''}
									disabled={loading}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='category'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Category</FormLabel>
							<FormDescription>
								Meals will be divided into sections with this
								field as heading.
							</FormDescription>
							<FormControl>
								<Input
									{...field}
									placeholder='Category'
									disabled={loading}
								/>
							</FormControl>
							<FormMessage />
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
								<div className='relative'>
									<DollarSignIcon className='absolute w-4 h-4 text-muted-foreground top-[12px] left-2' />
									<Input
										{...field}
										className='pl-8'
										placeholder='Price'
										disabled={loading}
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

					{meal ? <span>Update</span> : <span>Create</span>}
				</Button>
			</form>
		</Form>
	)
}

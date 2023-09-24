'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Meal } from '@prisma/client'
import { DollarSignIcon } from 'lucide-react'
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

const formSchema = z.object({
	name: z.string().min(1),
	description: z.string().optional(),
	category: z.string().min(1),
	price: z.string().regex(/^\d{0,8}(\.\d{1,4})?$/, {
		message: 'Invalid price',
	}),
})

type FormValues = z.infer<typeof formSchema>

type Props = {
	meal: Meal | null
}

export const MealInformationForm = ({ meal }: Props) => {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			...meal,
			description: meal?.description || '',
			price: String(meal?.price || ''),
		} || {
			name: '',
			description: '',
			category: '',
			price: '',
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
								<Input {...field} placeholder='Meal name' />
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
								<Input {...field} placeholder='Category' />
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
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button variant='primary' className='self-end'>
					Create
				</Button>
			</form>
		</Form>
	)
}

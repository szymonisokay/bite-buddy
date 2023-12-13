'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Business } from '@prisma/client'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'

import { updateBusiness } from '@/actions/business/update-business'
import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { getTimeFrames } from '@/lib/time-frames'

const formSchema = z.object({
	openHour: z.string().nullable(),
	closeHour: z.string().nullable(),
	deliveryHourStart: z.string().nullable(),
	deliveryHourEnd: z.string().nullable(),
	category: z.string().nullable(),
})

type FormValues = z.infer<typeof formSchema>

type Props = {
	business: Business
}

export const BusinessDetailsForm = ({ business }: Props) => {
	const router = useRouter()
	const timeFrames = getTimeFrames()

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			openHour: business.openHour ?? '09:00 AM',
			closeHour: business.closeHour ?? '09:00 PM',
			deliveryHourStart: business.deliveryHourStart ?? '09:00 PM',
			deliveryHourEnd: business.deliveryHourEnd ?? '11:00 PM',
			category: business.category ?? '',
		},
	})

	const loading = form.formState.isSubmitting

	const onSubmit = async (values: FormValues) => {
		try {
			await updateBusiness(business.id, values)

			toast.success('Business details updated')
			router.refresh()
		} catch (error: any) {
			toast.error(error.message)
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
					title='Business details'
					description='Specify what time your restaurant is open and what are the delivering hours'
				/>

				<div className='grid grid-cols-1 gap-2 xs:grid-cols-2'>
					<FormField
						control={form.control}
						name='openHour'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-muted-foreground'>
									Opening hour
								</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										value={field.value ?? '09:00 AM'}
										defaultValue='09:00 AM'
										disabled={loading}
									>
										<SelectTrigger>
											<SelectValue placeholder='Select opening hour' />
										</SelectTrigger>
										<SelectContent className='max-h-[300px]'>
											{timeFrames.map((timeFrame, i) => (
												<SelectItem
													key={i}
													value={timeFrame}
												>
													{timeFrame}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='closeHour'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-muted-foreground'>
									Closing hour
								</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										value={field.value ?? '09:00 PM'}
										defaultValue='09:00 PM'
										disabled={loading}
									>
										<SelectTrigger>
											<SelectValue placeholder='Select opening hour' />
										</SelectTrigger>
										<SelectContent className='max-h-[300px]'>
											{timeFrames.map((timeFrame, i) => (
												<SelectItem
													key={i}
													value={timeFrame}
												>
													{timeFrame}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>

				<div className='grid grid-cols-1 gap-2 -mt-2 xs:mt-0 xs:grid-cols-2'>
					<FormField
						control={form.control}
						name='deliveryHourStart'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-muted-foreground'>
									Delivery start hour
								</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										value={field.value ?? '09:00 AM'}
										defaultValue='09:00 AM'
										disabled={loading}
									>
										<SelectTrigger>
											<SelectValue placeholder='Select opening hour' />
										</SelectTrigger>
										<SelectContent className='max-h-[300px]'>
											{timeFrames.map((timeFrame, i) => (
												<SelectItem
													key={i}
													value={timeFrame}
												>
													{timeFrame}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='deliveryHourEnd'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-muted-foreground'>
									Delivery end hour
								</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										value={field.value ?? '11:00 PM'}
										defaultValue='11:00 PM'
										disabled={loading}
									>
										<SelectTrigger>
											<SelectValue placeholder='Select opening hour' />
										</SelectTrigger>
										<SelectContent className='max-h-[300px]'>
											{timeFrames.map((timeFrame, i) => (
												<SelectItem
													key={i}
													value={timeFrame}
												>
													{timeFrame}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>

				<Heading
					border
					title='Business category'
					description='Specify what food you are delivering'
				/>

				<FormField
					control={form.control}
					name='category'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-muted-foreground'>
								Category
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Fastfood restaurant'
									value={field.value ?? ''}
									disabled={loading}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<Button
					variant='default'
					disabled={loading}
					className='self-end'
				>
					{loading && (
						<Loader2Icon className='w-4 h-4 mr-2 animate-spin' />
					)}
					Save
				</Button>
			</form>
		</Form>
	)
}

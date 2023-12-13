'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'

import { updateBusinessLocation } from '@/actions/business/update-business-location'
import { getLocationByAddress } from '@/actions/geolocation/location-by-address'
import { Heading } from '@/components/heading'
import { Map } from '@/components/map'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Business, Location } from '@prisma/client'

const formSchema = z.object({
	city: z.string().min(1),
	postalCode: z.string().min(1),
	street1: z.string().min(1),
	street2: z.string().nullable(),
	country: z.string().nullable(),
	location: z.object({
		longitude: z.number(),
		latitude: z.number(),
		deliveryRange: z.number(),
	}),
})

type FormValues = z.infer<typeof formSchema>

type Props = {
	business: Business & {
		location: Location | null
	}
}

export const BusinessLocationForm = ({ business }: Props) => {
	const router = useRouter()

	const businessLocation = business.location

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			city: businessLocation?.city || '',
			postalCode: businessLocation?.postalCode || '',
			street1: businessLocation?.street1 || '',
			street2: businessLocation?.street2 || '',
			country: businessLocation?.country || '',
			location: {
				longitude: businessLocation?.longitude || 0,
				latitude: businessLocation?.latitude || 0,
				deliveryRange: businessLocation?.deliveryRange || 15,
			},
		},
	})

	const loading = form.formState.isSubmitting
	const location = form.watch('location')

	const onSubmit = async (values: FormValues) => {
		try {
			const { location, ...data } = values

			await updateBusinessLocation(business.id, {
				...data,
				...location,
			})

			toast.success('Business location updated')
			router.refresh()
		} catch (error: any) {
			toast.error(error.message)
		}
	}

	const updateMarkerLocation = async () => {
		try {
			const { city, street1, street2, postalCode } = form.getValues()
			const position = await getLocationByAddress({
				city,
				street1,
				street2,
				postalCode,
			})

			form.setValue('location.latitude', position.latitude)
			form.setValue('location.longitude', position.longitude)
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
					title='Business location'
					description='Specify where your restaurant is located'
				/>

				<div className='grid grid-cols-1 gap-2 xs:grid-cols-2'>
					<FormField
						control={form.control}
						name='city'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-muted-foreground'>
									City
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder='City'
										disabled={loading}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='postalCode'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-muted-foreground'>
									Zip code
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder='Zip code'
										disabled={loading}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>

				<div className='grid grid-cols-1 gap-2 -mt-2 xs:mt-0 xs:grid-cols-2'>
					<FormField
						control={form.control}
						name='street1'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-muted-foreground'>
									Street
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder='Street'
										disabled={loading}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='street2'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-muted-foreground'>
									Street number
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder='Street number'
										value={field.value || ''}
										disabled={loading}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>

				<Button
					type='button'
					variant='default'
					disabled={loading}
					className='self-end'
					onClick={updateMarkerLocation}
				>
					Update marker location
				</Button>

				<Heading
					border
					title='Delivery radius'
					description='Specify where are you delivering'
				/>

				<FormField
					control={form.control}
					name='location'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div className='space-y-4'>
									<Map
										location={location}
										className='mb-4 overflow-hidden rounded-md'
									/>

									<div className='flex items-center gap-x-2'>
										<Slider
											defaultValue={[
												field.value?.deliveryRange ||
													15,
											]}
											onValueChange={(value) =>
												field.onChange({
													...field.value,
													deliveryRange: value[0],
												})
											}
											max={90}
											step={5}
										/>

										<span className='min-w-[70px] text-right'>
											+ {field.value?.deliveryRange} km
										</span>
									</div>
								</div>
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

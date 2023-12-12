'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Business } from '@prisma/client'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'

import { updateBusiness } from '@/actions/business/update-business'
import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
	name: z.string().min(1),
	bio: z.string().nullable(),
})

type FormValues = z.infer<typeof formSchema>

type Props = {
	business: Business
}

export const BusinessInformationForm = ({ business }: Props) => {
	const router = useRouter()

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: business || {
			name: '',
			bio: '',
		},
	})

	const loading = form.formState.isSubmitting

	const onSubmit = async (values: FormValues) => {
		try {
			await updateBusiness(business.id, values)

			toast.success('Business information updated')
			router.refresh()
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
					title='Business information'
					description='Basic information about your business'
				/>

				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-muted-foreground'>
								Name
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Business name'
									disabled={loading}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='bio'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-muted-foreground'>
								Bio
							</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									placeholder='Business bio'
									value={field.value || ''}
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

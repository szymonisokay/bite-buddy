'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'

import { createBusiness } from '@/actions/business/create-business'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
	name: z.string().min(3, 'Business name must be at least 3 characters long'),
	bio: z.string().optional(),
})

export type CreateBusinessFormValues = z.infer<typeof formSchema>

export const CreateBusinessForm = () => {
	const router = useRouter()

	const form = useForm<CreateBusinessFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			bio: '',
		},
	})

	const loading = form.formState.isSubmitting

	const onSubmit = async (values: CreateBusinessFormValues) => {
		try {
			const businessId = await createBusiness(values)

			if (!businessId) return

			router.refresh()
			router.push(`/business/${businessId}`)
		} catch (error: any) {
			toast.error(error.message)
		}
	}

	return (
		<Form {...form}>
			<form
				className='flex flex-col gap-4'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					name='name'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input {...field} disabled={loading} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					name='bio'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Bio</FormLabel>
							<FormControl>
								<Textarea {...field} disabled={loading} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button>
					{loading && (
						<Loader className='w-4 h-4 mr-2 animate-spin' />
					)}
					Create business
				</Button>
			</form>
		</Form>
	)
}

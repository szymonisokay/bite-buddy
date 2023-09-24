'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

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
	name: z.string().min(1, { message: 'Company name is required.' }),
	bio: z.string().optional(),
})

type FieldValues = z.infer<typeof formSchema>

export const InitialBusinessForm = () => {
	const router = useRouter()

	const form = useForm<FieldValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			bio: '',
		},
	})

	const loading = form.formState.isSubmitting

	const onSubmit = async (values: FieldValues) => {
		try {
			await axios.post('/api/business', values)

			router.refresh()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Form {...form}>
			<form
				className='flex flex-col p-4 pt-0 gap-y-4'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Company name'
									disabled={loading}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='bio'
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Bio{' '}
								<span className='text-xs text-muted-foreground'>
									(optional)
								</span>
							</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									placeholder='Give some information about your business'
									disabled={loading}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					disabled={loading}
					className='self-end'
					variant='primary'
				>
					{loading && (
						<Loader2Icon className='w-4 h-4 mr-2 animate-spin' />
					)}
					Continue
				</Button>
			</form>
		</Form>
	)
}

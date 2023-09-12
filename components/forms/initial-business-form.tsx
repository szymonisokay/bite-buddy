'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

const formSchema = z.object({
	name: z.string().min(1, { message: 'Company name is required.' }),
	bio: z.string().optional(),
})

type FieldValues = z.infer<typeof formSchema>

type Props = {
	ownerId: string
}

export const InitialBusinessForm = ({ ownerId }: Props) => {
	const router = useRouter()

	const form = useForm<FieldValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			bio: '',
		},
	})

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
				className='flex flex-col p-6 pt-0 gap-y-4'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder='Company name' {...field} />
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
									placeholder='Give some information about your business'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button>Continue</Button>
			</form>
		</Form>
	)
}

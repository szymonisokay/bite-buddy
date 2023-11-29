'use client'

import { zodResolver } from '@hookform/resolvers/zod'
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
	name: z.string().min(3, 'Please provide name for your business'),
	bio: z.string().optional(),
})

export type CreateBusinessFormValues = z.infer<typeof formSchema>

type Props = {
	onSubmit: (values: CreateBusinessFormValues) => void
}

export const CreateBusinessForm = ({ onSubmit }: Props) => {
	const form = useForm<CreateBusinessFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			bio: '',
		},
	})

	const handleSubmit = async (values: CreateBusinessFormValues) => {
		onSubmit(values)
	}

	return (
		<Form {...form}>
			<form
				className='flex flex-col gap-4'
				onSubmit={form.handleSubmit(handleSubmit)}
			>
				<FormField
					name='name'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input {...field} />
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
								<Textarea {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button>Create business</Button>
			</form>
		</Form>
	)
}

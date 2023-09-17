'use client'

import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { DialogClose } from '@radix-ui/react-dialog'
import axios from 'axios'
import { Loader2, XIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Heading } from '@/components/heading'
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
import { useModalStore } from '@/hooks/use-modal-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { Business } from '@prisma/client'

const formSchema = z.object({
	name: z.string().min(1, {
		message: 'Please provide business name',
	}),
	bio: z.string().nullable(),
})

type FormValues = z.infer<typeof formSchema>

export const CreateBusinessModal = () => {
	const { open, type, onClose } = useModalStore()
	const router = useRouter()

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			bio: null,
		},
	})

	const loading = form.formState.isSubmitting

	const onSubmit = async (values: FormValues) => {
		try {
			const response = await axios.post<Business>('/api/business', values)
			const businessId = response.data.id

			router.push(`/business/${businessId}`)
			router.refresh()
			onClose()
			form.reset()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Dialog open={open && type === 'createBusiness'}>
			<DialogContent>
				<DialogHeader className='flex-row items-start justify-between space-y-0 gap-x-8'>
					<Heading
						title='Create business'
						description='Fill in necessary information of Your company and start
						delivering via our app.'
					/>

					<DialogClose asChild>
						<Button
							variant='ghost'
							size='icon'
							className='w-9 h-9 shrink-0'
							onClick={onClose}
						>
							<XIcon className='w-4 h-4' />
						</Button>
					</DialogClose>
				</DialogHeader>

				<Form {...form}>
					<form
						className='flex flex-col gap-y-4'
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
											placeholder='Business name'
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
											value={field.value || ''}
											disabled={loading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							className='self-end'
							variant='primary'
							disabled={loading}
						>
							{loading && (
								<Loader2 className='w-4 h-4 mr-2 animate-spin' />
							)}
							Create business
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Business, Location, Menu } from '@prisma/client'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'

import { updateBusiness } from '@/actions/business/update-business'
import { Heading } from '@/components/heading'
import { Notice } from '@/components/notice'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

const formSchema = z.object({
	visibleInApp: z.boolean(),
	approved: z.boolean(),
})

type FormValues = z.infer<typeof formSchema>

type Props = {
	business: Business & {
		location: Location | null
	}
	menu: Menu | null
}

export const BusinessGeneralForm = ({ business, menu }: Props) => {
	const router = useRouter()

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: business || {
			visibleInApp: '',
			approved: '',
		},
	})

	const loading = form.formState.isSubmitting
	const noticeVisible = !business.location || !menu || !menu.active

	const onSubmit = async (values: FormValues) => {
		try {
			await updateBusiness(business.id, {
				visibleInApp: values.visibleInApp,
			})

			toast.success('Business general information updated')
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
					title='General information'
					description='General information about your business'
				/>

				{noticeVisible && (
					<Notice
						type='error'
						title='Business visibility in app'
						content="You can't set visibility of your business in BiteBuddy application because location of your business is not specified or your business doesn't have active meals on the menu."
					/>
				)}

				<FormField
					control={form.control}
					name='visibleInApp'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div className='flex items-center justify-between gap-4'>
									<Label
										className='max-w-xs'
										htmlFor='visibleInApp'
									>
										<p className='text-base'>
											Business visible in application
										</p>
										<p className='text-sm font-normal leading-tight text-muted-foreground'>
											Turn this option on to show your
											business in BiteBuddy app.
										</p>
									</Label>
									<Switch
										id='visibleInApp'
										checked={field.value}
										onCheckedChange={field.onChange}
										disabled={loading || noticeVisible}
									/>
								</div>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='approved'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div className='flex items-center justify-between gap-4'>
									<Label
										className='max-w-xs'
										htmlFor='approved'
									>
										<p className='text-base'>
											Business approved
										</p>
										<p className='text-sm font-normal leading-tight text-muted-foreground'>
											This option will be automatically
											turned on when your business rating
											exceeds 4.5. Special badge will also
											be visible next to your business.
										</p>
									</Label>
									<Switch
										id='approved'
										disabled
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</div>
							</FormControl>
						</FormItem>
					)}
				/>

				<Button
					variant='default'
					disabled={loading || noticeVisible}
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

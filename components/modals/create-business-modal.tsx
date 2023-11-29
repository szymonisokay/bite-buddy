'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

import { createBusiness } from '@/actions/business/create-business'
import {
	CreateBusinessForm,
	CreateBusinessFormValues,
} from '@/components/forms/create-business-form'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'

export const CreateInitialBusinessModal = () => {
	const router = useRouter()

	const onSubmit = async (values: CreateBusinessFormValues) => {
		try {
			const businessId = await createBusiness(values)

			if (!businessId) return

			router.replace(`/business/${businessId}`)
		} catch (error: any) {
			toast.error(error.message)
		}
	}

	return (
		<Dialog open>
			<DialogContent>
				<DialogHeader className='flex-row items-start justify-between gap-4'>
					<div className='space-y-1'>
						<DialogTitle className='max-w-sm'>
							Welcome to{' '}
							<span className='px-1 bg-red-600/70'>
								Bite Buddy
							</span>{' '}
							for business
						</DialogTitle>
						<DialogDescription>
							Create your first business with us!
						</DialogDescription>
					</div>
					{/* <DialogClose asChild>
						<Button variant='ghost' size='sm'>
							<XIcon className='w-5 h-5' />
						</Button>
					</DialogClose> */}
				</DialogHeader>

				<CreateBusinessForm onSubmit={onSubmit} />
			</DialogContent>
		</Dialog>
	)
}

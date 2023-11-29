'use client'

import { CreateBusinessForm } from '@/components/forms/create-business-form'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useMounted } from '@/hooks/use-mounted'

export const CreateInitialBusinessModal = () => {
	const { mounted } = useMounted()

	if (!mounted) {
		return null
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

				<CreateBusinessForm />
			</DialogContent>
		</Dialog>
	)
}

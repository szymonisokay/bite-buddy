'use client'

import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
} from '@/components/ui/dialog'
import { DialogClose } from '@radix-ui/react-dialog'
import axios from 'axios'
import { Loader2Icon, XIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'
import { useModalStore } from '@/hooks/use-modal-store'
import { useState } from 'react'
import toast from 'react-hot-toast'

export const ConfirmDeleteModal = () => {
	const { open, type, onClose, data } = useModalStore()
	const router = useRouter()

	const [loading, setLoading] = useState<boolean>(false)

	const confirm = data?.confirm

	const onConfirm = async () => {
		try {
			setLoading(true)
			await axios.delete(confirm?.apiUrl || '')

			router.replace(confirm?.redirectUrl || '')
			router.refresh()
			onClose()

			toast.success('Deleted')
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Dialog open={open && type === 'confirmMealDelete'}>
			<DialogContent>
				<DialogHeader className='flex-row items-start justify-between space-y-0 gap-x-8'>
					<Heading
						title={confirm?.title || ''}
						description={confirm?.description}
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
				<DialogFooter>
					<Button
						className='hover:bg-slate-100 hover:dark:bg-[#050505]'
						variant='ghost'
						onClick={onClose}
						disabled={loading}
					>
						Cancel
					</Button>
					<Button
						onClick={onConfirm}
						disabled={loading}
						variant='primary'
					>
						{loading && (
							<Loader2Icon className='w-4 h-4 mr-2 animate-spin' />
						)}
						Confirm
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

'use client'

import { PlusIcon } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export const ActionsTopbar = () => {
	return (
		<div className='flex justify-end w-full'>
			<Link href='meals/new'>
				<Button variant='primary' size='sm'>
					<PlusIcon className='w-4 h-4 mr-2' />
					Create meal
				</Button>
			</Link>
		</div>
	)
}

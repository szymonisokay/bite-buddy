'use client'

import { Button } from '@/components/ui/button'
import { BeefIcon, PlusIcon } from 'lucide-react'

export const MenuTabs = () => {
	return (
		<div className='flex items-center mt-4 gap-x-2'>
			<Button variant='outline' className='gap-x-2'>
				<BeefIcon className='w-4 h-4' />
				<span>Main</span>
			</Button>

			<Button variant='primary' className='ml-auto gap-x-2'>
				<PlusIcon className='w-4 h-4' />
				<span>Add category</span>
			</Button>
		</div>
	)
}

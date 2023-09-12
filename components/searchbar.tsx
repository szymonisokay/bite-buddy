'use client'

import { SearchIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'

export const SearchBar = () => {
	return (
		<div className='flex items-center  dark:bg-[#01050e] px-4 py-2 rounded-full'>
			<SearchIcon className='w-4 h-4' />
			<Input className='border-none otline-none ring-0 dark:bg-[#01050e] focus-visible:ring-0 h-6 ring-offset-0 focus-visible:ring-transparent focus-visible:ring-offset-0' />
		</div>
	)
}

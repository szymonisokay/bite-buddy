'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ThemeToggle() {
	const { setTheme, theme } = useTheme()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className='relative gap-x-2'
					variant='outline'
					size='sm'
				>
					<Sun className='w-4 h-4 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0' />
					<Moon className='absolute w-4 h-4 transition-all scale-0 rotate-90 left-3 dark:rotate-0 dark:scale-100' />
					<span className='sr-only'>Toggle theme</span>
					<span className='text-sm capitalize'>{theme}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='dark:bg-[#09090b]' align='start'>
				<DropdownMenuItem onClick={() => setTheme('light')}>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
	LucideShieldClose,
	ShieldAlertIcon,
	ShieldCheckIcon,
} from 'lucide-react'
import { cn } from '../lib/utils'

type Props = {
	type: 'success' | 'warning' | 'error'
	content: string
	title?: string
}

export const Notice = ({ type, content, title }: Props) => {
	return (
		<Alert
			className={cn(
				'text-white border-none',
				type === 'error' && 'bg-red-700 dark:bg-red-800',
				type === 'warning' && 'bg-orange-600 dark:bg-orange-600/80',
				type === 'success' && 'bg-[#1a8986] dark:bg-green-800 '
			)}
		>
			{type === 'error' && (
				<LucideShieldClose className='!text-white w-5 h-5 !top-[20px] !left-[14px]' />
			)}
			{type === 'warning' && (
				<ShieldAlertIcon className='!text-white w-5 h-5 !top-[20px] !left-[14px]' />
			)}
			{type === 'success' && (
				<ShieldCheckIcon className='!text-white w-5 h-5 !top-[20px] !left-[14px]' />
			)}

			<AlertTitle className={cn('text-lg font-semibold')}>
				{title}
			</AlertTitle>
			<AlertDescription className='leading-tight text-white/90 dark:text-primary/90'>
				{content}
			</AlertDescription>
		</Alert>
	)
}

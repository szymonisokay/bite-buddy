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
				type === 'error' && 'bg-red-900 border-red-900',
				type === 'warning' && 'bg-orange-600/80 border-orange-600/80',
				type === 'success' && 'bg-green-600 border-green-600'
			)}
		>
			{type === 'error' && (
				<LucideShieldClose className='w-5 h-5 !top-[20px] !left-[14px]' />
			)}
			{type === 'warning' && (
				<ShieldAlertIcon className='w-5 h-5 !top-[20px] !left-[14px]' />
			)}
			{type === 'success' && (
				<ShieldCheckIcon className='w-5 h-5 !top-[20px] !left-[14px]' />
			)}

			<AlertTitle className={cn('text-lg font-semibold')}>
				{title}
			</AlertTitle>
			<AlertDescription className='leading-tight text-primary/90'>
				{content}
			</AlertDescription>
		</Alert>
	)
}

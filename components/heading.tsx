'use client'

import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
	title: string
	description?: string
	border?: boolean
}

export const Heading = ({
	title,
	description,
	border,
	className,
	...props
}: Props) => {
	return (
		<div className={cn(className, border && 'pb-3 border-b')} {...props}>
			<h4 className='text-lg font-semibold leading-tight tracking-tight'>
				{title}
			</h4>
			<p className='text-sm text-muted-foreground'>{description}</p>
		</div>
	)
}

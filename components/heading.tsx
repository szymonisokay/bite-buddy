'use client'

import { cn } from '../lib/utils'

type Props = {
	title: string
	description?: string
	border?: boolean
}

export const Heading = ({ title, description, border }: Props) => {
	return (
		<div className={cn(border && 'pb-3 border-b')}>
			<h4 className='text-lg font-semibold leading-tight tracking-tight'>
				{title}
			</h4>
			<p className='text-sm text-muted-foreground'>{description}</p>
		</div>
	)
}

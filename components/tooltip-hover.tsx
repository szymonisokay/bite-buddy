'use client'

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'

type Props = {
	children: React.ReactNode
	content?: string
	side?: 'top' | 'right' | 'bottom' | 'left'
	align?: 'start' | 'center' | 'end'
	sideOffset?: number
}

export const TooltipHover = ({
	children,
	content,
	side = 'left',
	align = 'center',
	sideOffset,
}: Props) => {
	return (
		<TooltipProvider delayDuration={200}>
			<Tooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent
					className='dark:bg-[#09090b]'
					side={side}
					align={align}
					sideOffset={sideOffset}
				>
					<p>{content}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

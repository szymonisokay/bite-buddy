'use client'

import { LucideIcon } from 'lucide-react'
import { forwardRef } from 'react'
import { ControllerRenderProps } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

type Props = {
	label: string
	description?: string
	icon?: LucideIcon
} & ControllerRenderProps

export const FormSwitch = forwardRef<HTMLDivElement, Props>(
	({ label, description, icon: Icon, onChange, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className='flex items-center justify-between gap-4 p-4 border rounded-md'
			>
				<Label htmlFor={props.name} className='space-y-1'>
					<p className='flex items-center font-semibold'>
						{Icon && <Icon className='w-4 h-4 mr-1.5' />}
						{label}
					</p>
					<p className='text-sm font-normal text-muted-foreground'>
						{description}
					</p>
				</Label>

				<Switch {...props} id={props.name} onCheckedChange={onChange} />
			</div>
		)
	}
)

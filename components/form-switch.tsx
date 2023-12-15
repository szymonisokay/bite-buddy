'use client'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { forwardRef } from 'react'
import { ControllerRenderProps } from 'react-hook-form'

type Props = {
	label: string
	description?: string
} & ControllerRenderProps

export const FormSwitch = forwardRef<HTMLDivElement, Props>(
	({ label, description, onChange, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className='flex items-center justify-between gap-4 p-4 border rounded-md bg-muted'
			>
				<div>
					<Label htmlFor={props.name} className='font-semibold'>
						{label}
					</Label>
					<p className='text-sm text-muted-foreground'>
						{description}
					</p>
				</div>

				<Switch {...props} onCheckedChange={onChange} />
			</div>
		)
	}
)

'use client'

import { XIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

type Props = {
	title: string
	description?: string
	actionLabel: string
	href: string
}

export const Empty = ({ title, description, actionLabel, href }: Props) => {
	const router = useRouter()
	const params = useParams()

	const navigateTo = () => {
		router.push(`/business/${params.businessId}/${href}`)
	}

	return (
		<div className='flex flex-col items-center w-full mt-20'>
			<div className='p-4 mb-4 bg-slate-100 dark:bg-[#050505] rounded-full'>
				<XIcon className='w-8 h-8 ' />
			</div>
			<p className='text-xl font-semibold leading-tight tracking-tight'>
				{title}
			</p>
			<p className='text-sm text-muted-foreground'>{description}</p>

			<Button className='mt-4' onClick={navigateTo} variant='primary'>
				{actionLabel}
			</Button>
		</div>
	)
}

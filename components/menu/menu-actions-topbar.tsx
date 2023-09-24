'use client'

import { Menu } from '@prisma/client'
import axios from 'axios'
import { SettingsIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { Heading } from '@/components/heading'
import { TooltipHover } from '@/components/tooltip-hover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Props = {
	menu: Menu | null
}

export const MenuActionsTopbar = ({ menu }: Props) => {
	const params = useParams()
	const router = useRouter()

	const createMenu = async () => {
		try {
			await axios.post(`/api/business/${params.businessId}/menu`)

			router.refresh()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div
			className={cn(
				'flex items-center justify-between w-full gap-x-4',
				!menu && 'justify-end'
			)}
		>
			{menu && <Heading title='Organize meals in your menu' />}

			<div className='flex items-center gap-x-4'>
				{!menu && (
					<Button
						className='hover:dark:bg-[#050505]'
						variant='ghost'
						onClick={createMenu}
					>
						Create menu
					</Button>
				)}

				<TooltipHover content='Menu settings'>
					<Button variant='outline' size='icon' disabled={!menu}>
						<SettingsIcon className='w-4 h-4' />
					</Button>
				</TooltipHover>
			</div>
		</div>
	)
}

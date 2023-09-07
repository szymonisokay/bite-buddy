'use client'

import { MenuIcon } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { User } from '@clerk/nextjs/server'
import { NavigationAction } from './navigation-action'

type Props = {
	user: User | null
}

export const Sidebar = ({ user }: Props) => {
	const [mounted, setMounted] = useState<boolean>(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='ghost' size='icon'>
					<MenuIcon className='w-5 h-5' />
				</Button>
			</SheetTrigger>
			<SheetContent side='left'>
				<div className='flex flex-col h-full'>
					{user && (
						<SheetHeader className='flex-row mt-4 space-y-0'>
							<div className='relative w-10 h-10'>
								<Image
									fill
									src={user.imageUrl}
									alt='Profile image'
									className='rounded-full'
								/>
							</div>
							<div className='flex flex-col ml-2'>
								<SheetTitle className='text-sm text-left'>
									{user.firstName} {user.lastName}
								</SheetTitle>
								<SheetDescription className='text-ellipsis'>
									{user.emailAddresses[0].emailAddress}
								</SheetDescription>
							</div>
						</SheetHeader>
					)}

					<div className='flex-1 mt-8'>TODO: Menu</div>

					<NavigationAction />
				</div>
			</SheetContent>
		</Sheet>
	)
}

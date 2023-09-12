'use client'

import { User } from '@prisma/client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Props = {
	user: User
}

export const BusinessAvatar = ({ user }: Props) => {
	return (
		<div className='flex items-center w-full p-4 overflow-x-hidden gap-x-2'>
			<Avatar className='w-8 h-8'>
				<AvatarImage src={user.imageUrl} />
				<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
			</Avatar>

			<div className='flex flex-col overflow-x-hidden'>
				<p className='text-sm font-semibold'>{user.name}</p>
				<p
					title={user.email}
					className='text-xs truncate text-muted-foreground'
				>
					{user.email}
				</p>
			</div>
		</div>
	)
}

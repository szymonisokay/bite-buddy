'use client'

import { Business, Profile } from '@prisma/client'

import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useMobileSidebar } from '@/hooks/use-mobile-sidebar'

import { useWindowResize } from '@/hooks/use-window-resize'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { BusinessSwitcherPopover } from './business-switcher-popover'
import { Navigation } from './navigation'
import { SidebarFooter } from './sidebar-footer'
import { UserProfileMobile } from './user-profile-mobile'

type Props = {
	profile: Profile
	businesses: Business[]
}

export const MobileSidebar = ({ profile, businesses }: Props) => {
	const pathname = usePathname()
	const { open, setClose } = useMobileSidebar()
	const width = useWindowResize()

	useEffect(() => {
		setClose()
	}, [pathname])

	useEffect(() => {
		if (width > 768) {
			setClose()
		}
	}, [width])

	return (
		<Sheet open={open} onOpenChange={setClose}>
			<SheetContent side='left' className='flex flex-col p-4'>
				<UserProfileMobile profile={profile} />

				<BusinessSwitcherPopover businesses={businesses} />

				<Navigation />

				<SidebarFooter />
			</SheetContent>
		</Sheet>
	)
}

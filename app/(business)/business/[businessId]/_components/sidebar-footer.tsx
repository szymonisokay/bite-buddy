'use client'

import packageJson from '@/package.json'

export const SidebarFooter = () => {
	return (
		<div className='text-xs text-center text-muted-foreground'>
			v {packageJson.version}
		</div>
	)
}

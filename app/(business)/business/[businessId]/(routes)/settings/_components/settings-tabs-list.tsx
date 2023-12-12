'use client'

import qs from 'query-string'

import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetActiveTab } from '@/hooks/use-get-active-tab'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

type SettingsTab = 'information' | 'details' | 'location' | 'general'

const settingsTabs: SettingsTab[] = [
	'information',
	'details',
	'location',
	'general',
]

export const SettingsTabsList = () => {
	const pathname = usePathname()
	const router = useRouter()
	const activeTab = useGetActiveTab()

	const onTabChange = (tab: SettingsTab) => {
		const url = qs.stringifyUrl({
			url: pathname,
			query: {
				tab,
			},
		})

		router.push(url)
	}

	useEffect(() => {
		if (!activeTab) {
			onTabChange('information')
		}
	}, [activeTab])

	return (
		<TabsList>
			{settingsTabs.map((tab) => (
				<TabsTrigger
					onClick={() => onTabChange(tab)}
					key={tab}
					value={tab}
					className='capitalize'
				>
					{tab}
				</TabsTrigger>
			))}
		</TabsList>
	)
}

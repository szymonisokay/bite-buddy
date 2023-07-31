import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'BiteBuddy',
	description: 'Food delivery made simple',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<ClerkProvider
			appearance={{
				layout: {
					socialButtonsPlacement: 'bottom',
				},
				elements: {
					formButtonPrimary:
						'bg-red-700 py-4 hover:bg-red-700/90 duration-150',
					formFieldInput: 'py-3',
					logoBox: 'justify-center h-full mb-4',
					headerTitle:
						'text-primary text-base leading-none tracking-tight',
					headerSubtitle: 'text-muted-foreground text-sm',
					main: 'gap-y-4',
					card: 'p-6 rounded-md gap-y-4',
					footer: 'justify-center',
					footerActionText: 'text-muted-foreground',
					footerActionLink:
						'text-red-700 hover:text-red-700/90 duration-150',
				},
			}}
		>
			<html lang='en'>
				<body className={inter.className}>{children}</body>
			</html>
		</ClerkProvider>
	)
}

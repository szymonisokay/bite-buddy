import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ThemeProvider } from '@/components/providers/theme-provider'

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
					formFieldInput: 'py-3 dark:bg-muted dark:text-primary',
					formFieldLabel: 'dark:text-primary',
					formFieldInputShowPasswordButton: 'dark:text-primary',
					formFieldWarningText: 'dark:text-primary',
					formFieldSuccessText: 'dark:text-primary',
					formFieldHintText: 'dark:text-muted-foreground',
					logoBox: 'justify-center h-full',
					logoImage: 'dark:bg-primary hidden',
					headerTitle:
						'text-primary text-base leading-none tracking-tight',
					headerSubtitle: 'text-muted-foreground text-sm',
					main: 'gap-y-4',
					card: 'p-6 rounded-md gap-y-4 dark:bg-primary-foreground',
					footer: 'justify-center',
					footerActionText: 'text-muted-foreground',
					footerActionLink:
						'text-red-700 hover:text-red-700/90 duration-150',
					dividerLine: 'dark:bg-primary/90',
					dividerText: 'dark:text-primary/90',
					socialButtonsBlockButton: 'dark:bg-muted dark:text-primary',
				},
			}}
		>
			<html lang='en' suppressHydrationWarning>
				<body className={inter.className}>
					<ThemeProvider
						attribute='class'
						defaultTheme='dark'
						enableSystem
					>
						{children}
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	)
}

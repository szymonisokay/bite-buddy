import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import { ModalsProvider } from '@/components/providers/modals-provider'
import { ToastProvider } from '@/components/providers/toast-provider'
import { cn } from '@/lib/utils'

import './globals.css'

const poppins = Roboto({
	subsets: ['latin'],
	weight: ['300', '400', '500', '700', '900'],
})

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
				<body className={cn('', poppins.className)}>
					<ModalsProvider />
					<ToastProvider />
					{children}
				</body>
			</html>
		</ClerkProvider>
	)
}

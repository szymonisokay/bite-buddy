'use client'

import { create } from 'zustand'

type UseMobileSidebarStore = {
	open: boolean
	setOpen: () => void
	setClose: () => void
}

export const useMobileSidebar = create<UseMobileSidebarStore>((set) => ({
	open: false,
	setOpen: () => set({ open: true }),
	setClose: () => set({ open: false }),
}))

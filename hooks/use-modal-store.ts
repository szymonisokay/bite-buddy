'use client'

import { create } from 'zustand'

export type ModalType = 'createBusiness'

type UseModalStore = {
	open: boolean
	onOpen: (type: ModalType) => void
	onClose: () => void
	type: ModalType | null
}

export const useModalStore = create<UseModalStore>((set) => ({
	open: false,
	onOpen: (type: ModalType) => set({ open: true, type }),
	onClose: () => set({ open: false, type: null }),
	type: null,
}))

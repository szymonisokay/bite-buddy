'use client'

import { create } from 'zustand'

export type ModalType = 'createBusiness'

export type ModalData = {}

type UseModalStore = {
	open: boolean
	onOpen: (type: ModalType, data?: ModalData) => void
	onClose: () => void
	type: ModalType | null
	data?: ModalData | null
}

export const useModal = create<UseModalStore>((set) => ({
	open: false,
	onOpen: (type: ModalType, data?: ModalData) =>
		set({ open: true, type, data }),
	onClose: () => set({ open: false, type: null, data: null }),
	type: null,
	data: null,
}))

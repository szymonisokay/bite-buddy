import { ConfirmDeleteModal } from '@/components/modals/confirm-meal-delete-modal'
import { CreateBusinessModal } from '@/components/modals/create-business-modal'

export const ModalsProvider = () => {
	return (
		<>
			<CreateBusinessModal />
			<ConfirmDeleteModal />
		</>
	)
}

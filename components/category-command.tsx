'use client'

import { MealCategory } from '@prisma/client'
import { CheckIcon, ChevronsUpDownIcon, LoaderIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { forwardRef, useState } from 'react'
import { ControllerRenderProps } from 'react-hook-form'
import toast from 'react-hot-toast'

import { createCategory } from '@/actions/business/create-category'
import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type Props = {
	categories: MealCategory[]
} & ControllerRenderProps

export const CategoryCommand = forwardRef<HTMLDivElement, Props>(
	({ categories, ...props }, ref) => {
		const [open, setOpen] = useState<boolean>(false)
		const [loading, setLoading] = useState<boolean>(false)
		const [inputValue, setInputValue] = useState<string>('')

		const params = useParams()
		const router = useRouter()

		const selectedCategory = categories.find(
			(category) => category.id === props.value
		)

		const onCreateCategory = async () => {
			try {
				setLoading(true)
				const categoryId = await createCategory(
					params.businessId.toString(),
					{ name: inputValue, description: null }
				)

				props.onChange(categoryId)
				router.refresh()
				setOpen(false)
			} catch (error: any) {
				toast.error(error.message)
			} finally {
				setLoading(false)
				setInputValue('')
			}
		}

		return (
			<div ref={ref}>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							role='combobox'
							variant='outline'
							className='justify-between w-full gap-x-2'
						>
							<span className='truncate'>
								{selectedCategory?.name}
							</span>

							<ChevronsUpDownIcon className='w-4 h-4 text-muted-foreground shrink-0' />
						</Button>
					</PopoverTrigger>
					<PopoverContent
						align='start'
						className='dark:bg-[#09090b] p-0 w-[268px]'
					>
						<Command className='dark:bg-[#09090b]'>
							<CommandList>
								<CommandInput
									value={inputValue}
									onValueChange={(value) =>
										setInputValue(value)
									}
									placeholder='Search for a category'
								/>
								<CommandEmpty className='p-1'>
									<div
										role='button'
										className='flex items-center gap-4 px-2 py-1 rounded-md hover:bg-accent'
										onClick={onCreateCategory}
									>
										<p>
											Create{' '}
											<span className='font-semibold'>
												{inputValue}
											</span>
											...
										</p>

										{loading && (
											<LoaderIcon className='w-4 h-4 ml-auto animate-spin' />
										)}
									</div>
								</CommandEmpty>
								<CommandGroup heading='Categories'>
									<div className='space-y-1'>
										{categories?.map((category) => (
											<CommandItem
												key={category.id}
												className={cn(
													'relative pl-8 cursor-pointer',
													selectedCategory?.id ===
														category.id &&
														'bg-slate-100 dark:bg-[#050505]'
												)}
												onSelect={() => {
													props.onChange(category.id)
													setOpen(false)
												}}
											>
												{selectedCategory?.id ===
													category.id && (
													<CheckIcon className='absolute w-4 h-4 left-2 shrink-0' />
												)}

												<span className='truncate'>
													{category.name}
												</span>
											</CommandItem>
										))}
									</div>
								</CommandGroup>
								<CommandSeparator />
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
			</div>
		)
	}
)

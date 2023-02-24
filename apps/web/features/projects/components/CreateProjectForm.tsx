'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Form } from '@localize/ui'
import { Dialog } from '@localize/ui'
import type { PostgrestError } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast/headless'
import { useCreateProject } from '../hooks/use-create-project'
import { createProjectSchema, type CreateProjectSchema } from '../schemas/create-project'
import useDialog = Dialog.useDialog

export const CreateProjectForm = () => {
  const router = useRouter()
  const { toggleDialog } = useDialog()
  const { mutateAsync: createProject, isLoading } = useCreateProject()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProjectSchema>({
    resolver: zodResolver(createProjectSchema),
  })

  const handleCreateProject = handleSubmit(async (data) => {
    await toast.promise(createProject(data), {
      error: ({ message }: PostgrestError) => message,
      loading: 'Creating your project...',
      success: 'Project successfully created',
    })

    toggleDialog()
    router.refresh()
  })

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleCreateProject}
      className="flex flex-col space-y-8"
    >
      <Form.Control>
        <Form.Label>Name</Form.Label>
        <Form.Input placeholder="Localize" errorMessage={errors.name?.message} {...register('name')} />
      </Form.Control>
      <Button loading={isLoading} disabled={isLoading}>
        Create
      </Button>
    </form>
  )
}

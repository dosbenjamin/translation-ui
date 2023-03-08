'use client'

import { Button } from '@localize/ui'
import type { PostgrestError } from '@supabase/supabase-js'
import { toast } from 'react-hot-toast/headless'
import { useDeleteProject } from '@localize/web/features/projects/client'
import { useRouter } from 'next/navigation'

type DeleteProjectDialogProps = {
  projectId: string
}

export const DeleteProjectButton = ({ projectId }: DeleteProjectDialogProps) => {
  const router = useRouter()

  const { mutateAsync: deleteProject, isLoading: isDeleting } = useDeleteProject()

  const handleProjectDelete = async () => {
    await toast.promise(deleteProject(projectId), {
      error: ({ message }: PostgrestError) => message,
      loading: 'Deleting your project...',
      success: 'Project successfully deleted',
    })

    router.refresh()
  }

  return (
    <Button
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={handleProjectDelete}
      intent="danger"
      loading={isDeleting}
      disabled={isDeleting}
    >
      Yes, I confirm
    </Button>
  )
}

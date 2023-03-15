import { z } from 'zod'

export const CreateProjectSchema = z.object({
  title: z.string().min(1, 'Enter a title to create the project'),
})

export type CreateProjectValues = z.infer<typeof CreateProjectSchema>

export const ReadProjectSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
})

export type ReadProjectValues = z.infer<typeof ReadProjectSchema>

export const DeleteProjectSchema = z.string().uuid()
export type DeleteProjectValue = z.infer<typeof DeleteProjectSchema>

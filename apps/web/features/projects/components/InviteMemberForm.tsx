'use client'

import { Button, Form } from '@localize/ui'
import { type InviteMemberSchema, inviteMemberSchema } from 'features/projects/client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

type InviteMemberFormProps = {
  projectId: string
}

export const InviteMemberForm = ({ projectId }: InviteMemberFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<InviteMemberSchema>({
    defaultValues: { projectId },
    resolver: zodResolver(inviteMemberSchema),
  })

  const handleInvitation = handleSubmit((values) => {
    console.log(values)
  })

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleInvitation}
      className="flex flex-col space-y-8"
    >
      <Form.Control>
        <Form.Label htmlFor="member-email">Email</Form.Label>
        <Form.Input
          id="member-email"
          placeholder="email@example.org"
          errorMessage={errors.email?.message}
          {...register('email')}
        />
      </Form.Control>
      <Button>Send</Button>
    </form>
  )
}

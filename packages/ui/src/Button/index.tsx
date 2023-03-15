import type { ComponentPropsWithRef, ReactNode } from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import { Spinner } from '../Icons'

const buttonVariants = cva('text-center outline-none', {
  defaultVariants: {
    intent: 'primary',
    size: 'base',
  },
  variants: {
    disabled: {
      true: 'cursor-not-allowed',
    },
    intent: {
      danger: 'bg-danger text-white',
      neutral: 'bg-white text-purple-900',
      primary: 'bg-orange text-white disabled:brightness-50',
    },
    loading: {
      true: 'flex items-center justify-center',
    },
    size: {
      base: 'text-base px-8 py-4 variation-wght-600',
    },
  },
})

type ButtonProps = ComponentPropsWithRef<'button'> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean
    loadingMessage?: ReactNode
  }

export const Button = ({
  children,
  disabled,
  intent,
  loading,
  loadingMessage,
  size,
  className,
  ...props
}: ButtonProps) => (
  <button disabled={disabled} className={buttonVariants({ className, disabled, intent, loading, size })} {...props}>
    {loading && loadingMessage ? loadingMessage : children}
    {loading && <Spinner className="ml-4 w-4" />}
  </button>
)

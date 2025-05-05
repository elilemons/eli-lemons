import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import type { Page, Post } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  disabled?: boolean
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    disabled,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}
  const disabledLink = (
    <div className={className}>
      {label && label}
      {children && children}
    </div>
  )

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return disabled ? (
      disabledLink
    ) : (
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button
      asChild
      className={className}
      size={size}
      variant={appearance}
      onClick={(e) => {
        if (disabled) e.preventDefault
      }}
    >
      {disabled ? (
        disabledLink
      ) : (
        <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
          {label && label}
          {children && children}
        </Link>
      )}
    </Button>
  )
}

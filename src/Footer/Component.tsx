'use client'
import Link from 'next/link'
import { FC } from 'react'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import Lemon from '@/components/Lemon'
import { GyroscopePermissionButton } from '@/components/GyroscopePermissionButton'

export const Footer: FC = () => {
  return (
    <footer className="max-w-md w-full mx-auto mt-auto z-10">
      <div className="container py-8 gap-8 flex flex-row justify-between items-end">
        <Link className="flex items-center" href="/">
          <Lemon />
        </Link>

        <GyroscopePermissionButton />

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
        </div>
      </div>
    </footer>
  )
}

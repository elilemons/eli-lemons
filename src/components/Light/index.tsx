'use client'
import { useGyroscope } from '@/providers/Gyroscope'
import { cn } from '@/utilities/ui'
import { useEffect, useRef } from 'react'

export const Light: React.FC = () => {
  const { position, requestPermission } = useGyroscope()
  const lightEffectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (lightEffectRef.current) {
      lightEffectRef.current.style.transform = `translate(${position.x}%, ${position.y}%)`
    }
  }, [position])

  return (
    <div className="w-full flex justify-center items-center absolute min-h-screen z-[1]">
      <div
        ref={lightEffectRef}
        className={cn(
          'rounded-full',
          'size-[200px] blur-[20px] shadow-[0_0_60px_20px_rgba(255,224,0,0.5)]',
          'absolute',
          'bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,rgba(255,224,0,0.7)_30%,rgba(255,224,0,0.4)_60%,transparent_80%)]',
        )}
      />
    </div>
  )
}

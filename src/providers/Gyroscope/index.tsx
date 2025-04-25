'use client'
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'

interface GyroscopeContextType {
  isSupported: boolean
  isEnabled: boolean
  position: {
    x: number
    y: number
  }
  requestPermission: () => void
}

const defaultContext: GyroscopeContextType = {
  isSupported: false,
  isEnabled: false,
  position: { x: 0, y: 0 },
  requestPermission: () => {},
}

const GyroscopeContext = createContext<GyroscopeContextType>(defaultContext)

interface GyroscopeProviderProps {
  children: ReactNode
  maxOffset?: number // Maximum percentage offset from center
}

export const GyroscopeProvider: React.FC<GyroscopeProviderProps> = ({
  children,
  maxOffset = 40, // Default maximum percentage offset from center
}) => {
  const [isSupported, setIsSupported] = useState<boolean>(false)
  const [isEnabled, setIsEnabled] = useState<boolean>(false)
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  // Helper function to clamp values between min and max
  const clamp = (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max)
  }

  // Handle device orientation changes
  const handleOrientation = useCallback(
    (event: DeviceOrientationEvent) => {
      if (!isEnabled) return

      // Get the orientation data
      const beta = event.beta // -180 to 180 (front/back tilt)
      const gamma = event.gamma // -90 to 90 (left/right tilt)

      if (beta === null || gamma === null) return

      // Convert tilt to percentage offset (limited range)
      const xOffset = clamp((gamma / 45) * maxOffset, -maxOffset, maxOffset)
      const yOffset = clamp((beta / 45) * maxOffset, -maxOffset, maxOffset)

      setPosition({ x: xOffset, y: yOffset })
    },
    [isEnabled, maxOffset],
  )

  // Handle mouse movement for desktop fallback
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isEnabled) {
        // Enable with first mouse move if no gyroscope
        setIsEnabled(true)
      }

      // Calculate mouse position relative to center of screen
      const xPos = (e.clientX / window.innerWidth - 0.5) * 100
      const yPos = (e.clientY / window.innerHeight - 0.5) * 100

      setPosition({ x: xPos, y: yPos })
    },
    [isEnabled],
  )

  // Enable gyroscope
  const enableGyroscope = () => {
    setIsEnabled(true)
    window.addEventListener('deviceorientation', handleOrientation)
  }

  // Request permission for iOS 13+ devices
  const requestPermission = () => {
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      typeof (DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
      // iOS 13+ requires permission
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(DeviceOrientationEvent as any)
        .requestPermission()
        .then((permissionState: string) => {
          if (permissionState === 'granted') {
            enableGyroscope()
          } else {
            alert('Permission to use gyroscope was denied')
          }
        })
        .catch(console.error)
    } else {
      // Non-iOS 13+ devices don't need permission
      enableGyroscope()
    }
  }

  useEffect(() => {
    // Check if device has gyroscope
    if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
      setIsSupported(true)
    }

    // Fallback for desktop testing - mouse movement controls
    if (
      typeof window !== 'undefined' &&
      (!window.DeviceOrientationEvent ||
        (window.DeviceOrientationEvent &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          typeof (DeviceOrientationEvent as any).requestPermission !== 'function'))
    ) {
      document.addEventListener('mousemove', handleMouseMove)
    }

    // Cleanup event listeners
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('deviceorientation', handleOrientation)
        document.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [handleMouseMove, handleOrientation])

  const contextValue: GyroscopeContextType = {
    isSupported,
    isEnabled,
    position,
    requestPermission,
  }

  return <GyroscopeContext.Provider value={contextValue}>{children}</GyroscopeContext.Provider>
}

// Custom hook to use the gyroscope context
export const useGyroscope = (): GyroscopeContextType => {
  const context = useContext(GyroscopeContext)
  if (context === undefined) {
    throw new Error('useGyroscope must be used within a GyroscopeProvider')
  }
  return context
}

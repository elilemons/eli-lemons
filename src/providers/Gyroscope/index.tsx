'use client'
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
  useCallback,
} from 'react'

interface GyroscopeContextType {
  isSupported: boolean
  isEnabled: boolean
  position: {
    x: number
    y: number
  }
  enableGyroscope: () => void
  enableMouseTracking: () => void
}

const defaultContext: GyroscopeContextType = {
  isSupported: false,
  isEnabled: false,
  position: { x: 0, y: 0 },
  enableGyroscope: () => {},
  enableMouseTracking: () => {},
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
  const handleOrientationWrapper = (e: DeviceOrientationEvent) => handleOrientationRef.current(e)

  const handleOrientationRef = useRef<(e: DeviceOrientationEvent) => void>(() => {})
  useEffect(() => {
    handleOrientationRef.current = (event: DeviceOrientationEvent) => {
      if (!isEnabled) return

      const beta = event.beta
      const gamma = event.gamma

      if (beta === null || gamma === null) return

      const xOffset = clamp((gamma / 45) * maxOffset, -maxOffset, maxOffset)
      const yOffset = clamp((beta / 45) * maxOffset, -maxOffset, maxOffset)

      setPosition({ x: xOffset, y: yOffset })
    }
  }, [isEnabled, maxOffset])

  // Handle mouse movement for desktop fallback
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Calculate mouse position relative to center of screen
    const xPos = (e.clientX / window.innerWidth - 0.5) * 100
    const yPos = (e.clientY / window.innerHeight - 0.5) * 100

    setPosition({ x: xPos, y: yPos })
  }, [])

  const enableGyroscope = () => {
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof (DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
      ;(DeviceOrientationEvent as any)
        .requestPermission()
        .then((permissionState: string) => {
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', handleOrientationWrapper)
            setIsEnabled(true)
          } else {
            alert('Permission to use gyroscope was denied')
          }
        })
        .catch((err: any) => {
          console.error('Permission request failed', err)
        })
    } else {
      // Android or older browsers
      window.addEventListener('deviceorientation', handleOrientationWrapper)
      setIsEnabled(true)
    }
  }

  const enableMouseTracking = () => {
    document.removeEventListener('mousemove', handleMouseMove) // clean if already set
    document.addEventListener('mousemove', handleMouseMove)
    setIsEnabled(true)
  }

  useEffect(() => {
    const testHandler = (e: DeviceOrientationEvent) => {
      if (e.alpha !== null || e.beta !== null || e.gamma !== null) {
        setIsSupported(true)
        window.removeEventListener('deviceorientation', testHandler)
      }
    }

    window.addEventListener('deviceorientation', testHandler)

    // Also clean up on unmount
    return () => {
      window.removeEventListener('deviceorientation', testHandler)
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove])

  const contextValue: GyroscopeContextType = {
    isSupported,
    isEnabled,
    position,
    enableGyroscope,
    enableMouseTracking,
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

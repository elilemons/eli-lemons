import { useGyroscope } from '@/providers/Gyroscope'
import { Rotate3d } from 'lucide-react'
import { FC } from 'react'

export const GyroscopePermissionButton: FC = () => {
  const { isSupported, isEnabled, enableGyroscope, enableMouseTracking } = useGyroscope()

  return (
    <>
      {isSupported && !isEnabled && (
        <button
          onClick={enableGyroscope}
          className="px-5 py-2.5 bg-brand hover:bg-yellow-600 disabled:bg-[#95a5a6] disabled:cursor-not-allowed text-black rounded cursor-pointer text-xs lg:text-base z-10 mt-5 flex flex-row gap-2 items-center"
        >
          <Rotate3d className="size-4" />
          Enable Gyroscope
        </button>
      )}

      {!isSupported && !isEnabled && (
        <button
          onClick={enableMouseTracking}
          className="px-5 py-2.5 bg-brand hover:bg-yellow-600 disabled:bg-[#95a5a6] disabled:cursor-not-allowed text-black rounded cursor-pointer text-xs lg:text-base z-10 mt-5 flex flex-row gap-2 items-center"
        >
          <Rotate3d className="size-4" />
          Enable Mouse Tracking
        </button>
      )}

      {isEnabled && (
        <div className="text-white text-sm bg-black/50 px-4 py-2 rounded-[20px]">
          {isSupported ? 'Gyroscope Enabled' : 'Mouse Control Enabled'}
        </div>
      )}
    </>
  )
}

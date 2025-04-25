import { useGyroscope } from '@/providers/Gyroscope'
import { Rotate3d } from 'lucide-react'
import { FC } from 'react'

export const GyroscopePermissionButton: FC = () => {
  const { isSupported, isEnabled, requestPermission } = useGyroscope()

  return (
    <>
      {isSupported && !isEnabled && (
        <button
          onClick={requestPermission}
          className="px-5 py-2.5 bg-brand hover:bg-yellow-600 disabled:bg-[#95a5a6] disabled:cursor-not-allowed text-black rounded cursor-pointer text-base z-10 mt-5 flex flex-row gap-2 items-center"
        >
          <Rotate3d />
          Enable Gyroscope
        </button>
      )}

      {!isSupported && (
        <div className="text-white text-sm bg-black/50 px-4 py-2 rounded-[20px]">
          Gyroscope not available. Using mouse control instead.
        </div>
      )}

      {isEnabled && (
        <div className="text-white text-sm bg-black/50 px-4 py-2 rounded-[20px]">
          {isSupported ? 'Gyroscope Enabled' : 'Mouse Control Enabled'}
        </div>
      )}
    </>
  )
}

import { SVGProps, Ref, FC } from 'react'

type Props = {
  className?: string
  props?: SVGProps<SVGSVGElement>
  ref?: Ref<SVGSVGElement>
}

const ArrowUp: FC<Props> = ({ className, props, ref }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 233 233"
      ref={ref}
      {...props}
    >
      <path
        fill="currentColor"
        d="M116.11.5c63.841 0 116.155 52.314 116.155 116.157 0 63.842-52.314 115.389-116.155 115.389C52.267 232.046.719 180.499.719 116.657.719 52.814 52.267.5 116.109.5h.001Zm.53 41-58.687 58.985 11.969 12.547 32.703-18.97v86.236c-39.648-6.565-69.89-40.994-69.89-82.5 0-19.633 6.77-37.684 18.093-51.954-18.851 17.682-30.61 42.905-30.61 70.813a95.586 95.586 0 0 0 95.891 95.889c53.199 0 96.655-42.692 96.655-95.889 0-27.562-11.671-52.51-30.312-70.157 11.014 14.165 17.578 31.964 17.578 51.297 0 41.23-29.822 75.486-69.078 82.375v-84.36l31.25 17.813 12.547-13.14L116.64 41.5Z"
      />
    </svg>
  )
}

export default ArrowUp

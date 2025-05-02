import { SVGProps, Ref, FC } from 'react'

type Props = {
  className?: string
  props?: SVGProps<SVGSVGElement>
  ref?: Ref<SVGSVGElement>
}

const ArrowDown: FC<Props> = ({ className, props, ref }) => {
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
        d="M116.11 232.5c63.841 0 116.155-52.314 116.155-116.157 0-63.842-52.314-115.39-116.155-115.39C52.267.954.719 52.502.719 116.344c0 63.843 51.548 116.157 115.39 116.157h.001Zm.53-41-58.687-58.985 11.969-12.547 32.703 18.97V52.703c-39.648 6.564-69.89 40.993-69.89 82.499 0 19.633 6.77 37.684 18.093 51.954-18.851-17.683-30.61-42.905-30.61-70.813a95.587 95.587 0 0 1 95.891-95.89c53.199 0 96.655 42.693 96.655 95.89 0 27.562-11.671 52.51-30.312 70.157 11.014-14.165 17.578-31.964 17.578-51.297 0-41.23-29.822-75.487-69.078-82.375v84.36l31.25-17.813 12.547 13.14L116.64 191.5Z"
      />
    </svg>
  )
}

export default ArrowDown

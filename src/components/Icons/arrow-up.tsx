import { SVGProps, Ref, FC } from 'react'

type Props = {
  props?: SVGProps<SVGSVGElement>
  ref?: Ref<SVGSVGElement>
}

const ArrowUp: FC<Props> = ({ props, ref }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props?.width ?? '12'}
      height={props?.height ?? '45'}
      viewBox="0 0 12 45"
      fill="none"
      ref={ref}
      {...props}
    >
      <path
        fill={props?.fill ?? 'currentColor'}
        d="M5 44a1 1 0 1 0 2 0H5ZM6 0 .226 10h11.547L6 0Zm1 44V9H5v35h2Z"
      />
    </svg>
  )
}

export default ArrowUp

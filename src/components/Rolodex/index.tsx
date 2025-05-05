'use client'
import type { Link, LinkBlock as LinkBlockProps } from '@/payload-types'
import { CMSLink } from '../../components/Link'
import { cn } from '@/utilities/ui'
import ArrowUp from '@/components/Icons/arrow-up'
import ArrowDown from '@/components/Icons/arrow-down'
import { useEffect, useRef, useState } from 'react'

type Props = {
  className?: string
  links: Link[]
}

export const Rolodex: React.FC<Props> = ({ className, links }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [offset, setOffset] = useState(0)
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])

  const bounce = (dir: 'up' | 'down') => {
    const el = document.getElementById('link-block')
    if (el) {
      el.classList.add(dir === 'up' ? 'bounce-up' : 'bounce-down')
      setTimeout(() => el.classList.remove('bounce-up', 'bounce-down'), 300)
    }
  }

  const moveUp = () => {
    if (activeIndex > 0) setActiveIndex((i) => i - 1)
    else bounce('up')
  }

  const moveDown = () => {
    if (activeIndex < links.length - 1) setActiveIndex((i) => i + 1)
    else bounce('down')
  }

  const arrowIconClasses =
    'size-8 group-hover:animate-bounce-up group-hover:repeat-infinite group-hover:text-brand transition-colors duration-1000 dark:text-white light:text-black'

  useEffect(() => {
    if (!itemRefs.current[activeIndex]) return

    // Calculate total height above the center item
    const topOffset = itemRefs.current
      .slice(0, activeIndex)
      .reduce((acc, el) => acc + (el?.getBoundingClientRect().height || 0), 0)

    setOffset(topOffset)
  }, [activeIndex])
  return (
    <div className="container my-16 flex flex-col gap-10">
      <button
        className="flex flex-row justify-center items-center w-full group cursor-pointer z-20"
        onClick={moveUp}
      >
        <ArrowUp className={arrowIconClasses} />
      </button>
      <div
        className="flex flex-col w-full items-end"
        style={{ transform: `translateY(-${offset}px)` }}
      >
        {links?.map((link, i) => (
          <div
            key={link.id}
            ref={(element: HTMLDivElement | null) => {
              itemRefs.current[i] = element
            }}
            className={cn(
              'relative group hover:cursor-pointer',
              'text-6xl',
              activeIndex === i ? 'scale-100' : 'scale-75',
              'transition-all',
            )}
          >
            <CMSLink
              className={cn(
                'font-black',
                'relative lowercase pr-5 z-20',
                'transition-[letter-spacing] left-[inherit] duration-300 ease-in-out tracking-normal',
                '!motion-reduce:transition-none group-hover:after:!motion-reduce:animation-none',
                activeIndex === i ? 'scale-100 tracking-widest' : 'scale-75',
                className,
              )}
              label={link.label}
              newTab={link.newTab}
              url={link.url}
            />
            <div
              className={cn(
                'absolute top-8 right-0 z-10',
                '!motion-reduce:transition-none group-hover:!motion-reduce:animation-none',
                activeIndex === i
                  ? 'animate-slide-left-right text-brand '
                  : 'light:text-black dark:text-white',
              )}
            >
              •
            </div>
          </div>
        ))}
      </div>
      <button
        className="flex flex-row justify-center items-center w-full group cursor-pointer z-20"
        onClick={moveDown}
      >
        <ArrowDown className={arrowIconClasses} />
      </button>
    </div>
  )
}

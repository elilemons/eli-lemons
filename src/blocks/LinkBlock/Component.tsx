import type { LinkBlock as LinkBlockProps } from '@/payload-types'
import { CMSLink } from '../../components/Link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cn } from '@/utilities/ui'
import { Fragment } from 'react'

type Props = LinkBlockProps & {
  className?: string
}

export const LinkBlock: React.FC<Props> = async ({ className, links = [] }) => {
  const payload = await getPayload({ config: configPromise })

  const flattenedLinks = links?.map((link) => {
    if (typeof link === 'object') return link.id
    else return link
  })

  const fetchedLinks = await payload.find({
    collection: 'links',
    ...(flattenedLinks && flattenedLinks.length > 0
      ? {
          where: {
            id: {
              in: flattenedLinks,
            },
          },
        }
      : {}),
  })

  return (
    <div className="container my-16 flex w-full items-end flex-col gap-3">
      {fetchedLinks.docs.map((link) => (
        <div key={link.id} className="relative text-6xl group hover:cursor-pointer">
          <CMSLink
            className={cn(
              'relative lowercase pr-5 z-20',
              'transition-[letter-spacing] left-[inherit] duration-300 ease-in-out tracking-normal',
              'group-hover:tracking-widest',
              '!motion-reduce:transition-none group-hover:after:!motion-reduce:animation-none',
              className,
            )}
            label={link.label}
            newTab={link.newTab}
            url={link.url}
          />
          <div
            className={cn(
              'absolute top-8 right-0 z-10',
              'group-hover:animate-slide-left-right group-hover:text-brand',
              '!motion-reduce:transition-none group-hover:!motion-reduce:animation-none',
            )}
          >
            •
          </div>
        </div>
      ))}
    </div>
  )
}

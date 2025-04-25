import type { LinkBlock as LinkBlockProps } from '@/payload-types'
import { CMSLink } from '../../components/Link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cn } from '@/utilities/ui'

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
        <CMSLink
          key={link.id}
          className={cn(
            'text-white relative lowercase text-6xl pr-5',
            'after:content-["•"] after:absolute after:top-[10px]',
            'transition-[letter-spacing] left-[inherit] duration-300 ease-in-out tracking-normal',
            'hover:tracking-widest',
            'hover:after:animate-slide-left-right hover:after:text-[#FFBE00]',
            '!motion-reduce:transition-none hover:after:!motion-reduce:animation-none',
            className,
          )}
          label={link.label}
          newTab={link.newTab}
          url={link.url}
        />
      ))}
    </div>
  )
}

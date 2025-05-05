import type { LinkBlock as LinkBlockProps } from '@/payload-types'
import { CMSLink } from '../../components/Link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cn } from '@/utilities/ui'
import ArrowUp from '@/components/Icons/arrow-up'
import ArrowDown from '@/components/Icons/arrow-down'
import { Rolodex } from '@/components/Rolodex'

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

  return <Rolodex className={className} links={fetchedLinks.docs} />
}

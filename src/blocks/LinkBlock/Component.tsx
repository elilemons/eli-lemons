import type { LinkBlock as LinkBlockProps } from '@/payload-types';
import { CMSLink } from '../../components/Link';

type Props = LinkBlockProps & {
  className?: string
};

export const LinkBlock: React.FC<Props> = ({
  className,
  label,
  newTab,
  url,
}) => {
  return (
      <CMSLink
        className={className}
        label={label}
        newTab={newTab}
        url={url}
      />
  )
}
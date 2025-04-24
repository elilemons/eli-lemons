import type { Block } from 'payload'

export const LinkBlock: Block = {
  slug: 'linkBlock',
  interfaceName: 'LinkBlock',
  fields: [
    {
      name: 'links',
      type: 'relationship',
      relationTo: 'links',
      hasMany: true,
    },
  ],
}

import type { Block } from 'payload';

export const LinkBlock: Block = {
  slug: 'linkBlock',
  interfaceName: 'LinkBlock',
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      required: true,
    },
    {
      name: 'newTab',
      type: 'checkbox',
      defaultValue: false,
    }
  ]
}
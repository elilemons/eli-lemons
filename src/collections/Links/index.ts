import { CollectionConfig } from 'payload'

const Links: CollectionConfig = {
  slug: 'links',
  admin: {
    useAsTitle: 'label',
  },
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
    },
  ],
}

export default Links

import { CollectionConfig } from 'payload'

const Links: CollectionConfig = {
  slug: 'links',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'href',
      type: 'text',
      required: true,
    },
    {
      name: 'opensInNewTab',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}

export default Links

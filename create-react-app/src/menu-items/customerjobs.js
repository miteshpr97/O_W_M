import { IconUser } from '@tabler/icons'; // Import the User icon

// constant
const icons = { IconX: IconUser }; // Assign the User icon to IconX

const customerjobs = {
  id: 'customerjobs-road',
  type: 'group',
  children: [
    {
      id: 'customerjobs',
      title: ' New Customer',
      type: 'item',
      url: '/customer-jobs',
      icon: icons.IconX, // Now it uses the User icon
      breadcrumbs: false,
    },
  ],
};

export default customerjobs;

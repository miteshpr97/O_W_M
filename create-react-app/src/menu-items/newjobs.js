
// assets
import { IconBriefcase, IconPlus } from '@tabler/icons';

// constant
const icons = {  IconBriefcase, IconPlus};


const newjobs = {
    id: 'new-roadmap',
    type: 'group',
    children: [
      {
        id: 'new-page',
        title: 'New Jobs ',
        type: 'item',
        url: '/new-jobs/',
        icon: icons.IconBriefcase,
        breadcrumbs: false
      },
     
    ]
  };

export default newjobs


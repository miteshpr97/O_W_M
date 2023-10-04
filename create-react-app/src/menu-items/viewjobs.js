
// assets
import { IconBriefcase, IconPlus } from '@tabler/icons';

// constant
const icons = {  IconBriefcase, IconPlus};


const newjobs = {
    id: 'view-roadmap',
    type: 'group',
    children: [
      {
        id: 'view-page',
        title: 'View Jobs ',
        type: 'item',
        url: '/view-jobs',
        icon: icons.IconBriefcase,
        breadcrumbs: false
      },
     
    ]
  };

export default newjobs


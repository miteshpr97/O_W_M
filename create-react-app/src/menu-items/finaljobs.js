
// assets
// import { IconBrandChrome, IconHelp } from '@tabler/icons';

import {  IconCheck } from '@tabler/icons';

// constant
const icons = {  IconCheck };


const finaljobs = {
    id: 'finaljobs-road',
    type: 'group',
    children: [
      {
        id: 'Finaljobs',
        title: 'Plan Jobs',
        type: 'item',
        // url: '/final-jobs/:index',
        url: '/final-jobs/:JobNo',
        icon: icons.IconCheck,
        breadcrumbs: false
      },
    ]
  };

export default finaljobs 









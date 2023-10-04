import dashboard from './dashboard';
import pages from './pages';
// import utilities from './utilities';
import newJobCreate from './newjobs'
//  import other from './other';
import viewjobsForAdmin from './viewjobsForAdmin';

import close from './closejobs'

// import finsh from './finishjobs'

import final from './finaljobs'

import view from './viewjobs'

import customer from './customerjobs'


import customerDetails from './customerDetails'


import finish from './finishjobs'

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard,customer,customerDetails, newJobCreate, view, viewjobsForAdmin ,final, close, finish ,  pages, ]
};

export default menuItems;







// items: [dashboard, pages, utilities, other]
import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));



const NewJobPage = Loadable(lazy(() => import('views/new-jobs')));

const ViewJobForAdmin = Loadable(lazy(() => import('views/view-jobsForAdmin')));

const CloseJobsPage = Loadable(lazy(() => import('views/close-jobs')));

// const FinshJobsPage = Loadable(lazy(() => import('views/finish-job')));



const FinalJobsPage = Loadable(lazy(() => import('views/final-jobs')));


const ViewJobsPage = Loadable(lazy(() => import('views/view-jobs')));


const CustomerJobsPage = Loadable(lazy(() => import('views/customer-jobs')));

const CustomerDetails = Loadable(lazy(() => import('views/customer-Details')));

const FinishJobsPage  = Loadable(lazy(() => import('views/finish-jobs')));


// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },

    {
      // path: 'new-jobs/:customerCode',
      path: 'new-jobs',
      element: <NewJobPage />
    },



    {
      path: 'view-jobsForAdmin/',
      element: <ViewJobForAdmin />
    },

    {
      path: 'close-jobs',
      element: <CloseJobsPage/>
    },

    
    {
      //  path: 'final-jobs',
      path:'/final-jobs/:JobNo',
      element: <FinalJobsPage/>
    },
    
    {
      path: 'view-jobs',
      element: <ViewJobsPage/>
    },

      
    {
      path: 'customer-jobs',
      element: <CustomerJobsPage/>
    },

    {
      path: 'customer-Details',
      element: <CustomerDetails/>
    },

    
    {
      path: 'finish-jobs',
      element: <FinishJobsPage />
    },

  ]
};

export default MainRoutes;

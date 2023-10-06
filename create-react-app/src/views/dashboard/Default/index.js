// import React from 'react';
// import { Grid, Box } from '@mui/material';
// import { gridSpacing } from 'store/constant';
// import CardItems from './CardItems';
// import Chart from './Chart';
// import ColumnChart from './ColumnChart';


// const Dashboard = () => {
//   const containerStyle = {
//     display: 'flex',
//     flex: 'wrap',

//     padding: '20px',
//     width: '100vw',
//     height: '100vh',
//     backgroundColor: 'red',
//   };


//   const coloredDivStyle = {
//     height: '600px',
//     width: '50%',
//     // margin: '50px' // Corrected 'margintop' to 'margin'
//     display: 'flex',
//     justifyContent: 'center'

//   };


//   const coloredDivStyleOne = {
//     height: '300px',
//     width: '50%',
//     // margin: '50px' // Corrected 'margintop' to 'margin'

//   };

//   return (
//     <Grid container spacing={gridSpacing}>
//       <Grid item xs={12}>
//         <Grid container spacing={gridSpacing}>
//           <Grid item lg={12} md={12} sm={12} xs={12} mt={3}>
//             <CardItems />
//           </Grid>
//         </Grid>
//       </Grid>

//       <Box style={containerStyle}>
//         <div style={{ ...coloredDivStyle }}>
//           <Chart />
//         </div>
//         <div style={{ ...coloredDivStyleOne }}>
//           <ColumnChart/>
//         </div>
//       </Box>
//     </Grid>
//   );
// };

// export default Dashboard;

import React from 'react';
import { Grid, Box, useMediaQuery } from '@mui/material';
import { gridSpacing } from 'store/constant';
import CardItems from './CardItems';
import Chart from './Chart';
import ColumnChart from './ColumnChart';

const Dashboard = () => {
  // Use media queries to determine screen size
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '20px',
    width: '100%',
    height: '100vh',
    // backgroundColor: 'red',
  };

  const coloredDivStyle = {
    height: '350px',
    width: isSmallScreen ? '100%' : '65%', // Use full width on small screens
    display: 'flex',
    justifyContent: 'center',
  };

  const coloredDivStyleOne = {
    height: '300px',
    width: isSmallScreen ? '100%' : '35%', // Use full width on small screens
    

  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={12} md={12} sm={12} xs={12} mt={3}>
            <CardItems />
          </Grid>
        </Grid>
      </Grid>

      <Box style={containerStyle}>
        <div style={{ ...coloredDivStyle }}>
         <ColumnChart />
        </div>
        <div style={{ ...coloredDivStyleOne }}>
        <Chart />
        </div>
      </Box>
    </Grid>
  );
};

export default Dashboard;




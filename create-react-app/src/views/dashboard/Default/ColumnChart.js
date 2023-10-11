
// import React, { useState, useEffect } from 'react';
// import CanvasJSReact from '@canvasjs/react-charts';

// const CanvasJSChart = CanvasJSReact.CanvasJSChart;

// function ColumnChart() {
//   const [dataPlan, setDataPlan] = useState([]);
//   const [dataClosed, setDataClosed] = useState([]);
//   const [dataFinish, setDataFinish] = useState([]);

//   // Fetch data from the API when the component mounts
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         // Fetch data for "New Jobs"
//         const responsePlan = await fetch('http://localhost:3306/api/new_jobs/plan/jobTransactions');
//         if (!responsePlan.ok) {
//           throw new Error('Failed to fetch data for New Jobs');
//         }
//         const dataPlan = await responsePlan.json();
//         setDataPlan(dataPlan);

//         // Fetch data for "Closed Jobs"
//         const responseClosed = await fetch('http://localhost:3306/api/new_jobs/closed/jobTransactions');
//         if (!responseClosed.ok) {
//           throw new Error('Failed to fetch data for Closed Jobs');
//         }
//         const dataClosed = await responseClosed.json();
//         setDataClosed(dataClosed);

//         // Fetch data for "Finish Jobs"
//         const responseFinish = await fetch('http://localhost:3306/api/new_jobs/finish/jobTransactions');
//         if (!responseFinish.ok) {
//           throw new Error('Failed to fetch data for Finish Jobs');
//         }
//         const dataFinish = await responseFinish.json();
//         setDataFinish(dataFinish);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }

//     fetchData();
//   }, []);

//   // Define the categories you want to display on the x-axis
//   const categoriesToInclude = ['Inside To Inside', 'Inside To Outside', 'Outside To Inside', 'Outside To Outside'];

//   // Filter and organize the data for the chart
//   const chartData = [
//     {
//       type: 'column',
//       name: 'New Jobs',
//       showInLegend: true,
//       dataPoints: categoriesToInclude.map((category) => {
//         const matchingItem = dataPlan.find((item) => item.JobTransactionType === category);
//         return {
//           label: category,
//           y: matchingItem ? matchingItem.TransactionCount : 0,
//         };
//       }),
//       color: 'blue',
//     },
//     {
//       type: 'column',
//       name: 'Closed Jobs',
//       showInLegend: true,
//       dataPoints: categoriesToInclude.map((category) => {
//         const matchingItem = dataClosed.find((item) => item.JobTransactionType === category);
//         return {
//           label: category,
//           y: matchingItem ? matchingItem.TransactionCount : 0,
//         };
//       }),
//       color: 'orange',
//     },
//     {
//       type: 'column',
//       name: 'Finish Jobs',
//       showInLegend: true,
//       dataPoints: categoriesToInclude.map((category) => {
//         const matchingItem = dataFinish.find((item) => item.JobTransactionType === category);
//         return {
//           label: category,
//           y: matchingItem ? matchingItem.TransactionCount : 0,
//         };
//       }),
//       color: 'green',
//     },
//   ];

//   const chartContainerStyle = {
//     width: '600px',
//     margin: '0 auto',
//     padding: '20px',
//     border: '1px solid #ccc',
//     backgroundColor: '#b6f9f0',
//   };




//   const options = {
//     animationEnabled: true,
//     axisX: {
//       title: 'Transaction Type',
//     },
//     axisY: {
//       title: 'Job',
//       minimum: 0,  // Set the minimum value to 1
//       maximum: 10, // Set the maximum value to 15
//       interval: 1, // Set the interval between y-axis ticks to 1
//     },
//     backgroundColor: 'rgba(238, 242, 246, 0.5)',
//     legend: {
//       cursor: 'pointer',
//       verticalAlign: 'top',
//       horizontalAlign: 'center',
//     },
//     data: chartData,  
//   };
  
//   return (
//     <div style={chartContainerStyle}>

      
//       <CanvasJSChart options={options} />
//     </div>
//   );
// }

// export default ColumnChart;







import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ColumnChart() {
  const [dataPlan, setDataPlan] = useState([]);
  const [dataClosed, setDataClosed] = useState([]);
  const [dataFinish, setDataFinish] = useState([]);
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL; 

  // Fetch data from the API when the component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch data for "New Jobs"
        const responsePlan = await fetch(`${REACT_APP_API_URL}api/new_jobs/plan/jobTransactions`);
        if (!responsePlan.ok) {
          throw new Error('Failed to fetch data for New Jobs');
        }
        const dataPlan = await responsePlan.json();
        setDataPlan(dataPlan);

        // Fetch data for "Closed Jobs"
        const responseClosed = await fetch(`${REACT_APP_API_URL}api/new_jobs/closed/jobTransactions`);
        if (!responseClosed.ok) {
          throw new Error('Failed to fetch data for Closed Jobs');
        }
        const dataClosed = await responseClosed.json();
        setDataClosed(dataClosed);

        // Fetch data for "Finish Jobs"
        const responseFinish = await fetch(`${REACT_APP_API_URL}api/new_jobs/finish/jobTransactions`);
        if (!responseFinish.ok) {
          throw new Error('Failed to fetch data for Finish Jobs');
        }
        const dataFinish = await responseFinish.json();
        setDataFinish(dataFinish);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  // Define the categories you want to display on the x-axis
  const categoriesToInclude = ['Inside To Inside', 'Inside To Outside', 'Outside To Inside', 'Outside To Outside'];

  // Filter and organize the data for the chart
  const chartData = categoriesToInclude.map((category) => ({
    category: category,
    'New Jobs': dataPlan.find((item) => item.JobTransactionType === category)?.TransactionCount || 0,
    'Closed Jobs': dataClosed.find((item) => item.JobTransactionType === category)?.TransactionCount || 0,
    'Finish Jobs': dataFinish.find((item) => item.JobTransactionType === category)?.TransactionCount || 0,
  }));

  return (
    <div 
      style={{ 
        width: '630px', 
        padding: '20px',
        border: '1px solid #ccc', 
        backgroundColor: '#fffcfc', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      }}
    >
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: -20, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis
            domain={[0, 'auto']} // Set the minimum value to 0 and 'auto' for the maximum (automatically calculated)
            ticks={[0, 1, 2, 3, 4]}   // Define custom tick values
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="New Jobs" fill="blue" />
          <Bar dataKey="Closed Jobs" fill="orange" />
          <Bar dataKey="Finish Jobs" fill="green" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ColumnChart;




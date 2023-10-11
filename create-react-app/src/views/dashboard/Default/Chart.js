// import React, { useState, useEffect } from 'react';
// import CanvasJSReact from '@canvasjs/react-charts';

// const CanvasJSChart = CanvasJSReact.CanvasJSChart;

// function Chart() {
//   const [dataPlan, setDataPlan] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const responsePlan = await fetch('http://localhost:3306/api/new_jobs/plan/jobTransactions');
//         if (!responsePlan.ok) {
//           throw new Error('Failed to fetch data for New Jobs');
//         }
//         const dataPlan = await responsePlan.json();
//         console.log(dataPlan)
//         setDataPlan(dataPlan);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }

//     fetchData();
//   }, []);

//   const categoriesToInclude = ['Inside To Inside', 'Inside To Outside', 'Outside To Inside', 'Outside To Outside'];

//   // Define specific colors for each category
//   const categoryColors = ['green', 'red', 'orange', 'blue'];

//   const chartData = [
//     {
//       type: 'pie',
//       name: 'New Jobs',
//       showInLegend: true,
//       dataPoints: categoriesToInclude.map((category, index) => {
//         const matchingItem = dataPlan.find((item) => item.JobTransactionType === category);
//         return {
//           label: category,
//           y: matchingItem ? matchingItem.TransactionCount : 0,
//           color: categoryColors[index], // Assign specific color
//         };
//       }),
//     },
//   ];

//   const chartContainerStyle = {
//     width: '500px',
//     marginLeft: '-50px',
//     padding: '20px',
//     border: '1px solid #15698c',
//     backgroundColor: '#eef2f6',
//   };

//   const options = {
//     animationEnabled: true,
   
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

// export default Chart;






import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

function Chart() {
  const [dataPlan, setDataPlan] = useState([]);

  const REACT_APP_API_URL = process.env.REACT_APP_API_URL; 

  useEffect(() => {
    async function fetchData() {
      try {
        const responsePlan = await fetch(`${REACT_APP_API_URL}api/new_jobs/plan/jobTransactions`);
        if (!responsePlan.ok) {
          throw new Error('Failed to fetch data for New Jobs');
        }
        const dataPlan = await responsePlan.json();
        console.log(dataPlan);
        setDataPlan(dataPlan);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const categoriesToInclude = ['Inside To Inside', 'Inside To Outside', 'Outside To Inside', 'Outside To Outside'];

  // Define specific colors for each category
  const categoryColors = ['green', 'red', 'orange', 'blue'];

  const chartData = categoriesToInclude.map((category, index) => {
    const matchingItem = dataPlan.find((item) => item.JobTransactionType === category);
    return {
      name: category,
      value: matchingItem ? matchingItem.TransactionCount : 0,
      fill: categoryColors[index], // Assign specific color
    };
  });

  const chartContainerStyle = {
    width: '350px',
    height:"350px",
    padding: '20px',
    border: '1px solid #15698c',
    backgroundColor: '#fffcfc',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow
  };

  return (
    <div style={chartContainerStyle}>
      <PieChart width={300} height={300}>
        <Pie
          dataKey="value"
          isAnimationActive={true}
          data={chartData}
          cx={150}
          cy={120}
          outerRadius={80}
          fill="#cfecf9"
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default Chart;

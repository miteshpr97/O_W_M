import React, { useState, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Chart() {
  const [dataPlan, setDataPlan] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const responsePlan = await fetch('http://localhost:3306/api/new_jobs/plan/jobTransactions');
        if (!responsePlan.ok) {
          throw new Error('Failed to fetch data for New Jobs');
        }
        const dataPlan = await responsePlan.json();
        console.log(dataPlan)
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

  const chartData = [
    {
      type: 'pie',
      name: 'New Jobs',
      showInLegend: true,
      dataPoints: categoriesToInclude.map((category, index) => {
        const matchingItem = dataPlan.find((item) => item.JobTransactionType === category);
        return {
          label: category,
          y: matchingItem ? matchingItem.TransactionCount : 0,
          color: categoryColors[index], // Assign specific color
        };
      }),
    },
  ];

  const chartContainerStyle = {
    width: '400px',
    marginLeft: '-50px',
    padding: '20px',
    border: '1px solid #15698c',
    backgroundColor: '#eef2f6',
  };

  const options = {
    animationEnabled: true,
   
    backgroundColor: 'rgba(238, 242, 246, 0.5)',
    legend: {
      cursor: 'pointer',
      verticalAlign: 'top',
      horizontalAlign: 'center',
    },
    data: chartData,
  };

  return (
    <div style={chartContainerStyle}>
      <CanvasJSChart options={options} />
    </div>
  );
}

export default Chart;

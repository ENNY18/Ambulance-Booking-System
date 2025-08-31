import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const StatsChart = ({ stats }) => {
  const data = {
    labels: ['Ambulances', 'Active', 'Pending', 'Completed'],
    datasets: [
      {
        label: 'System Stats',
        data: [
          stats.ambulances,
          stats.active,
          stats.pendingRequests,
          stats.completedRequests
        ],
        backgroundColor: [
          '#3498db',
          '#2ecc71',
          '#f39c12',
          '#9b59b6'
        ],
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="stats-chart">
      <Bar data={data} options={options} />
    </div>
  );
};

export default StatsChart;
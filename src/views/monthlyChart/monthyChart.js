
import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
//props are function arguments
const MonthlyChart = (props) => {
  useEffect(()=>{
    setTimeout(()=>{},2000)
  })
  // Sample data for the chart
  const data = {
    labels:props.dates,
    datasets: [
      {
        label: "Nombre de visites par jour du mois",
        data: props.stats, // Sample sales data
        borderColor: '#2f59d6',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container p-1 justify-content-center  d-flex">
      <Line data={data} className="col-12 h-75" options={options} />
    </div>
  );
};

export default MonthlyChart;


import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SectionBarChart = ({ articles }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (articles && articles.length > 0) {
      // Count number of articles per section
      const sectionCounts = articles.reduce((accum, article) => {
        const section = article.section || "Other";
        accum[section] = (accum[section] || 0) + 1;
        return accum;
      }, {});

    const pairs = Object.entries(sectionCounts);

    pairs.sort((a, b) => (b[1] !== a[1] ? b[1] - a[1] : a[0].localeCompare(b[0])));

    
    // pairs.sort((a, b) => {
    //   if (b[1] !== a[1]) {
    //     return b[1] - a[1];
    //   }
    //   return a[0].localeCompare(b[0]);
    // });
    
    const labels = pairs.map(([section]) => section);
    const dataValues = pairs.map(([, count]) => count);

      setChartData({
        labels,
        datasets: [
          {
            label: "Number of Articles",
            data: dataValues,
            backgroundColor: "rgba(54, 162, 235, 0.7)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      });
    } else {
      // If no data, reset to blanks
      setChartData({
        labels: [],
        datasets: [],
      });
    }
  }, [articles]);

  const options = {
    responsive: true,
    aspectRatio: 0.8,
    animation: false,
    plugins: {
      title: {
        display: true,
        text: "Articles by Section",
      },
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true,
        ticks: {
          stepSize: 1
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default SectionBarChart;
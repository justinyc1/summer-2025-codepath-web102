import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const getLocalDateString = date => {
  // Format as 'YYYY-MM-DD' in local time
  const d = new Date(date);
  return d.toLocaleDateString('en-CA'); // e.g. '2025-07-22'
}

const ArticlesByDayBarChart = ({ articles }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    if (articles && articles.length > 0) {
      // Step 1: Figure out the past 7 dates (local time)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dayBuckets = [];
      const dayLabels = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        dayBuckets.push(getLocalDateString(d));
        const month = Number(getLocalDateString(d).substring(5, 7))
        const day = Number(getLocalDateString(d).substring(8, 10))
        dayLabels.push(month + "/" + day);
      }

      // Step 2: Prepare the counts
      const dateCounts = Object.fromEntries(dayBuckets.map(d => [d, 0]));
      let olderCount = 0;

      articles.forEach(article => {
        const pubDate = new Date(article.published_date);
        pubDate.setHours(0, 0, 0, 0); // Zero out to compare by local day
        const pubDateString = getLocalDateString(pubDate);
        if (Object.prototype.hasOwnProperty.call(dateCounts, pubDateString)) {
          dateCounts[pubDateString]++;
        } else {
          olderCount++;
        }
      });

      // Step 3: Build labels and data
      const labels = ["Older", ...dayLabels];
      const dataValues = [olderCount, ...dayBuckets.map(d => dateCounts[d])];

      setChartData({
        labels,
        datasets: [
          {
            label: "Number of Articles",
            data: dataValues,
            backgroundColor: "rgba(255, 159, 64, 0.8)",
            borderColor: "rgba(255, 159, 64, 1)",
            borderWidth: 1,
          }
        ]
      });
    } else {
      setChartData({ labels: [], datasets: [] });
    }
  }, [articles]);

  const options = {
    responsive: true,
    aspectRatio: 0.8,
    animation: false,
    plugins: {
      title: {
        display: true,
        text: "Articles Published by Day (Last 7 days, Local Time)",
      },
      legend: { display: false },
    },
    scales: {
      y: { 
        beginAtZero: true,
        ticks: {
          stepSize: 1
        },
       }
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ArticlesByDayBarChart;
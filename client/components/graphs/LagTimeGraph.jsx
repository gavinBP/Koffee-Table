import { Line } from 'react-chartjs-2';
import React from 'react';

export default function LagTimeGraph({ liveLagTime, time }) {
  console.log('liveLagTime: ', liveLagTime);
  /* liveLagTime: 
        {
            0: [4, 5, 4] 
            1: [6.33, 3, 2]
        }, 
    */

  const colors = [
    'rgba(255, 99, 132)',
    'rgba(54, 162, 235)',
    'rgba(255, 206, 86)',
    'rgba(75, 192, 192)',
    'rgba(153, 102, 255)',
    'rgba(255, 159, 64)',
  ];

  function getDatasets(data, colorPallete) {
    // iterate through liveLagTime
    const datasets = [];

    for (const partition in data) {
      const partitionData = {
        label: partition,
        data: data[partition],
        backgroundColor: colorPallete[partition],
        borderColor: colorPallete[partition],
        borderWidth: 2,
      };
      datasets.push(partitionData);
    }
    // return array of objects
    return datasets;
  }

  // populate new object with values for each partition
  // {0: [4, 5], 1: [6.33, 4]}

  const data = {
    // x-axis labels
    labels: time,
    datasets: getDatasets(liveLagTime, colors),
  };

  const options = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Lag Time/5s' },
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          ticks: {
            min: 0,
            max: 40
          },
          text: 'Lag Time (ms)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time from start (s)',
        },
      },
    },
  };

  return <Line data={data} options={options}></Line>;
}
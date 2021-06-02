export const chartData = {
    type: "line",
    data: {
      labels: ["0", "0.25", "0.5", "0.75", "1", "1.25", "1.5", "1.75", "2.00", "2.25", "2.5", "2.75", "3.00+"],
      datasets: [
        {
          label: '',
          data: [],
          backgroundColor: "#47b784",
          borderColor: "#47b784",
          borderWidth: 1
        }
      ]
    },
    options: {
      annotation: {
        annotations: {
          box1: {
            type: 'ellipse',
            xMin: 1,
            xMax: 2,
            yMin: 50,
            yMax: 70,
            backgroundColor: 'rgba(255, 99, 132, 0.25)'
          }
        }
      },
      responsive: false,
      lineTension: 0.3,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              padding: 25
            }
          }
        ]
      }
    }
  },

export default chartData;
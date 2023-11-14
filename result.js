var xValues = ["RisposteGiuste", "RisposteSbagliate"];
var yValues = [18, 7];
var barColors = ["#b91d47", "#2b5797"];

new Chart("myChart", {
  type: "doughnut",
  data: {
    labels: xValues,
    datasets: [
      {
        backgroundColor: barColors,
        data: yValues,
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "World Wide Wine Production 2018",
    },
    cutoutPercentage: 75, // Puoi regolare questo valore per controllare la dimensione del taglio centrale
  },
});

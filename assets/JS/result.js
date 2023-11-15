let rispostegiuste = 10;
let rispostesbagliate = 4 - rispostegiuste;
let xValues = ["RisposteSbagliate", "RisposteGiuste"];
let yValues = [rispostesbagliate, rispostegiuste];
let barColors = ["#D20094", "#00FFFF"];

function textCenter() {
  const centerText = document.getElementById("centerText");

  if (rispostegiuste >= 6) {
    centerText.innerHTML += "<h3>Congratulations! <br> <span>You passed the exam.</span> </h3> "
  } else {
    centerText.innerHTML += "<h3>I am sorry <br> <span>You didn't manage<br> to pass the examination.</span></h3>";
  }
  centerText.innerHTML += "<br><p>We'll send you the certificate<br>  in few minutes. <br> Check your email (including <br> promotions/spam folder)</p>"
}

textCenter();

new Chart("myChart", {
  type: "doughnut",
  data: {
    labels: ['Corrette', 'Errate'],
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
      position: 'bottom', 
      fontSize: 20, 
      fontColor: 'white', 
      fontStyle: 'bold' 
    },
    cutoutPercentage: 75, 
    legend: {
      display: false 
    },
    tooltips: {
      enabled: false 
    }
  },
});
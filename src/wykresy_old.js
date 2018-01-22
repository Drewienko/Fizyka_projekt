var Chart = require('chart.js');
//deklarowanie miejsca na stronie pod wykresy
var ctx1 = document.getElementById('wykres1').getContext('2d');
var ctx2 = document.getElementById('wykres2').getContext('2d');

Chart.plugins.register({
  beforeDraw: function(chartInstance) {
    var ctx = chartInstance.chart.ctx;
    ctx.fillStyle = "#262626";
    ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
  }
});

// 1.Zrobic dzialajace przycisk #ZApisz
// 2.Drukować to do pliku wybranego

//rysowanie 1 wykresu
var wykres1 = new Chart(ctx1, {

  type: 'scatter',




  data: {


    datasets: [{

      showLine: true,
      label: 'Zależność prędkości od czasu',
      lineTension: 0,
      borderColor: 'rgb(255, 99, 132)',
      pointRadius: 0,
      data: [{
        x: 0,
        y: 0
      }],
    }]
  },



  options: {

    responsive: true,

    tooltips: {
      mode: 'point'
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Czas'
        },
        ticks: {
          beginAtZero: true
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Prędkość'
        }
      }]
    }
  }
});
//rysowanie 2 wykresu
var wykres2 = new Chart(ctx2, {
  type: 'scatter',

  data: {

    datasets: [{
      showLine: true,
      label: 'Zależność drogi od czasu',
      lineTension: 0,
      borderColor: 'rgb(255, 99, 132)',
      pointRadius: 0,
      data: []
    }]
  },

  options: {
    responsive: true,
    tooltips: {
      mode: 'point'
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Czas',
        },

        ticks: {
          beginAtZero: true
        }
      }],

      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Droga'
        }
      }]
    }
  }
});
// funkcja dodajaca nowe dane do wykresu
function addData(chart, data) {
  for (let i = 0; i < data.length; i++) {
    chart.data.datasets[0].data.push(data[i]);
  }
  chart.update();
}
// funkcja czyszczaca dane z wykresu
function rmData(chart, data) {
  for (let i = 0; i < data.length; i++) {
    chart.data.datasets[0].data.pop();
  }
  chart.update();
}

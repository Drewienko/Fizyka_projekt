var Chart = require('chart.js');
var charts =[];
var fileName;
//wypelnianie canvas tlem
Chart.plugins.register({
  beforeDraw: function(chartInstance) {
    var ctx = chartInstance.chart.ctx;
    ctx.fillStyle = "#262626";
    ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
  }
});
// funkcja tworzaca wykres
function make(n,canvas,nazwa,nazwa_y,responsive) {
  var ctx = document.getElementById(canvas).getContext('2d');
  charts[n] = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        showLine: true,
        label: nazwa,
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
      responsive: responsive,
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
            labelString: nazwa_y
          }
        }]
      }
    }
  });
}

// funkcja dodajaca nowe dane do wykresu
function addData(n, data) {
  for (let i = 0; i < data.length; i++) {
    charts[n].data.datasets[0].data.push(data[i]);
  }
  charts[n].update();
}
// funkcja czyszczaca dane z wykresu
function rmData(n, data) {
  for (let i = 0; i < data.length; i++) {
    charts[n].data.datasets[0].data.pop();
  }
  charts[n].update();
}
// funkcja tworzaca wykresy do zapisu
function hidden() {
  var selected_res = $('#selected_res option:selected').data('res');
  var wykres_h = document.createElement("canvas");
  wykres_h.setAttribute('id', 'wykres_hidden');
  wykres_h.setAttribute('width', selected_res.w);
  wykres_h.setAttribute('height', selected_res.h);
  wykres_h.setAttribute('hidden', true);
  document.getElementById('saveModalTitle').appendChild(wykres_h);
  if (document.getElementById('predczas').checked) {
    make(3, 'wykres_hidden', 'Zależność prędkości od czasu', 'Prędkość',false);
    rmData(3, data_wykres1);
    addData(3, data_wykres1);
    fileName = 'Wykres zależności prędkości od czasu(' + selected_res.w + 'x' +selected_res.h + ').png';
  } else {
    make(4, 'wykres_hidden', 'Zależność drogi od czasu', 'Droga',false);
    rmData(4, data_wykres2);
    addData(4, data_wykres2);
    fileName = 'Wykres zależności drogi od czasu(' + selected_res.w + 'x' +selected_res.h + ').png';
  }
}

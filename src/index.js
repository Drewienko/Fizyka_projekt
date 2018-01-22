const electron = require('electron');
var fs = require('fs');
const {dialog} = require('electron').remote
//const BrowserWindow = require('electron').remote;//.getCurrentWindow();
//rysowanie zerowych wykresow
make(1, 'wykres1', 'Zależność prędkości od czasu', 'Prędkość',true);
make(2, 'wykres2', 'Zależność drogi od czasu', 'Droga',true);
//tworzenie wykresow pod zapis
//deklaracja tablic na dane wykresow
var data_wykres2 = [];
var data_wykres1 = [];

//funkcja wykonujaca sie po wcisnieciu przycisku Oblicz

const Oblicz = document.getElementById('Oblicz');
Oblicz.addEventListener('submit', function(event) {
  event.preventDefault(); //Wylacza odswiezanie po wcisnieciu przycisku

  //pobieranie wartosci z formularza
  var g0 = parseFloat(document.getElementById('g0').value);
  var v0 = parseFloat(document.getElementById('v0').value);
  var mi = parseFloat(document.getElementById('mi').value);
  var t_r = parseFloat(document.getElementById('t_k').value) + parseFloat(document.getElementById('t_u').value);
  //zamiana k\h na m\s i obliczenie drogi
  v0 /= 3.6;
  var s0 = v0 * (v0 / (2 * g0 * mi) + t_r);
  //wspisanie wyniku w formularzu
  document.getElementById('droga').value = (s0).toFixed(2);
  //wyliczenie stalych do wykresu
  var t = v0 / (g0 * mi);
  var a = v0 / t;
  t += t_r;

  //generowanie danych dla pierwszego wykresu
  v0 *= 3.6;
  data_wykres1 = [{
    x: 0,
    y: v0.toFixed(2)
  }, {
    x: t_r.toFixed(2),
    y: v0.toFixed(2)
  }, {
    x: t.toFixed(2),
    y: 0
  }];
  v0 /= 3.6;

  //generowanie danych dla drugiego wykresu
  data_wykres2[0] = {
    x: 0,
    y: 0
  };
  data_wykres2[1] = {
    x: t_r.toFixed(2),
    y: (t_r * v0).toFixed(2)
  };
  for (let i = 1; i <= 100; i++) {
    let x_ = ((t - t_r) / 100) * i;
    let y_ = (v0 * x_) - (a * x_ * x_ / 2) + t_r * v0;
    x_ += t_r;
    data_wykres2[i + 1] = {
      x: x_.toFixed(2),
      y: y_.toFixed(2)
    };
  }
  //odswiezanie wykresow
  rmData(1, data_wykres1);
  rmData(2, data_wykres2);
  addData(1, data_wykres1);
  addData(2, data_wykres2);
  hidden();
})

//funkcja wykonujaca sie po wcisnieciu przycisku Wyczysc
const Clear = document.getElementById('Clear');
Clear.addEventListener('click', function(event) {
  event.preventDefault(); //Wylacza odswiezanie po wcisnieciu przycisku
  //Wpisanie domyślnych wartości do formularza
  document.getElementById('v0').value = '30';
  document.getElementById('g0').value = '9.81';
  document.getElementById('droga').value = '0';
  document.getElementById('t_k').value = '0.254';
  document.getElementById('t_u').value = '0.5';
  //wyczyszczenie wykresow
  rmData(1, data_wykres1);
  rmData(2, data_wykres2);
});
// funkcje tworzace wykresy do zapisu
const Resolution = document.getElementById('selected_res');
Resolution.addEventListener('change', function(event) {
    
      document.getElementById('saveModalTitle').removeChild(document.getElementById('wykres_hidden'));

    hidden()
});
const Typ = document.getElementById('typ');
Typ.addEventListener('change', function(event) {

      document.getElementById('saveModalTitle').removeChild(document.getElementById('wykres_hidden'));

    hidden()
});

//funkcja wykonujaca sie po wcisnieciu przycisku Zapisz w modalu
const Save = document.getElementById('Save');
Save.addEventListener('click', function(event) {
  event.preventDefault(); //Wylacza odswiezanie po wcisnieciu przycisku

  if (document.getElementById('predczas').checked) {
    var t = charts[3].toBase64Image();
  } else {
    var t = charts[4].toBase64Image();
  }

  var url = t.replace(/^data:image\/png;base64,/,"");
  dialog.showSaveDialog({defaultPath:fileName , filters: [

     { name: 'Obrazy', extensions: ['png'] }

    ]}, function (fileName) {

    if (fileName === undefined) return;

    fs.writeFile(fileName, url, 'base64', function(err) {
        console.log(err);
    });

  });

});

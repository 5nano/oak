module.exports = (assayId) => `function () {

 var dataPoints = [];
 var experimentsData = [];
 var experimentData = [];
 var experimentName = "";

 var chart = new CanvasJS.Chart("chartContainer", {
 	theme:"light2",
 	animationEnabled: true,
 	title:{
 		text: "Área foliar"
 	},
 	axisY :{
 		includeZero: false,
 		title: "Área foliar",
 		suffix: "mm2"
 	},
 	toolTip: {
 		shared: "true"
 	},
 	legend:{
 		cursor:"pointer",
 		itemclick : toggleDataSeries
 	},
 	data: dataPoints
 });


 $.ajax({
   async: false,cache: false,type: "get",
   url: "https://nanivo-bush.herokuapp.com/graficoComparativo/experimentos?assayId=${assayId}",
   success: function (expName) {
     experimentName = expName;
     generateExperimentsData(experimentName);
   },
   error: function (request, status, error) {
       alert("error:"+error);
   }
 })


 function generateExperimentsData(data) {

   for (var i = 0; i < data.length; i++) {
     experimentData=[];
     for (var j = 0; j < data[i].dataPoints.length; j++) {
       experimentData.push({
         label: data[i].dataPoints[j].label,
         y: data[i].dataPoints[j].y
       });
     }
     experimentsData.push(experimentData);
   }
   addDataPoints(data);
}


function addDataPoints(data) {

  for (var h = 0; h < data.length; h++) {
    dataPoints.push({
      type: "spline",
      showInLegend: true,
      visible: false,
      ValueFormatString: "##mm",
      name: "experimento",
      dataPoints: experimentsData[h]
    });
  }
  chart.render();
}

function toggleDataSeries(e) {
	if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible ){
		e.dataSeries.visible = false;
	} else {
		e.dataSeries.visible = true;
	}
	chart.render();

}

/*
$.ajax({
    type: "get", url: "https://nanivo-bush.herokuapp.com/pruebas/imagenBase64?experimentId=1&assayId=${assayId}",
    success: function (data, text) {
      generateTestImage(data);
    },
    error: function (request, status, error) {
    }
});


function generateTestImage(base64Images){

  for (var j = 0; j < base64Images.length; j++) {
    var src = "data:image/jpeg;base64,";
  src += base64Images[j];
  var newImage = document.createElement('img');
  newImage.src = src;
  newImage.width = newImage.height = 300-(10*j);
  document.querySelector('#someDiv').innerHTML = newImage.outerHTML;
  }
}
*/

}` 

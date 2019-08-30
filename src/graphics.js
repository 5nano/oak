<!DOCTYPE HTML>
<html>
<head>
    <script>
window.onload = function () {

var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	zoomEnabled: false,
	title:{
		text: "Longitud Tallo Experimento 1"
	},
	axisY :{
		includeZero:false
	},
	data: data
});
chart.render();

}

var limit = 14;

var y = 0;
var data = [];
var dataSeries = { type: "line" };
var dataPoints = [];

for (var i = 1; i <= limit; i += 1) {
	y += (0.1+0.23);
	dataPoints.push({
		x: i,
		y: y
	});
}

dataSeries.dataPoints = dataPoints;
data.push(dataSeries);

    </script>
    <script type="text/javascript" src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
</head>
<body>
<div id="chartContainer" style="height: 370px; width: 100%;">
</div>
</body>
</html>
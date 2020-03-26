var video = document.getElementById('video');
var canvas = document.getElementById('motion');
var score = document.getElementById('score');
var scoreSum = document.getElementById('scoreSum');
var scoresArray = [];
var sum = 0;
var myVar = setInterval(myTimer, 1000);


function initSuccess() {
	DiffCamEngine.start();
}

function initError() {
	alert('Something went wrong.');
}

function capture(payload) {
  //  scoreSum.textContent = Number(score.textContent) + payload.score;
    score.textContent = payload.score;
    sum += payload.score;
    scoresArray.push(payload.score);
}

function myTimer() {
    var calorie = Math.round(sum / 9000);
    document.getElementById("demo").innerHTML = calorie.toString();
}

DiffCamEngine.init({
	video: video,
	motionCanvas: canvas,
	initSuccessCallback: initSuccess,
	initErrorCallback: initError,
	captureCallback: capture
});

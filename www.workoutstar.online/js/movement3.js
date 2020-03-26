
var video = document.getElementById('video');
var canvas = document.getElementById('motion');
var score = document.getElementById('score');
var msg = document.getElementById('msg');
var scoreSum = document.getElementById('scoreSum');
var scoresArray = [];
var sum = 0;
var myVar = setInterval(myTimer, 1000);
var countZeroMovement = 0;
var userGotMpotivatiion = 0;
var content = "";



function initSuccess() {
    DiffCamEngine.start();

  }

function initError() {
	alert('Something went wrong.');
}

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}

function capture(payload) {
    //  scoreSum.textContent = Number(score.textContent) + payload.score;
    score.textContent = payload.score;
    sum += payload.score;
    scoreSum.textContent = Number(score.textContent) + payload.score;

    //scoresArray.push(payload.score +';'+ player2.getCurrentTime());

    if (payload.score == 0) {
        countZeroMovement = countZeroMovement + 1;
    } else {
        userGotMpotivatiion = userGotMpotivatiion + 1;
    }

    if (countZeroMovement == 50) {
        msg.textContent = "move";
        countZeroMovement = 0;
        userGotMpotivatiion = 0;


    }


    if (msg.textContent == "move" && (userGotMpotivatiion > 50)) {
        msg.textContent = "Good job!";

    //    var client = new HttpClient();
     //   client.get('http://api.voicerss.org/?key=694932a7ca1b486984718703359d645f&hl=en-us&src=Hello, world!, callback', function(response) {
     //       console.log("voicerss activated");
    //    });

        
       

    }
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




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
// import entire SDK
var AWS = require('aws-sdk');

/*
// import AWS object without services
var AWS = require('aws-sdk/global');
// import individual service
var S3 = require('aws-sdk/clients/s3');
*/




function initSuccess() {
    DiffCamEngine.start();

    // Initialize the Amazon Cognito credentials provider
    // set the Amazon Cognito region
    //AWS.config.region = 'us-east-1';
    // initialize the Credentials object with our parameters
    //AWS.config.credentials = new AWS.CognitoIdentityCredentials(params);
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
    scoresArray.push(payload.score);

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

        var client = new HttpClient();
        client.get('http://api.voicerss.org/?key=694932a7ca1b486984718703359d645f&hl=en-us&src=Hello, world!, callback', function(response) {
            console.log("voicerss activated");
        });

        
        //var audio = new Audio('audio_file.mp3');
        //audio.play();

        // Prepare to call Lambda function
        var params = {
            AccountId: "446453077531 ", // your AWS user account ID
            RoleArn: "arn:aws:iam::446453077531:role/Cognito_helloworldUnauth_Role", // your Cognito unauth role (it wil look something like this)
            IdentityPoolId: "us-east-1:86b252e0-8c7c-4ccb-bf32-593071e12f5d" // the identity pool id found in Cognito
        };
        // set the Amazon Cognito region
        AWS.config.region = 'US_EAST_1';
        // initialize the Credentials object with our parameters
        AWS.config.credentials = new AWS.CognitoIdentityCredentials(params);


        // invoking the actual Lambda function
        var lambda = new AWS.Lambda();
        lambda.invoke({
            FunctionName: 'helloworld', // your function name
            LogType: "None",
            InvocationType: "Event",
        }, function(err, data) {
            if (err) {
                console.log(err, err.stack);
            } else {
                console.log('Thanks! Your signed up to my email list on Mailchimp');
            }
        });
    }
}

/*
        // invoking the actual Lambda function
        var lambda = new AWS.Lambda();
        lambda.invoke({
            FunctionName: 'helloworld', // your function name
            InvocationType: 'RequestResponse'
            // how you send the email to the Lambda event
        }, function (err, data) {
            if (err) {
                console.log(err, err.stack);
                console.log('Not working');
                console.log('Not working');
            } else {
                console.log('Thanks! Your signed up to my email list on Mailchimp');
            }
        });
        */

       

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



song_1 = "";
song_2 = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

ScoreLeftWrist = 0;

function preload(){
  song_1 = loadSound("music.mp3")
  song_2 = loadSound("music2.mp3")
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("red");
    stroke("red");
    
    if(ScoreLeftWrist > 0.2){
      circle(leftWristX,leftWristY,20);
      song_2.stop();
      if(song_1.isPlaying()==false){
      song_1.play();
      document.getElementById("song").innerHTML = " Song Name : Harry Potter"
      }
    }
}

function modelLoaded(){
  console.log("PoseNet Is Initialized");
}

function gotPoses(results){
  if(results.length > 0){
    console.log(results);
    ScoreLeftWrist = results[0].pose.keypoints[9].score;

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX =" + leftWristX +" leftWristY = "+ leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX =" + rightWristX +" rightWristY = "+ rightWristY);


  }
}
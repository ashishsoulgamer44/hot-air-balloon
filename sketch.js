var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database,height;


function preload(){
   backgroundImg = loadImage("cityImage.png")
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png","hotairballoon1.png","hotairballoon2.png");

  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  console.log(database);
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  var balloonheight = database.ref('balloon/height');
  balloonheight.on("value", readHeight, showError);
  balloon.scale=0.5;

  textSize(20); 
}

// function to display UI
function draw() {
  background(backgroundImg);

  if(keyDown(LEFT_ARROW)){
    writeHeight(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  balloon.scale = balloon.scale -0.01;

    //write code to move air balloon in left direction
  }
  else if(keyDown(RIGHT_ARROW)){
    writeHeight(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale = balloon.scale -0.01;
    //write code to move air balloon in right direction
  }
  else if(keyDown(UP_ARROW)){
    writeHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale = balloon.scale -0.01;
    //write code to move air balloon in up direction
  }
  else if(keyDown(DOWN_ARROW)){
    writeHeight(0,+10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale = balloon.scale -0.01;

    
    //write code to move air balloon in down direction


  
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}


function writeHeight(x,y){
  database.ref('balloon/height').set({
    x : balloon.x + x,
    y : balloon.y + y
  })
  
}



function readHeight(data){
  height = data.val();
  console.log(height.x);
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}





//Create variables here
var database,dog,foodstock;
var hungryDog,happyDog,foodS;

function preload()
{
  //load images here
  hungryDog = loadImage("images/dogimg.png");
  happyDog = loadImage("images/dogimg1.png");
}

function setup() {
  createCanvas(800, 700);
  
  
  database = firebase.database();
  dog = createSprite(350,350,20,20);
  dog.addImage(hungryDog);
  dog.scale = 0.5;

  foodstock = database.ref('Food');
  foodstock.on("value",readStock);
}

function draw() {  
  background("green");
  drawSprites();
  //add styles here

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  if(keyWentUp(UP_ARROW)){
    dog.addImage(hungryDog);
  }

  textSize(20);
  fill("white");
  text("Press Up to Start",10,20);
  text("Food Stock:"+foodS,150,150);
}


function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<0){
    x = 0
  }else{
    x =  x-1;
  }
  database.ref('/').update({
    Food: x
  })
}

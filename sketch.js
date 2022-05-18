var PLAY=1
var END =0
var gameState= PLAY

var freeGuy,freeGuy_running,freeGuy_collide
var invisibleGround,backgroundImg,bg

var obstacle,obstacle2,obstacle3,obstacleGroup


var score=0

var restart,gameOver
var canvas


function preload(){
  backgroundImg=loadImage("Images/SVbg.png")
  freeGuy_running=loadAnimation("Images/1.png","Images/2.png")
  freeGuy_collide=loadAnimation("Images/6.png")
  obstacle1=loadImage("Images/obstacle.png")
  obstacle2=loadImage("Images/obstacle2.png")
  obstacle3=loadImage("Images/obstacle3.png")
  restartIng=loadImage("Images/restart.png")
  gameOverIng=loadImage("Images/gameOver.png")
 }

function setup() {
  canvas=createCanvas(1500,700);
  bg=createSprite(750, 350, 50, 50);
  bg.addImage("bg1",backgroundImg)
  bg.x= bg.width /2
  bg.velocityX = -(6 + 3*score/100)
bg.scale = 2
  freeGuy=createSprite(100,420)
  
  freeGuy.addAnimation("running",freeGuy_running)
  freeGuy.addAnimation("collide",freeGuy_collide)
  freeGuy.scale=2

//   invisibleGround=createSprite(120,510,250,5)
// invisibleGround.visible=false
// invisibleGround.x = invisibleGround.width/2;
// invisibleGround.velocityX = -(6 + 3*score/100);

gameOver = createSprite(600,100);
gameOver.addImage(gameOverIng);

restart = createSprite(600,140);
restart.addImage(restartIng);

gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
 restart.visible = false;

obstacleGroup=new Group()
}

function draw() {
  if (gameState===PLAY){
    score = score+Math.round(getFrameRate()/60)
   // bg.velocityX = -(6 + 3*score/100);

    freeGuy.velocityX = 3

    camera.y=freeGuy.y
    camera.x=freeGuy.x

if(keyDown(UP_ARROW) && freeGuy.y>= 159){
  freeGuy.velocityY=-10
}
if(freeGuy.x>1000){
  freeGuy.x=50
  obstaclesGroup.destroyEach();

}

freeGuy.velocityY=freeGuy.velocityY+0.5

 if (backgroundImg.x<600){
   bg.x=bg.width/2
   bg.velocityX = 6
   invisibleGround.x = invisibleGround.width/2;
 }

 freeGuy.collide(invisibleGround)
 spawnObstacles();

  if(obstacleGroup.isTouching(freeGuy)){
    gameState= END;
   }

}

else if (gameState === END) {
  gameOver.visible = true;
  restart.visible = true;
  

freeGuy.velocityX = 0
 

  bg.velocityX = 0;
  freeGuy.velocityY = 0;
  obstacleGroup.setVelocityXEach(0);
   

freeGuy.changeAnimation("collide",freeGuy_collide)


  obstacleGroup.setLifetimeEach(-1);
   

  if(mousePressedOver(restart) || keyDown("R")) {
    reset();
  }

}
  spawnObstacles();
drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(1300,420,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }
    
          
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
   
    obstacleGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  
  freeGuy.changeAnimation("running",freeGuy_running);
  
  freeGuy.x=50
  score =0 

}
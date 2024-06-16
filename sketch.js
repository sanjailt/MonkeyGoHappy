
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;

function preload(){
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(400, 400)
  
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
}


function draw() {
  background(255);
  textSize(20);
  // stroke(0);
  // strokeWeight(1);
  fill(0);
  text("Survival Time:" + score, 100, 50);
  
  score=Math.ceil(frameCount/frameRate()) 
  
  if(ground.x < 0) {
    ground.x = ground.width/2;
  }
  
  if(keyDown("space")&& monkey.y >= 200) {
        monkey.velocityY = -12;
  }
  
  if (obstacleGroup.isTouching(monkey)) { 
    monkey.velocityY = 0;
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0); 
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  spawnObstacle();
  food();
  drawSprites();
}

function food() {
    
  if (frameCount % 80 === 0) {
    banana = createSprite(400, 315, 20, 20);
  banana.addAnimation("banana", bananaImage);
  banana.scale = 0.1;
  banana.y = Math.round(random(120,200));
  banana.velocityX = -4;
  banana.lifetime = 120;
  banana.depth = monkey.depth;
  monkey.depth += 1;
  FoodGroup.add(banana);
}
}
  function spawnObstacle() {
    if (frameCount % 300 === 0) {
    obstacle = createSprite(400, 310, 30, 30);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.2;
  // obstacle.y = Math.round(random(200,110));
  obstacle.velocityX = -4;
  obstacle.lifetime = 120;
    obstacleGroup.add(obstacle);
  }
    
  }






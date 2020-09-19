var gameState= "start";

var ground, ground_image;
var mask, mask_image, maskGroup;

var heart_image, lives;
var score, count, kill;

var inv1;

var sanitizer, sanitizer1_img, sanitizer2_img,  sanitizerGroup;
var virus, virus_image, virusGroup;
var bullet, bullet_image, bulletGroup;
var player, player_image;

var gameOver, gameOver_image;
var restart, restart_image;

function preload() {
  
  ground_image = loadImage("ground.png");
  player_image = loadImage("player.png");
  bullet_image = loadImage("bullet.jpg");
  mask_image = loadImage("mask.jpg");
  sanitizer1_img = loadImage("sanitizer1.jpg");
  sanitizer2_img = loadImage("sanitizer2.png");
  virus_image = loadImage("virus.jpg");
  heart_image = loadImage("heart.png");
  gameOver_image = loadImage("gameover.png");
  restart_image =  loadImage("restart.jpg");
  
}

function setup() {
  createCanvas(800, 500);
  
  player = createSprite(150,350);
  player.addImage(player_image);
  player.scale = 0.5;
  
  gameOver = createSprite(150, 50);
  gameOver.addImage(gameOver_image);
  gameOver.scale = 1.3;
  gameOver.visible = false;
  
  restart = createSprite(100, 410);
  restart.addImage(restart_image);
  restart.scale = 0.3;
  restart.visible = false;
  
  ground = createSprite(400, 450, 1600, 100);
  ground.shapeColor="brown";
  ground.x = ground.width /2;
  ground.velocityX = -6;
  
 
  inv1 = createSprite(400, 420, 800, 10);
  inv1.visible = false;
  
  lives = 3;
  score = 0;
  count = 0;
  kill = 0;
  
  maskGroup = new Group();
  sanitizerGroup = new Group();
  virusGroup = new Group();
  bulletGroup = new Group();
}

function draw() {
  
    fill("black");
    stroke("skyblue");
    textSize(40);
    textFont("cursive");
    textStyle(BOLD);
  text("Lives : " + lives, 400, 100);
  text("Masks : " + score, 400, 180);
  text("Sanitizers : " + count, 400, 260);
  text("Virus : " + kill, 400, 340);
  
  if(gameState==="start") {
  
    player.visible = false;
    ground.visible = false;
    bulletGroup.visible = false;
    
    fill("black");
    stroke("skyblue");
    textSize(20);
    textFont("cursive");
    textStyle(BOLD);
    background("skyblue");
    text("GAME STORY :", 20, 30);
    text("Corona Virus Is Leaked From China's Wuhan Lab.",100, 70);
    text("And Due To Coronavirus At World The Mask And Sanitizer Numbers Are Come", 20, 120);
    text("At End And Other Side The Number Of People Died Cases  Increases Day By ", 20, 170);
    text("Day. The World Is Trust Upon You. To See That You Are Responsible To Make ", 15, 220);
    text("Trust Of World Or Not. So WHO Give You A Responsibility To Collect All ", 20, 270);
    text("Sanitizers And Mask And To Kill The Coronavirus. For This WHO Give You A", 20, 320); 
    text("Tank To Fight Againt Coronavirus And Collect All Masks And Sanitizers.",20, 370);
    textSize(30);
    text("PRESS ENTER TO READ GAME INSTRUCTIONS ", 20, 470);

    
   if(keyDown("enter")) {
      gameState = "start2";
    }
  }
    else if(gameState==="start2") {
      
     
      fill("black");
      textSize(20);
      textFont("cursive");
      textStyle(BOLD);
      background("blue");
      text("Game Intructions", 20, 50);
      text("1. Bullet is released through tank by pressing space.",20, 100);
      text("2. You can move left, right and up to tank.",20, 150);
      text("3. There are 3 lives if you collect masks and sanitizers then the",20, 200);
      text(" life is increaed by 1.", 20, 250);
      text("4. Don't shoot mask and sanitizers kill only virus.", 20, 300);
      textSize(30);
      text("PRESS S TO PLAY GAME", 100, 390);
      
     if(keyDown("s")) {
       gameState = "play";
     }
    }
    
  
    
  if(gameState==="play") {

     background(250);
  
    player.visible = true;
    ground.visible = true;
    bulletGroup.visible = true;
    
  if(keyDown("space")) {
   createBullet();
  }
  
  if(keyDown("up_arrow") && player.y >= 340) {    
    player.velocityY = -12;
  }

    if(keyDown("left_arrow")) {
      player.x = player.x -3;
    }
    
    if(keyDown("right_arrow")) {
      player.x = player.x +3;
    }
    
    
  ground.velocityX = -6;
  
  player.velocityY = player.velocityY + 0.8
  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    if(maskGroup.isTouching(player)) {
      maskGroup.destroyEach();
      lives = lives +1;
      score = score+1;
    }
    
    
    if(sanitizerGroup.isTouching(player)) {
      sanitizerGroup.destroyEach();
      lives = lives +1;
      count = count+1;
    }
    
    
    if(bulletGroup.isTouching(virusGroup)) {
      bulletGroup.destroyEach();
      virusGroup.destroyEach();
      kill = kill+1;
    }
    
    
    if(virusGroup.isTouching(player)) {
      virusGroup.destroyEach();
      lives = lives -1;
    }
    
    if(lives===0) {
      gameState = "end"
    }
    
  player.collide(inv1);
    
  spawnMask();
  spawnSanitizer();
  spawnVirus();
  
    if(bulletGroup.isTouching(maskGroup) || bulletGroup.isTouching(sanitizerGroup)) {
      gameState = "end";
    }
  }
  
  if(gameState==="end") {
    
    bulletGroup.destroyEach();
    maskGroup.destroyEach();
    sanitizerGroup.destroyEach();
    virusGroup.destroyEach();
    player.visible = false;
    ground.visible = false;
    
    gameOver.visible = true;
    restart.visible = true;
    
     stroke("yellow");
     fill("yellow");
     textSize(30);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  drawSprites();
}

// Creating  arrows for bow
function createBullet() {
  bullet = createSprite(400, 100, 5, 10);
  
  bullet.addImage(bullet_image);
  bullet.x = 300;
  bullet.y = player.y;
  bullet.velocityX = 4;
  bullet.lifetime =200;
  bullet.scale = 0.1;
  
  bulletGroup.add(bullet);
  
  return bullet;
}

function spawnMask() {
  
  if (frameCount % 80 === 0) {
    var mask = createSprite(800,350);
    mask.y = Math.round(random(280,350));
    mask.addImage(mask_image);
    mask.scale = 0.1;
    mask.velocityX = -4;
  
    mask.lifetime = 200;
    
     maskGroup.add(mask);
  }
}

function spawnSanitizer() {
  
  if (frameCount % 120 === 0) {
    var sanitizer = createSprite(800,350);
    sanitizer.y = Math.round(random(280,350));
    
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: sanitizer.addImage(sanitizer1_img);
              break;
      case 2: sanitizer.addImage(sanitizer2_img);
        sanitizer.scale = 0.01;
              break;
        default: break;
    }
    
    sanitizer.scale = 0.1;
    sanitizer.velocityX = -4;
  
    sanitizer.lifetime = 200;
    
    
     sanitizerGroup.add(sanitizer);
  }
}

function spawnVirus() {
  
   if (frameCount % 150 === 0) {
    var virus = createSprite(800,350);
    virus.x = Math.round(random(500,800));
    virus.y = Math.round(random(250,350));
    virus.addImage(virus_image);
    virus.scale = 0.2;
    virus.velocityX = -5;
  
    virus.lifetime = 160;
    
    virusGroup.add(virus);
  }
}

function reset() {
  
  gameState = "play";
  
   player.visible = true;
  
  gameOver.visible = false;
  restart.visible = false;
  
  ground.visible = true;
  
}
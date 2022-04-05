var towerImg, doorImg, climberImg, ghostImg;
var tower
var ghost
var blockGroup,climberGroup, doorGroup;

var gamestate="play"
function preload(){
  towerImg=loadImage("Images/tower.png")
  doorImg=loadImage("Images/door.png")
  climberImg=loadImage("Images/climber.png")
  ghostImg = loadImage("Images/ghost-standing.png");
}

function setup() {
  createCanvas(600,600);
  blockGroup=new Group()
  climberGroup=new Group()
  tower=createSprite(300,300)
  tower.addImage(towerImg)
  tower.velocityY=1.5
  
  ghost=createSprite(300,400)
  ghost.addImage(ghostImg)
  ghost.scale=0.35
  
  doorGroup = new Group();
}


function draw() {
  background(0); 
  
  if(gamestate==="play"){
    SpawnDoors()
    //Infinite tower
    if(tower.y>600){
      tower.y=300
    }
    //Gravity
    ghost.velocityY=ghost.velocityY+0.8
    
    if(keyDown("space")){
      ghost.velocityY=-8
    }
    if(keyDown("right_arrow")){
      ghost.x=ghost.x+4
    }
    if(keyDown("left_arrow")){
      ghost.x=ghost.x-4
    }
    if(ghost.isTouching(blockGroup) || ghost.y>600){
      gamestate="end"
    }
    ghost.collide(climberGroup)
    drawSprites();
  }

  else{
    climberGroup.destroyEach()
    blockGroup.destroyEach()
    doorGroup.destroyEach()
    textSize(30);
    fill("yellow");
    text("Game Over",250,250)
    //ghost.destroy()
    //tower.destroy()
  }
  
 
 
 
}

function SpawnDoors(){
  if(frameCount%180===0){
    var door=createSprite(random(120,480),-60)
    door.addImage(doorImg)
    door.velocityY=1.5
    doorGroup.add(door);
    
    var climber=createSprite(door.x,0)
    climber.addImage(climberImg)
    climber.velocityY=1.5
    climberGroup.add(climber);  
    var invisibleblock=createSprite(door.x,10, 80, 5);
    invisibleblock.velocityY=1.5
       blockGroup.add(invisibleblock)
       ghost.depth=door.depth
       ghost.depth++
       invisibleblock.visible=false
  }

}
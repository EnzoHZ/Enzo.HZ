
var trex, trex_correndo, trexcolide    
    
var solo, soloinvisivel, imagemdosolo;

var nuvem, grupodenuvens, imagemdanuvem;

var grupodeobstaculos, obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6;

var jogar=1

var encerrar=0

var estadojogo=jogar

var sommorte, somsalto

var gameover,gameover_image

var resetar,resetar_image

var pontuacao


function preload(){
  
  trex_correndo = loadAnimation("trex1.png","trex3.png","trex4.png");
  trexcolide=loadAnimation("trex_collided.png")
  
  imagemdosolo = loadImage("ground2.png");
  
  imagemdanuvem = loadImage("cloud.png");
  
  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
  
  resetar_image= loadImage("restart.png")
  
  sommorte=loadSound("die.mp3")
  somsalto=loadSound("jump.mp3")
  
  gameover_image=loadImage("gameOver.png")
  
  
}


function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_correndo);
  trex.addAnimation("collided", trexcolide)
  trex.scale = 0.5;
  
  solo = createSprite(200,180,400,20);
   solo.addImage("ground",imagemdosolo);
   solo.velocityX = -4;  
  
  gameover=createSprite(300,100)
   gameover.addImage(gameover_image)
   gameover.scale=0.5
   gameover.visible=false

    
  soloinvisivel = createSprite(200,190,400,10);
  soloinvisivel.visible = false;
  
   resetar=createSprite(300,140)
   resetar.addImage(resetar_image)
   resetar.scale=0.5
   resetar.visible=false
  
   pontuacao=0
  
  
 grupodeobstaculos=createGroup()
  grupodenuvens=createGroup()
  
  
  
}



function draw() {
  
  background("white");
 
  text("pontuação: "+ pontuacao,500,50)
 
if (estadojogo===jogar)  {
 
pontuacao=pontuacao+Math.round(frameCount/60)
 solo.velocityX=-(10*pontuacao/100)
 grupodeobstaculos.velocityX=-(10*pontuacao/100)
    
    //saltar quando a tecla de espaço é pressionada
    if(keyDown("space")&& trex.y >= 100) {
       trex.velocityY = -13;
       somsalto.play()
      
  }
    
    
    if (solo.x < 0){
      solo.x = solo.width/2;
    }
    
  
    //adicionar gravidade
    trex.velocityY = trex.velocityY + 0.8
  
    //evita que o Trex caia no solo
  trex.collide(soloinvisivel);
  
  //gerar as nuvens
    gerarNuvens();
  
    //gerar obstáculos no solo
    gerarObstaculos();
   
  if (grupodeobstaculos.isTouching(trex)){
    estadojogo=encerrar;
    sommorte.play()
  }
}
  else if (estadojogo===encerrar){
    solo.velocityX=0
    trex.velocityY=0
    gameover.visible=true
    resetar.visible=true
    
    trex.changeAnimation("collided",trexcolide)
    
    grupodeobstaculos.setVelocityXEach(0);
    grupodenuvens.setVelocityXEach(0);
    
if (mousePressedOver(resetar)){
   reset()
}
  
}
  

  drawSprites();
}



function gerarObstaculos(){
 if (frameCount % 60 === 0){
   var obstaculo = createSprite(400,165,10,40);
  obstaculo.velocityX = -6;
    obstaculo.scale = 0.5;
   
   
   
      
    //gerar obstáculos aleatórios
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstaculo.addImage(obstaculo1);
              break;
      case 2: obstaculo.addImage(obstaculo2);
              break;
      case 3: obstaculo.addImage(obstaculo3);
              break;
      case 4: obstaculo.addImage(obstaculo4);
              break;
      case 5: obstaculo.addImage(obstaculo5);
              break;
      case 6: obstaculo.addImage(obstaculo6);
              break;
      default: break;
    }
   
    
    grupodeobstaculos.add(obstaculo);
   
 }
}



function gerarNuvens() {
  //escreva o código aqui para gerar as nuvens 
  if (frameCount % 60 === 0) {
    nuvem = createSprite(600,100,40,10);
    nuvem.addImage(imagemdanuvem);
    nuvem.scale = 0.5;
    nuvem.velocityX = -3;
      
    //ajustando a profundidade
    nuvem.depth = trex.depth;
    trex.depth = trex.depth + 1;
   
    grupodenuvens.add(nuvem)
  }
}

function reset(){
  
  estadojogo=jogar
  
  gameover.visible=false
  resetar.visible=false
  
  grupodeobstaculos.destroyEach()
  grupodenuvens.destroyEach()
  
  trex.changeAnimation("running",trex_correndo)
  
  pontuacao=0
 
  
}

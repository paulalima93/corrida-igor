class Game {
  constructor() {
    this.leftKeyActive = false;
    this.blast = false;
  }

start() {
    
    bike1 = createSprite(this.positionX,this.positionY);
    bike2 = createSprite(this.positionX,this.positionY);
    bike3 = createSprite(this.positionX,this.positionY);
    bike4 = createSprite(this.positionX,this.positionY);
    
    bike1.addImage(bike1img);
    bike1.addImage("blast", blastImage);

    bike2.addImage(bike2img);
    bike2.addImage("blast", blastImage);

    bike3.addImage(bike3img);
    bike3.addImage("blast", blastImage);

    bike4.addImage(bike4img);
    bike4.addImage("blast", blastImage);
    
    bike1.scale = 0.1;
    bike2.scale = 0.1;
    bike3.scale = 0.1;
    bike4.scale = 0.1;
    
    bikes = [bike1, bike2, bike3, bike4];
    
    if (gameState === 0) {
      form = new Form();
      form.display();
      player = new Player();
      player.getCount();
    }
    
  } 
    
    
getState(){
    var gameStateref = database.ref("gameState");
    gameStateref.on("value",function(data){
        gameState = data.val();
    });
}
 update(state){
     database.ref("/").update({
         gameState: state
     });
 }
    
 play(){
     form.hide();
     Player.getPlayersInfo();
     player.getBikesAtEnd();
     this.playerControls();

     if(allplayers !== undefined){
      background("#263238");
      image(trackimg, 0, -height * 4 , width , height * 5);

      var index = 0;
      var x;
      var y;

      for( var p in allplayers) {
        index = index + 1;
        x = allplayers[p].positionX;
        y = allplayers[p].positionY;

        bikes[index-1].x = x;
        bikes[index-1].y = y;

        if(player.blast && player.index === index){
          bikes[index-1].changeImage("blast");
          bikes[index-1].scale = 0.3;
        }

        if(keyIsDown(87) && !player.blast){
          bikes[index-1].rotation = allplayers[p].rotation;
        }
      
        if(keyIsDown(65) && !player.blast){
          bikes[index-1].rotation = allplayers[p].rotation;
        }
      
        if (keyIsDown(68) && !player.blast) {
          bikes[index-1].rotation = allplayers[p].rotation;
        }

        if(index === player.index){
          fill("red");
          stroke("black");
           ellipse(x, y, 50,50) ;

          camera.position.x = width/2;
          camera.position.y = bikes[index-1].y;
        }
        this.handleBikeCollision(player.index);

      }

      if(player.distance > 2300){
          gameState = 2;
          player.rank += 1;
          player.updateBikesAtEnd(player.rank)
          player.update();
      }
       
      drawSprites();
     } 
 }


 handleBikeCollision(index){
  //se eu sou player 1
  if (index-1 === 0) {
    if(bikes[index-1].collide(bikes[1]) ||
      bikes[index-1].collide(bikes[2]) ||
      bikes[index-1].collide(bikes[3])){
        player.blast = true;
        player.update();
    }
  }

    //se eu sou player 2
    if (index-1 === 1) {
      if(bikes[index-1].collide(bikes[0]) ||
        bikes[index-1].collide(bikes[2]) ||
        bikes[index-1].collide(bikes[3])){
          player.blast = true;
          player.update();
      }
    } 
    //se eu sou player 3

    if (index-1 === 2) {
      if(bikes[index-1].collide(bikes[0]) ||
        bikes[index-1].collide(bikes[1]) ||
        bikes[index-1].collide(bikes[3])){
          player.blast = true;
          player.update();
      }
    }
    //se eu sou player 4

    if (index-1 === 3) {
      if(bikes[index-1].collide(bikes[0]) ||
        bikes[index-1].collide(bikes[1]) ||
        bikes[index-1].collide(bikes[2])){
          player.blast = true;
          player.update();
      }
    }
 }


 end(){
  form.end();
 }

 playerControls(){
  if(keyIsDown(87) && !player.blast){
    player.positionY -= 10;
    player.distance += 10;
    player.rotation = 0;
    player.update()
  }

  if(keyIsDown(65) && !player.blast){
    player.positionX -= 10;
    player.rotation = -25;
    player.update();
  }

  if (keyIsDown(68) && !player.blast) {
    player.positionX += 10;
    player.rotation = 25;
    player.update();
  }
 }
}

























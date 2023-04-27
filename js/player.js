class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.distance = 0;
    this.positionX = 0;
    this.positionY = 400;
    this.rank = 0;
    this.rotation = 0;
    this.blast = false;
   }
  
  
  getCount() {
    var playerCountref = database.ref("playerCount");
    playerCountref.on("value", data => {
      playerCount = data.val();
    });
  }
  
   updateCount(count) {
    database.ref("/").update({
      playerCount: count
    });
  }
  
 addPlayer() {
    if (this.index === 1) {
      this.positionX = width / 2 - 250;
    } else if (this.index === 2) {
      this.positionX = width / 2 - 100;
    } else if (this.index === 3) {
      this.positionX = width / 2 + 100;
    } else if (this.index === 4) {
      this.positionX = width / 2 + 250;
    }

    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
      rank: this.rank,
      distance: this.distance,
      rotation: this.rotation,
      blast:this.blast
    });
  }

 static getPlayersInfo(){
  var playerInfoRef = database.ref("players");
  playerInfoRef.on("value", data=> {
    allplayers = data.val()
   
  })
 }

 update(){
  var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).update({
      positionX: this.positionX,
      positionY: this.positionY,
      rank: this.rank,
      distance: this.distance,
      rotation: this.rotation,
      blast:this.blast
    });
 }

 getBikesAtEnd(){
  database.ref("bikesAtEnd").on("value", data => {
    this.rank = data.val()
  })
 }

 updateBikesAtEnd(rank){
  database.ref("/").update({
   bikesAtEnd: rank
  })
 }

}

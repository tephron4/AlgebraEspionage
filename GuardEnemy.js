class Enemy {
    constructor(width, height, x, y, x_velocity, lowerBound, upperBound, hasKeyCard) {

    this.x_velocity = x_velocity;

    this.lowerBound = lowerBound;
    this.upperBound = upperBound;

    this.turnPauseTimer = 0;
    this.playerX = 0;
    this.body = createSprite(x, y, width, height);
    this.body.addAnimation("goRight", "data/enemyRight1.png", "data/enemyRight1.png");
    this.body.addAnimation("goLeft", "data/enemyLeft1.png", "data/enemyLeft1.png");
    this.facingLeft = true;
    this.followingPlayer = false;
    this.alert = createSprite(x, y-32, 15, 30);
    this.alert.addAnimation("idle", "assets/exclamation/exclamation16.png", "assets/exclamation/exclamation16.png");
    this.alert.addAnimation("alerted", "assets/exclamation/exclamation1.png", "assets/exclamation/exclamation15.png");
    
    //shows the keycard above the enemy
    this.alert.addAnimation("show", "assets/keycard/keycard1.png", "assets/keycard/keycard15.png");
    this.playingSlowWhir = false;
    this.playingFastWhir = false;
    this.playingAlert = false;
    this.hasKeyCard = hasKeyCard;
    this.playerHiding = false;
  }

  drawE() {
  }

  move() {
    if(this.hasKeyCard){
      this.alert.changeAnimation("show");
    } else{
      this.alert.changeAnimation("idle");
    }
    
    this.followingPlayer = false;
    if (this.turnPauseTimer != 0) {
      this.turnPauseTimer -= 1;
      if(this.turnPauseTimer == 0){
        this.facingLeft = !this.facingLeft;
      }
    } else if (this.body.position.x >= this.lowerBound && this.facingLeft) {
      this.body.position.x -= this.x_velocity;
      if(!slowWhir.isPlaying()){
        this.playingSlowWhir = true;
        slowWhir.play();
      }
    } else if (this.body.position.x <= this.lowerBound && this.facingLeft) {
      this.turnPauseTimer = 100;
      //this.facingLeft = false;
      this.alert.changeAnimation("idle");
      if(slowWhir.isPlaying()){
          slowWhir.pause();
          this.playingSlowWhir = false;
      }
    } else if (this.body.position.x <= this.upperBound && !this.facingLeft) {
      this.body.position.x += this.x_velocity;
      if(!slowWhir.isPlaying()){
        this.playingSlowWhir = true;
        slowWhir.play();
      }
    } else if (this.body.position.x >= this.upperBound && !this.facingLeft) {
      this.turnPauseTimer = 100;
      //this.facingLeft = true;
      this.alert.changeAnimation("idle");
      if(slowWhir.isPlaying()){
          slowWhir.pause();
          this.playingSlowWhir = false;
      }
    }
    this.alert.position.x = this.body.position.x;
    if(this.facingLeft){
      this.body.changeAnimation("goLeft");
    } else {
      this.body.changeAnimation("goRight");
    }
  }

  canSeePlayer() {
    if (this.facingLeft && this.playerX > this.body.position.x - 200 && this.playerX < this.body.position.x && !this.playerHiding && this.playerX > this.lowerBound  && this.playerX < this.upperBound) {
      this.alert.changeAnimation("alerted");
      if(!this.playingAlert){
          alertSound.play(0);
          this.playingAlert = true;
      }
      if(this.playingSlowWhir){
          slowWhir.pause();
          this.playingSlowWhir = false;
      }
      this.alert.position.x = this.body.position.x;
      return true;
    } else if (!this.facingLeft && this.playerX < this.body.position.x + 200 && this.playerX > this.body.position.x && !this.playerHiding && this.playerX > this.lowerBound  && this.playerX < this.upperBound) {
      this.alert.changeAnimation("alerted");
      if(slowWhir.isPlaying()){
          slowWhir.pause();
          this.playingSlowWhir = false;
      }
      if(!this.playingAlert){
          alertSound.play(0);
          this.playingAlert = true;
      }
      this.alert.position.x = this.body.position.x;
      return true;
    } else {
      if(this.playingAlert){
          //alertSound.pause();
          this.playingAlert = false;
      }
      return false;
    }
  }

  followPlayer() {
    if (this.body.position.x > this.lowerBound && this.facingLeft) {
      this.body.position.x -= this.x_velocity * 2;
      this.alert.position.x = this.body.position.x;
      if(!fastWhir.isPlaying()){
          fastWhir.play();
          this.playingFastWhir = true;
      }
    } else if (this.body.position.x < this.lowerBound && this.facingLeft) {
      this.turnPauseTimer = 100;
      this.facingLeft = false;
      this.followingPlayer = false;
      this.alert.changeAnimation("idle");
      if(fastWhir.isPlaying()){
          fastWhir.pause();
          this.playingFastWhir = false;
      }
      if(this.playingAlert){
          //alertSound.pause();
          this.playingAlert = false;
      }
    } else if (this.body.position.x < this.upperBound && !this.facingLeft) {
      this.body.position.x += this.x_velocity * 2;
      this.alert.position.x = this.body.position.x;
      if(!fastWhir.isPlaying()){
          fastWhir.play();
          this.playingFastWhir = true;
      }
    } else if (this.body.position.x > this.upperBound && !this.facingLeft) {
      this.turnPauseTimer = 100;
      this.facingLeft = true;
      this.followingPlayer = false;
      this.alert.changeAnimation("idle");
      if(fastWhir.isPlaying){
          fastWhir.pause();
          this.playingFastWhir = false;
      }
      if(this.playingAlert){
          //alertSound.pause();
          this.playingAlert = false;
      }
    }
  }
}//end Enemy class

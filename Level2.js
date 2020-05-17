function Level2() {
  var tmap;
  var x, y;
  var player;
  var enemy;
  var enemy2;
  var mapDimentions;
  var x_velocity;
  var y_velocity;
  var lastx;
  var lasty;
  var collidableIndexes;
  var size;
  var jumptimer;
  var jumping;
  var runningSound;
  var inventory;
  var computerX;
  var endLevelX;
  var isHidingBehind;
  var vignette;
  var lowerBound;
  var upperBound;
  var lowerBound2;
  var upperBound2;
  var lightsPosition;
  var lastOnButton;
  var benchX;
  var doorStillThere;
  var fadeNum;
  var computerIsAlerted;
  var map;
  var p;
  var enemyHasCard;
  var enemy2HasCard;

  this.setup = function() {
    currentScene = Level2;

    tmap = loadTiledMap("office2", "data");
    initializeMap();
    background('#14191d');
    var playerImg = loadImage('player.png');
    backToMenu = loadImage('assets/backToMenu.png');
    backToMenuPressed = loadImage('assets/backToMenuPressed.png');
    vignette = loadImage('assets/levelVignette.png');
    hidingVignette = loadImage('assets/levelVignetteHiding.png');
    scanlines = loadImage('assets/scanlines.png');
    lights = loadImage('assets/lightsLevel1.png');
    bench = loadImage('assets/bench.png');
    elevatorDoorImg = loadImage('assets/elevatorDoor.png');
    inventoryBorder = loadImage('assets/inventory.png');
    inventoryKeycard = loadImage('assets/inventoryKeycard.png');
    trashcanImg = loadImage('assets/trashcan.png');

    gameTheme.setVolume(0.05);

    //is the elavator door there
    doorStillThere = true;

    //used for fading in and out in the beginning and end of the level
    fadeNum = 255;

    runningSound = false;

    //length of a side of the tiles
    size = 32;

    //x and y velocity of the player
    x_velocity = 0;
    y_velocity = 0;

    //last value of player's x position
    lastx = 100;

    //x position of the bench
    benchX = 600;

    //jumpTimer delays jumping slightly between jumps
    jumpTimer = 15;
    jumping = true;

    //is the player hiding behind an object
    isHidingBehind = false;

    lastOnButton = false;

    enemyHasCard = true;
    enemy2HasCard = true;

    computerIsAlerted = false;

    //array of all the level tiles
    map = tmap.getData(0);

    //id number of collidable tiles in the map
    collidableIndexes = [41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 5, 15, 17, 7, 40, 30, 20, 8, 9];

    //creating a group of all invisible collidable objects for the floor/walls 
    collidables = new Group();

    //represents a vector of the map's dimentions (x, y)
    mapDimentions = tmap.getMapSize();

    //size of the tilemap
    p = tmap.getMapSize();

    for (var x=0; x<map.length; x++) {
      if (map[x] == 26) {
        computerX = ((x % mapDimentions.x)*32);
      } else if (map[x] == 28) {
        endLevelX = ((x % mapDimentions.x)*32);
      }
      if (collidableIndexes.includes(map[x])) {
        var collidable = createSprite(((x % mapDimentions.x)*32)+16-90, ((floor(x / mapDimentions.x))*32)+16+((p.y / 2)*32), 32, 32);
        collidable.shapeColor = color(0, 0, 255, 0);// color of map collisions (set to invisible if not debugging)
        collidable.setCollider('rectangle', 0, 16, 32, 16);
        collidables.add(collidable);
      }
    }

    //player inventory 
    inventory = {
    label:
    'INVENTORY', 
    textColor:
    '#f1f1f1', 
    background:
    '#dde1e0', 
    keycard:
    '#cfc4aa', 
    x:
    10, 
    y:
    10, 
    width:
    270, 
    height:
    125, 
    keycards:
    0, 
    maxCards:
    3
  };
}

//creates the player, enemies and interactable objects
function initializeEntities() {
  runRight = loadAnimation("playerSprite/colored/runRight/player6.png", "playerSprite/colored/runRight/player9.png");
  runLeft = loadAnimation("playerSprite/colored/runLeft/player2.png", "playerSprite/colored/runLeft/player5.png");
  runRight.frameDelay = 9;
  runLeft.frameDelay = 9;
  player = createSprite(100, 200, 48, 48);
  player.addAnimation("runRight", runRight);
  player.addAnimation("runLeft", runLeft);
  player.addAnimation("waitLeft", "playerSprite/colored/player1.png", "playerSprite/colored/player1.png");
  player.addAnimation("waitRight", "playerSprite/colored/player5.png", "playerSprite/colored/player5.png");

  player.setCollider('rectangle', 16, 4, 16, 44);

  lastx = 100;

  enemy = new Enemy(32, 32, 600, 272, 1, 550, 1000, enemyHasCard);
  enemy.body.setCollider('rectangle', 11, 10, 10, 26);

  enemy2 = new Enemy(32, 32, 600, 272, 1, 172, 600, enemy2HasCard);
  enemy2.body.setCollider('rectangle', 11, 10, 10, 26);

  compAlert = createSprite(computerX - 84, 220, 15, 30);
  compAlert.addAnimation("idle", "assets/exclamation/exclamation16.png", "assets/exclamation/exclamation16.png");
  compAlert.addAnimation("alerted", "assets/exclamation/exclamation1.png", "assets/exclamation/exclamation15.png");
  compAlert.changeAnimation("idle");

  benchSprite = createSprite(600, 276, 72, 23);
  benchSprite.addImage(bench);
  benchSprite.setCollider('rectangle', 24, 0, 60, 23);
  
  benchSprite2 = createSprite(250, 276, 72, 23);
  benchSprite2.addImage(bench);
  benchSprite2.setCollider('rectangle', 24, 0, 60, 23);

  trashcan = createSprite(900, 271, 22, 32);
  trashcan.addImage(trashcanImg);
  trashcan.setCollider('rectangle', 24, 0, 10, 32);

  elevatorDoorSprite = createSprite(1086, 253, 4, 64);
  elevatorDoorSprite.addImage(elevatorDoorImg);
  elevatorDoorSprite.setCollider('rectangle', 10, 0, 4, 64);

  lightsPosition = -101;
  fadeNum = 255;
} 


//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX//start of draw function
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
this.draw = function() {
  background('#000202');

  tmap.draw(x, y);

  if (answeredQuestion) {
    collidableIndexes = [41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 5, 15, 17, 7, 40, 30, 20, 8, 9];
  }

  if (oneSprite) {
    initializeEntities();
    lowerBound = enemy.lowerBound;
    upperBound = enemy.upperBound;
    lowerBound2 = enemy2.lowerBound;
    upperBound2 = enemy2.upperBound;
    oneSprite = false;
    gameTheme.loop();
  }

  //creates the computer alert if the player gets a keycard
  if (inventory.keycards == 2 && !computerIsAlerted) {
    if (answeredQuestion) {
      compAlert.changeAnimation("idle");
    } else {
      compAlert.changeAnimation("alerted");
    }
    computerIsAlerted = true;
    compAlertSound.setVolume(0.2);
    compAlertSound.play();
  }

  player.collide(collidables);

  if (doorStillThere && answeredQuestion) {
    elevatorDoor.play();
    elevatorDoorSprite.remove();
    doorStillThere = false;
  }

  if (doorStillThere) {
    player.collide(elevatorDoorSprite);
  }
  movement();


  if (mouseX > 670 && mouseX < 780 && mouseY > 540 && mouseY < 575) {
    if (!lastOnButton) {
      buttonTick.play();
    }
    image(backToMenuPressed, 670, 540);
    lastOnButton = true;
  } else {
    image(backToMenu, 670, 540);
    lastOnButton = false;
  }

  enemy.playerX = player.position.x;
  enemy.playerHiding = isHidingBehind;
  enemy2.playerX = player.position.x;
  enemy2.playerHiding = isHidingBehind;

  if (enemy.turnPauseTimer == 0 && enemy.canSeePlayer()) {
    if (!enemy.followingPlayer) {
      enemy.followingPlayer = true;
    } else if (enemy.followingPlayer) {
      enemy.followPlayer();
    }
  } else {
    enemy.alert.changeAnimation("idle");
    fastWhir.pause();
    enemy.move();
  }
  if (enemy2.turnPauseTimer == 0 && enemy2.canSeePlayer()) {
    if (!enemy2.followingPlayer) {
      enemy2.followingPlayer = true;
    } else if (enemy2.followingPlayer) {
      enemy2.followPlayer();
    }
  } else {
    enemy2.alert.changeAnimation("idle");
    fastWhir.pause();
    enemy2.move();
  }

  if (!player.overlap(benchSprite) && !player.overlap(trashcan) && !player.overlap(benchSprite2)) {
    isHidingBehind =  false;
  }

  if (isHidingBehind) {
    benchSprite.depth = 1;
    benchSprite2.depth = 1;
    trashcan.depth = 2;
    player.depth = 0;
  } else {
    benchSprite.depth = 0;
    benchSprite2.depth = 0;
    trashcan.depth = 1;
    player.depth = 2;
  }

  drawSprites();

  if (isHidingBehind) {
    image(hidingVignette, player.position.x - 1200, 120);
  } else {
    image(vignette, player.position.x - 1200, 130);
  }
  tint(255, 100);

  blendMode(ADD);
  image(lights, lightsPosition, 128);

  blendMode(BLEND);

  image(scanlines, 0, 0);
  tint(255, 255);
  drawInventory();

  //resets level if the player touches the bot
  if ((player.overlap(enemy.body) || player.overlap(enemy2.body)) && !isHidingBehind) {
    caught.play();
    inventory.keycards = 0;
    enemy.body.remove();
    enemy.alert.remove();
    enemy2.body.remove();
    enemy2.alert.remove();
    player.remove();
    benchSprite.remove();
    benchSprite2.remove();
    trashcan.remove();
    elevatorDoorSprite.remove();
    enemy.lowerBound = lowerBound;
    enemy.upperBound = upperBound;
    enemy2.lowerBound = lowerBound;
    enemy2.upperBound = upperBound;
    gameTheme.pause();
    oneSprite = true;
    if (computerIsAlerted) {
      compAlert.changeAnimation("idle");
      computerIsAlerted = false;
    }
    enemyHasCard = true;
    enemy2HasCard = true;
    for (var u=0; u<collidables.length; u++) {
      var col = collidables[u];
      col.position.x -= 100 - lastx;
    }
  }

  //displays text if the player is hiding
  if (isHidingBehind) {
    textSize(20);
    text ("Player is hiding", 20, 155);
  }

  //fade in function
  if (fadeNum > 0) {
    fill(0, 0, 0, fadeNum);
    fadeNum -= 3;
    rect(0, 0, 800, 600);
  }

  //code for debugging colliders
  //fill(255, 0, 0, 100);

  //enemy boundaries
  //rect(enemy.lowerBound, 290, 10, 30);
  //rect(enemy.upperBound, 290, 10, 30);

  //debugging player collider
  //rect(player.position.x-8, player.position.y-20, 16, 44);

  //debugging bench collider
  //rect(benchSprite.position.x-36, benchSprite.position.y-12, 72, 23);
}
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX//end of draw function
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

//initializes the tilemap
function initializeMap() {
  var p = tmap.getMapSize();
  y = -(p.y / 2)*32;
  x = 0;
  noSmooth();
}

this.mousePressed = function() {
  if (mouseX > 670 && mouseX < 780 && mouseY > 540 && mouseY < 575) {
    buttonPress.play();

    slowWhir.pause();
    fastWhir.pause();
    alertSound.pause();
    jump.pause();
    landing.pause();
    gameTheme.pause();

    running.setVolume(0.1);
    running.play();
    menuTheme.play();
    player.remove();
    enemy.body.remove();
    enemy.alert.remove();
    enemy2.body.remove();
    enemy2.alert.remove();
    benchSprite.remove();
    benchSprite2.remove();
    trashcan.remove();
    elevatorDoorSprite.remove();
    if (computerIsAlerted) {
      compAlert.changeAnimation("idle");
      computerIsAlerted = false;
    }
    for (var u=0; u<collidables.length; u++) {
      var col = collidables[u];
      col.position.x -= 100 - lastx;
    }

    oneSprite = true;

    this.sceneManager.showScene(Menu);
  }
}

//draws the inventory
function drawInventory() {
  fill(inventory.background);
  image(inventoryBorder, inventory.x, inventory.y);
  fill(inventory.textColor);
  let labelSize = inventory.height/5;
  textSize(labelSize);
  let labelX = inventory.x + 10;
  let labelY = inventory.y + 5 + labelSize;
  text(inventory.label, labelX, labelY);
  fill(inventory.keycard);
  let cardSpace = 10;
  let cardWidth = (inventory.width - ((inventory.maxCards+1) * cardSpace)) / inventory.maxCards;
  let cardHeight = (inventory.height / 3);
  let cardY = labelY + ((((inventory.y + inventory.height) - labelY) - cardHeight) / 2);
  for (let i=0; i<inventory.keycards; i++) {
    let cardX = inventory.x + (cardSpace + (cardSpace * i)) + (i * cardWidth);
    image(inventoryKeycard, cardX+10, cardY-10);
  }
}

function movement() {

  //jumping
  if ((keyIsDown(UP_ARROW) || keyIsDown(87)) && !jumping && y_velocity == 0 && jumpTimer < 0) {
    y_velocity -= 18;
    jumping = true;
    jump.play();
    jumpTimer = 20;
  }
  jumpTimer--;

  //moving left
  if ((keyIsDown(LEFT_ARROW) || keyIsDown(65)) && player.position.x > 0) {
    player.position.x -= 2;

    if (!runningSound) {
      running.loop();
      runningSound = true;
    }
    //moving right
  } else if ((keyIsDown(RIGHT_ARROW) || keyIsDown(68)) && player.position.x < 640) {
    player.position.x += 2;

    if (!runningSound) {
      running.loop();
      runningSound = true;
    }
  } else {
    running.pause();
    runningSound = false;
  }

  //stops running sound effect if the player is standing still
  if (player.position.x - lastx == 0) {
    running.pause();
  }

  if (jumping) {
    running.pause();
    runningSound = false;
  }

  //Switches between the different player animations
  label = player.getAnimationLabel();
  if (lastx > player.position.x && (keyIsDown(LEFT_ARROW) || keyIsDown(65)) && (label == "runRight" || label == "waitRight" || label == "waitLeft")) {
    player.changeAnimation("runLeft");
  } else if (lastx < player.position.x && !player.overlap(elevatorDoorSprite) && (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) && (label == "runLeft" || label == "waitRight" || label == "waitLeft")) {
    player.changeAnimation("runRight");
  } else if (lastx == player.position.x && label == "runLeft") {
    player.changeAnimation("waitLeft");
  } else if (lastx == player.position.x && label == "runRight") {
    player.changeAnimation("waitRight");
  }

  //changes the x position of the map
  x = player.position.x;

  //need to compensate for the drift of the game camera
  enemy.body.position.x -= player.position.x - lastx;
  enemy.lowerBound -= player.position.x - lastx;
  enemy.upperBound -= player.position.x - lastx;
  lowerBound = enemy.lowerBound;
  upperBound = enemy.upperBound;

  enemy2.body.position.x -= player.position.x - lastx;
  enemy2.lowerBound -= player.position.x - lastx;
  enemy2.upperBound -= player.position.x - lastx;
  lowerBound2 = enemy2.lowerBound;
  upperBound2 = enemy2.upperBound;

  lightsPosition -= player.position.x - lastx;
  benchSprite.position.x -= player.position.x - lastx;
  benchSprite2.position.x -= player.position.x - lastx;
  trashcan.position.x -= player.position.x - lastx;

  compAlert.position.x -= player.position.x - lastx;

  if (doorStillThere) {
    elevatorDoorSprite.position.x -= player.position.x - lastx;
  }

  for (var y=0; y<collidables.length; y++) {
    var col = collidables[y];
    col.position.x -= player.position.x - lastx;
  }

  //gravity
  y_velocity += 1.3;

  //updates the previous position values for the player
  lastx = player.position.x;
  lasty = player.position.y;

  player.position.y += y_velocity;

  //friction on player
  x_velocity *= 0.8;
  y_velocity *= 0.9;

  collisions();
}

//collisions with the level map
function collisions() {
  let left_x = floor((player.position.x-16) / size);

  let top_y = floor((player.position.y-32) / size);

  let right_x = left_x + 1;

  let bottom_y = top_y + 1;

  for (var i=0; i<collidables.length; i++) {
    var l = collidables[i];

    //top collision
    if (player.position.x > l.position.x-28 && player.position.x < l.position.x+28 && player.position.y < l.position.y && player.position.y > l.position.y - 40) {
      player.position.y = (l.position.y - 40);
      y_velocity = 0;
      if (jumping) {
        landing.play();
      }
      jumping = false;
    }

    //bottom collision
    if (player.position.x > l.position.x-28 && player.position.x < l.position.x+28 && player.position.y > l.position.y && player.position.y < l.position.y + 36) {
      player.position.y = (l.position.y) + 36;
      y_velocity = 0;
    }
  }
}

//determines if the player is behind the enemy and can take the card from them
function behindEnemy() {
  if (enemy.facingLeft) {
    if (player.position.x > enemy.body.position.x) {
      if (player.position.x < (enemy.body.position.x + enemy.body.width + 80)) {
        return true;
      }
    } else {
      return false;
    }
  } else {
    if (player.position.x < (enemy.body.position.x + enemy.body.width)) {
      if (player.position.x > (enemy.body.position.x - 80)) {
        return true;
      }
    } else {
      return false;
    }
  }
}
function behindEnemy2() {
  if (enemy2.facingLeft) {
    if (player.position.x > enemy2.body.position.x) {
      if (player.position.x < (enemy2.body.position.x + enemy2.body.width + 80)) {
        return true;
      }
    } else {
      return false;
    }
  } else {
    if (player.position.x < (enemy2.body.position.x + enemy2.body.width)) {
      if (player.position.x > (enemy2.body.position.x - 80)) {
        return true;
      }
    } else {
      return false;
    }
  }
}

//the player takes the card if they are behind the enemy and the have one
function takeCard() {
  if (behindEnemy() && enemy.hasKeyCard) {
    inventory.keycards++;
    enemy.hasKeyCard = false;
    enemyHasCard = false;
    loaded.play();
  }
  if (behindEnemy2() && enemy2.hasKeyCard) {
    inventory.keycards++;
    enemy2.hasKeyCard = false;
    enemy2HasCard = false;
    loaded.play();
  }
}

//Asks the player a question if they have a card and are in front of the computer
function askQuestion() {
  if (inventory.keycards == 2 && player.position.x * 2 > computerX - (0.5 * size) && player.position.x * 2 < computerX + (1.5 * size)) {
    compAlert.changeAnimation("idle");
    computerIsAlerted = false;
    this.mgr.showScene(MathS);
  }
}

//lets the player go to the next level if they have completed the question and are in the elevator
function isAtEnd() {
  if (player.position.x * 2 > endLevelX && this.answeredQuestion) {
    this.answeredQuestion = false;
    inventory.keycards = 0;

    slowWhir.pause();
    fastWhir.pause();
    alertSound.pause();
    jump.pause();
    landing.pause();
    //gameTheme.pause();

    player.remove();
    enemy.body.remove();
    enemy.alert.remove();
    enemy2.body.remove();
    enemy2.alert.remove();
    benchSprite.remove();
    benchSprite2.remove();
    trashcan.remove();
    elevatorDoorSprite.remove();
    if (computerIsAlerted) {
      compAlert.changeAnimation("idle");
      computerIsAlerted = false;
    }

    var temp = collidables.length;
    for (var u=0; u<temp; u++) {
      var col = collidables[0];
      col.remove();
    }

    oneSprite = true;
    this.mgr.showScene(TheEnd);
  }
}

//determines if the player is hiding behind and object or not
function hidingBehind() {
  if (player.overlap(benchSprite) || player.overlap(trashcan) || player.overlap(benchSprite2)) {
    isHidingBehind =  !isHidingBehind;
  } else {
    isHidingBehind =  false;
  }
}

this.keyPressed = function() {
  if (keyCode === 69) {//e key
    askQuestion();
    isAtEnd();
    hidingBehind();
  } else if (keyCode === 32) {//space is for taking the keycard
    takeCard();
  }
  return false;
}
}//end of Level2 scene

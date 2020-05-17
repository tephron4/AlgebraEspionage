function Menu() {
  let frameNumber;
  var barWidth;
  var levelLoop1X;
  var levelLoop2X;
  var runningSound;
  var lastOnStartButton;
  var lastOnHelpButton;
  var playingTheme;
  var fadeNum;

  this.setup = function() {
    loadingBar = loadImage('assets/loadingBar.png');
    vignette = loadImage('assets/vignette.png');
    levelLoop1 = loadImage('assets/menuLevel.png');
    levelLoop2 = loadImage('assets/menuLevel.png');
    scanlines = loadImage('assets/scanlines.png');

    logo = loadImage('assets/name.png');
    play = loadImage('assets/playGameMenu.png');
    playPressed = loadImage('assets/playGameMenuPressed.png');
    help = loadImage('assets/help.png');
    helpPressed = loadImage('assets/helpPressed.png');

    runRight = loadAnimation("playerSprite/colored/runRight/player6.png", "playerSprite/colored/runRight/player9.png");
    runRight.frameDelay = 10;

    fadeNum = 255;

    menuPlayer = createSprite(-20, 480, 48, 48);
    menuPlayer.addAnimation("runRight", runRight);
    menuPlayer.changeAnimation("runRight");

    running.setVolume(0.1);
    buttonTick.setVolume(0.9);
    menuTheme.setVolume(0.2);
    loaded.setVolume(0.1);

    levelLoop1X = 0;
    levelLoop2X = 800;

    frameNumber = 0;

    //mouse was on a button on the last frame
    lastOnButton = false;

    runningSound = false;
    playingTheme = false;

    oneSprite = false;

    barWidth = 0;
  }

  this.draw = function() {
    if (noLoading && oneSprite) {
      menuPlayer = createSprite(400, 480, 48, 48);
      menuPlayer.addAnimation("runRight", runRight);
      menuPlayer.changeAnimation("runRight");
      oneSprite = false;
    }

    if (frameNumber == 190 && !noLoading) {
      loaded.play();
    }

    //loading bar
    if (frameNumber < 200 && !noLoading) {
      if (frameNumber < 20) {
        rect(180, 100, barWidth, 300);
        barWidth += 2;
      } else if (frameNumber > 50 && frameNumber < 60) {
        rect(180, 100, barWidth, 300);
        barWidth += 4;
      } else if (frameNumber < 110 && frameNumber > 90) {
        rect(180, 100, barWidth, 300);
        barWidth += 1;
      } else if (frameNumber < 200 && frameNumber > 150) {
        rect(180, 100, barWidth, 300);
        barWidth += 8;
      }

      image(loadingBar, 0, 0);

      //after the loading bar
    } else if (frameNumber <= 250 && frameNumber >= 200 && !noLoading) {
      background('#000202');
      image(levelLoop1, levelLoop1X, 344);
      image(vignette, 0, 344);
      tint(255, 100);
      image(scanlines, 0, 0);
      
      if (fadeNum > 0) {
        fill(0, 0, 0, fadeNum);
        fadeNum -= 3;
        rect(0, 0, 800, 600);
      }
    } else if (frameNumber > 250 || noLoading) {
      if (!runningSound) {
        running.loop();
        runningSound = true;
      }
      background('#000202');

      //player walking up
      if (menuPlayer.position.x < 400) {
        menuPlayer.position.x += 3;
        image(levelLoop1, levelLoop1X, 344);

        //player in place
      } else {  
        if (!noLoading) {
          noLoading = true;
        }
        if (!playingTheme) {
          menuTheme.loop();
          playingTheme = true;
        }
        image(levelLoop1, levelLoop1X, 344);
        image(levelLoop2, levelLoop2X, 344);
        if (levelLoop1X > -800) {
          levelLoop1X -= 2;
        } else {
          levelLoop1X = 798;
        }
        if (levelLoop2X > -800) {
          levelLoop2X -= 2;
        } else {
          levelLoop2X = 798;
        }

        imageMode(CENTER);
        image(logo, 400, 75);

        if (mouseX > 258 && mouseX < 542 && mouseY > 222 && mouseY < 258) {
          if (!lastOnHelpButton && !lastOnStartButton) {
            buttonTick.play();
          }
          image(playPressed, 400, 240);
          lastOnStartButton = true;
        } else {
          image(play, 400, 240);
          lastOnStartButton = false;
        }
        if (mouseX > 337 && mouseX < 463 && mouseY > 283 && mouseY < 317) {
          if (!lastOnHelpButton && !lastOnStartButton) {
            buttonTick.play();
          }
          image(helpPressed, 400, 300);
          lastOnHelpButton = true;
        } else {
          image(help, 400, 300);
          lastOnHelpButton = false;
        }
        imageMode(CORNER);
      }

      drawSprites();
      image(vignette, 0, 344);
      tint(255, 100);
      image(scanlines, 0, 0);

      if (fadeNum > 0) {
        fill(0, 0, 0, fadeNum);
        fadeNum -= 3;
        rect(0, 0, 800, 600);
      }
    }

    frameNumber += 1;
  }

  this.mousePressed = function() {
    if (mouseX > 258 && mouseX < 542 && mouseY > 222 && mouseY < 258 && frameNumber > 200) {
      running.setVolume(1);
      running.stop();
      menuTheme.pause();
      menuPlayer.remove();
      buttonPress.play();

      oneSprite = true;

      this.sceneManager.showScene(currentScene);
    } else if (mouseX > 337 && mouseX < 463 && mouseY > 283 && mouseY < 317 && frameNumber > 200) {
      menuPlayer.remove();
      buttonPress.play();
      menuTheme.setVolume(0.05);
      correct.setVolume(0.2);
      correct.play();
      mgr.showScene(Help);
    }
  }
}

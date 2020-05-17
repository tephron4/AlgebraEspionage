function Help() {
  let helpImg;
  var page2;
  var lastOnMenuButton;
  var lastOnNextButton;

  this.setup = function() {
    helpImg = loadImage('assets/helpScene.png');
    helpImg2 = loadImage('assets/helpScene2.png');
    returnToMenu = loadImage('assets/returnToMenu.png');
    returnToMenuDark = loadImage('assets/returnToMenuDark.png');
    next = loadImage('assets/next.png');
    nextPressed = loadImage('assets/nextPressed.png');
    back = loadImage('assets/back.png');
    backPressed = loadImage('assets/backPressed.png');

    page2 = false;
    lastOnMenuButton = false;
    lastOnNextButton = false;
  }
  this.draw = function() {
    if (page2) {
      image(helpImg2, 0, 0);
    } else {
      image(helpImg, 0, 0);
    }

    if (page2) {
      if (mouseX > 15 && mouseX < 300 && mouseY > 15 && mouseY < 49) {
        if (!lastOnMenuButton && !lastOnNextButton) {
          buttonTick.play();
        }
        image(returnToMenuDark, 15, 15);
        lastOnMenuButton = true;
      } else {
        image(returnToMenu, 15, 15);
        lastOnMenuButton = false;
      }
      if (mouseX > 15 && mouseX < 172 && mouseY > 520 && mouseY < 564) {
        if (!lastOnMenuButton && !lastOnNextButton) {
          buttonTick.play();
        }
        image(backPressed, 15, 520);
        lastOnNextButton = true;
      } else {
        image(back, 15, 520);
        lastOnNextButton = false;
      }
    } else {
      if (mouseX > 15 && mouseX < 300 && mouseY > 15 && mouseY < 49) {
        if (!lastOnMenuButton && !lastOnNextButton) {
          buttonTick.play();
        }
        image(returnToMenuDark, 15, 15);
        lastOnMenuButton = true;
      } else {
        image(returnToMenu, 15, 15);
        lastOnMenuButton = false;
      }
      if (mouseX > 625 && mouseX < 782 && mouseY > 520 && mouseY < 564) {
        if (!lastOnMenuButton && !lastOnNextButton) {
          buttonTick.play();
        }
        image(nextPressed, 625, 520);
        lastOnNextButton = true;
      } else {
        image(next, 625, 520);
        lastOnNextButton = false;
      }
    }
  }


  this.mousePressed = function() {
    if (mouseX > 8 && mouseX < 254 && mouseY > 17 && mouseY < 70) {
      buttonPress.play();
      page2 = false;
      menuTheme.setVolume(0.2);
      oneSprite = true;
      this.sceneManager.showScene(Menu);
    }
    if (mouseX > 625 && mouseX < 782 && mouseY > 520 && mouseY < 564) {
      buttonPress.play();
      page2 = true;
    }
    if (mouseX > 15 && mouseX < 172 && mouseY > 520 && mouseY < 564) {
      buttonPress.play();
      page2 = false;
    }
  }
}

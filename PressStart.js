function PressStart() {

  this.setup = function() {
    //furthest backsplash image layer 
    startUp = loadImage('assets/playGame.png');
    startPressed = loadImage('assets/playGamePressed.png');
  }

  this.draw = function() {
    if (mouseX > 230 && mouseX < 560 && mouseY > 260 && mouseY < 340) {
      image(startPressed, 0, 0);
    } else {
      image(startUp, 0, 0);
    }
  }

  this.mousePressed = function() {
    if (mouseX > 230 && mouseX < 580 && mouseY > 260 && mouseY < 340) {
      buttonPress.play();
      menuTheme.setVolume(0.2);
      this.sceneManager.showScene(Splash);
    }
  }
}

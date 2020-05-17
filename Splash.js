function Splash() {
  var startFrame;
  var currentOpacity;

  this.setup = function() {
    //furthest backsplash image layer 
    backSplash = loadImage('assets/backSplash.png');

    //up front backsplash image layer
    frontSplash = loadImage('assets/frontSplash.png');

    startFrame = frameCount;
    
    currentOpacity = 0;

    poweredSwitch.setVolume(0.5);
    poweredSwitch.play();
  }

  this.draw = function() {
    if (currentOpacity < 255 && frameCount - startFrame < 95){
      currentOpacity += 5;
    } else if (currentOpacity > 0 && frameCount - startFrame > 300){
      currentOpacity -= 3;
    }
    
    //sets the current opacity
    tint(255, currentOpacity);

    background('#000000');
    if (frameCount - startFrame < 95) {
      image(backSplash, 0, 0);
    } else {
      image(frontSplash, 0, 0);
    }


    if (frameCount - startFrame > 360) {
      this.sceneManager.showScene(Menu);
    }
  }
}

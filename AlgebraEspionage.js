var mgr;
var jump, landing, running;
var answeredQuestion = false;
var currentScene;
var needToResetup;
var noLoading;
var oneSprite;

function preload() {
  slowWhir = loadSound('assets/slowWhir.mp3');
  fastWhir = loadSound('assets/fastWhir.mp3');
  alertSound = loadSound('assets/alert.wav');
  jump = loadSound('assets/jumping.wav');
  landing = loadSound('assets/landing.wav');
  running = loadSound('assets/footsteps.mp3');
  poweredSwitch = loadSound('assets/poweredSwitch.mp3');
  buttonPress = loadSound('assets/buttonPress.mp3');
  buttonTick = loadSound('assets/tick.mp3');
  menuTheme = loadSound('assets/Hitman.mp3');
  loaded = loadSound('assets/select.wav');
  gameTheme = loadSound('assets/Edge_of_the_Knife.mp3');
  elevatorDoor = loadSound('assets/elevatorDoor.mp3');
  caught = loadSound('assets/caught.mp3');
  compAlertSound = loadSound('assets/success.wav');
  correct =  loadSound('assets/correct.wav');
}
function setup() {
  cnv = createCanvas(800, 600);
  cnv.position(100, 100, 'fixed');
  background('#14191d');
  mgr = new SceneManager();
  currentScene = Game;
  needToResetup = false;
  noLoading = false;
  
  //makes sure the sprites are only created once at the beginning of a scene
  oneSprite = false;

  slowWhir.setVolume(0.1);
  fastWhir.setVolume(0.1);
  alertSound.setVolume(0.1);
  caught.setVolume(0.5);

  //add scenes
  mgr.addScene ( PressStart );
  mgr.addScene ( Splash );
  mgr.addScene ( Menu );
  mgr.addScene ( Help );
  mgr.addScene ( Game );
  mgr.addScene ( MathS );
  mgr.addScene ( TheEnd );
  mgr.showScene(PressStart);
}

function draw() {
  mgr.draw();
}

function mousePressed() {
  mgr.handleEvent("mousePressed");
}

function keyPressed() {
  mgr.handleEvent("keyPressed");
}

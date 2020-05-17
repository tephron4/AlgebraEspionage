function MathS() {
  let inp;
  let submit;
  let mathMap;
  let curQ;
  let i;
  let result;
  let goNext;
  let QImg;
  let firstTime = true;
  let correct = false;
  this.setup = function() {
    QImg = loadImage('assets/questionText.png');
    TVScreen = loadImage('assets/TVScreen.png');
    inp = createInput('');
    inp.input(myInputEvent);
    inp.position(305+cnv.x, 380+cnv.y);
    submit = createButton('Submit');
    submit.position(490+cnv.x, 380+cnv.y);
    submit.mousePressed(Saveinput);
    mathMap = new Map();
    newQuestion();
    goNext = createButton('Go Next');
    goNext.position(500+cnv.x, 480+cnv.y);
    goNext.mousePressed(Next);
    goNext.hide();
    i = floor(random(mathMap.size));
  }


  this.draw = function() {
    if (!firstTime) {
      inp.show();
      submit.show();
    }
    background(100);
    image(TVScreen, 0, 0);
    image(QImg, 200, 100);
    curQ = mathMap.get(i);
    textSize(24);
    textStyle(BOLD);
    textAlign(CENTER);
    text(curQ.question, 400, 350);
    text('x = ', 280, 400);
    text(result, 350, 500);
  }
  function myInputEvent() {
  }
  function mousePressed() {
  }
  function Saveinput() {
    if (inp.value() == curQ.answer) {
      result = 'Correct!';
      goNext.show();
    } else {
      result = 'Wrong';
    }
  }
  function Next() {
    inp.hide();
    submit.hide();
    goNext.hide();
    firstTime = false;
    getNewQuestion();
    result = '';
    inp.value('');
  }

  function newQuestion() {
    mathMap.set(0, new MathQ('5x+10=20', 2));
    mathMap.set(1, new MathQ('4x-9=15', 6));
    mathMap.set(2, new MathQ('3x/10=15', 50));
    mathMap.set(3, new MathQ('13x+8=47', 3));
    mathMap.set(4, new MathQ('21/x=7', 3));
  }
  function getNewQuestion() {
    mathMap.delete(i);
    i = randomKey(mathMap);
    this.answeredQuestion = true;
    mgr.showScene( currentScene );
  }
  function randomKey(collection) {
    let keys = Array.from(collection.keys());
    return keys[Math.floor(Math.random() * keys.length)];
  }
}

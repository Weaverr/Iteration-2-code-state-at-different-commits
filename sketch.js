// Variables
let myTetrisgridL;
let myTetrisgridR;
let myTetrisgridF;
let timer = 500;

// The setup function is called once at the beginning to initialize the canvas and settings.
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // Create a canvas using the entire window's dimensions in WEBGL mode
  rectMode(CENTER); // Configure rectangle drawing mode to be centered
  angleMode(DEGREES); // Utilize degrees for angle measurements

   // Create new camera objectS and set its initial position and target
  currentcamera = new devCam(-250, -300, 250, 0, -100, 0);

  // Invokes the Gravity function at regular intervals defined by the timer variable which is set to 500
  setInterval(() => Gravity(), timer);


  // Create the left Tetris grid object with specified properties
  myTetrisgridL = new Tetrisgrid(100, 300, 0, 50, -150, 1, 0, 90, 255, { r: 0, g: 0, b: 0 });

  // Create the right Tetris grid object with specified properties
  myTetrisgridR = new Tetrisgrid(100, 300, 0, 0, -150, -50, 0, 0, 255, { r: 0, g: 0, b: 0 });

  // Create the floor of the tetris grid with specified properties
  myTetrisgridF = new Tetrisgrid(100, 100, 0, 0, 0, 0, 90, 0, 255, { r: 0, g: 0, b: 0 });
  
  // Create the piece with specified properties
  activeBox = new piece(0, { x: 0, layerNum: 6, z: 0, }, { r: 0, g: 0, b: 255 }, { r: 255, g: 255, b: 255 })
}

// Creates a gravity function
let Gravity = () => {
  if (!(activeBox.getMasterPos().layerNum < 0)) {
    activeBox.drop()
  }
}

// Function to access the current camera object
function cam() {
  return currentcamera;
}

function draw() {
  inputs();
  processes();
  outputs();
}

// The inputs function handles Inputs from the user
function inputs() {
  // Empty for now
}

// The processes function handles data processing and calculations.
function processes() {
  // Empty for now
}

// The outputs function handles displaying visual outputs on the canvas.
function outputs() {
  background(255, 255, 255);
  currentcamera.show(); // Displays the camera 
  stroke(255);
  activeBox.show()// Displays the box
  //myLPiece.show();
  stroke('lime')
  myTetrisgridL.show(); // Display the left Tetris grid element
  myTetrisgridR.show(); // Display the right Tetris grid element
  myTetrisgridF.show(); // Display the front Tetris grid element
}

function keyPressed() {
  if (keyCode == '68') {
    //w
    let oldPos = activeBox.getMasterPos()
    if (!(oldPos.x >= (9 - (activeBox.getDimensions().x - 1)))) {
      activeBox.setPos({ x: oldPos.x + 1, layerNum: oldPos.layerNum, z: oldPos.z })
    }
  }

  if (keyCode == '65') {
    //s
    let oldPos = activeBox.getMasterPos()
    if (!(oldPos.x <= 0)) {
      activeBox.setPos({ x: oldPos.x - 1, layerNum: oldPos.layerNum, z: oldPos.z })
    }
  }

  if (keyCode == '87') {
    //a
    let oldPos = activeBox.getMasterPos()
    if (!(oldPos.z <= 0)){
      activeBox.setPos({ x: oldPos.x, layerNum: oldPos.layerNum, z: oldPos.z - 1 })
    }
  }

  if (keyCode == '83') {
    //s
    let oldPos = activeBox.getMasterPos()
    if (!(oldPos.z >= (9 - (activeBox.getDimensions().z - 1)))) {
      activeBox.setPos({ x: oldPos.x, layerNum: oldPos.layerNum, z: oldPos.z + 1 })
    }
  }
}

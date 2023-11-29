// Variables
let mytetrisGridL;
let mytetrisGridR;
let mytetrisGridF;
let timer = 100;
let peiceQueue
let queuePointer = 0
let gameProgression = "play"

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
  mytetrisGridL = new tetrisGrid(100, 300, 0, 50, -155, 1, 0, 90, 255, { r: 0, g: 0, b: 0 });

  // Create the right Tetris grid object with specified properties
  mytetrisGridR = new tetrisGrid(100, 300, 0, 0, -155, -50, 0, 0, 255, { r: 0, g: 0, b: 0 });

  // Create the floor of the tetris grid with specified properties
  mytetrisGridF = new tetrisGrid(100, 100, 0, 0, -5, 0, 90, 0, 255, { r: 0, g: 0, b: 0 });


  box1 = new peice(0, { x: 0, layerNum: 30, z: 0, }, { r: 0, g: 0, b: 255 }, { r: 255, g: 255, b: 255 })
  peiceQueue = [box1]
}


// Creates a gravity function that calls piece
let Gravity = () => {
  peiceDropLogic()
}

// Function to manage the logic for dropping a game piece
function peiceDropLogic() {
  // Check if the active piece is above the bottom layer, there's no collision, and the game is in 'play' mode
  if ((!(peiceQueue[queuePointer].getMasterPos().layerNum < 0)) && !(collisionDetection()) && gameProgression == "play") {
    // If all conditions are met, drop the piece down by one layer
    peiceQueue[queuePointer].drop();
  } else {
    // If the piece cannot be dropped (either it's at the bottom, there's a collision, or the game is not in 'play' mode)

    // Move to the next piece in the queue
    queuePointer++;

    // Generate a new piece with random type and color
    peiceQueue[queuePointer] = new peice(
      Math.round(Math.random() * 3), // Randomly select the piece type
      { x: 0, layerNum: 30, z: 0 }, // Start at a high layer
      // Generate random colors for the piece
      { r: Math.round(Math.random() * 255), g: Math.round(Math.random() * 255), b: Math.round(Math.random() * 255) },
      { r: Math.round(Math.random() * 255), g: Math.round(Math.random() * 255), b: Math.round(Math.random() * 255) }
    );

    let xRandom;
    let zRandom;

    // Generate a random x position, ensuring it's within the grid boundaries
    do {
      xRandom = Math.round(Math.random() * 8);
    } while (xRandom >= (9 - peiceQueue[queuePointer].getDimensions.x));

    // Generate a random z position, also within grid boundaries
    do {
      zRandom = Math.round(Math.random() * 8);
    } while (zRandom >= (9 - peiceQueue[queuePointer].getDimensions.z));

    // Set the position of the new piece based on the random x and z coordinates
    peiceQueue[queuePointer].setPos({ x: xRandom, layerNum: 30, z: zRandom });
  }
}

// Function to detect if there's a collision between the currently moving piece and any other piece in the queue
function collisionDetection() {
  // Retrieve the positions of all boxes in the currently moving piece
  let peiceMoveBoxPos = peiceQueue[queuePointer].getAllPos();

  // Iterate through the entire piece queue, excluding the currently moving piece
  for (let i = 0; i < (peiceQueue.length - 1); i++) {
    // Retrieve the positions of all boxes in the current piece in the queue
    let peiceBoxPos = peiceQueue[i].getAllPos();

    // Iterate through each box in the current piece in the queue
    for (let j = 0; j < peiceBoxPos.length; j++) {
      
      // Iterate through each box in the currently moving piece
      for (let k = 0; k < peiceMoveBoxPos.length; k++) {
        
        // Check if any box in the moving piece is directly above any box in the current piece
        if (peiceBoxPos[j].layerNum == (peiceMoveBoxPos[k].layerNum - 1)){
          
          // Check if the boxes are aligned in both x and z coordinates (meaning a collision would occur)
          if (peiceBoxPos[j].x == peiceMoveBoxPos[k].x && peiceBoxPos[j].z == peiceMoveBoxPos[k].z) {
            // Collision detected

            // If the collision occurs at a high layer (>= 25), change the game progression to 'over'
            if (peiceMoveBoxPos[k].layerNum >= 25){
              gameProgression = "over";
            }

            // Return true, indicating a collision has occurred
            return true;
          }
        }
      }
    }
  }

  // Return false if no collision is detected
  return false;
}

function draw() {
  inputs();
  processes();
  outputs();
}

// The inputs function handles Inputs from the user
function inputs() {
  if(keyIsDown(32)){
    peiceDropLogic()
  }
}

// The processes function handles data processing and calculations.
function processes() {
  if(gameProgression == "over"){
    console.log("Game Over")
  }
}

// The outputs function handles displaying visual outputs on the canvas.
function outputs() {
  background(255, 255, 255);
  currentcamera.show(); // Displays the camera
  stroke(255);
  for (let i = 0; i < peiceQueue.length; i++) {
    peiceQueue[i].show()
  }
  stroke('lime')
  mytetrisGridL.show(); // Display the left Tetris grid element
  mytetrisGridR.show(); // Display the right Tetris grid element
  mytetrisGridF.show(); // Display the front Tetris grid element
}



function keyPressed() {
  // replace box1 with activepeice
  if (keyCode == '87') {
    //w
    let oldPos = peiceQueue[queuePointer].getMasterPos()
    if (!(oldPos.x >= (9 - (peiceQueue[queuePointer].getDimensions().x - 1)))) {
      //VALIDATION, REMOVE IF AND ADD INTO WRITEUP FOR MARKS
      peiceQueue[queuePointer].setPos({ x: oldPos.x + 1, layerNum: oldPos.layerNum, z: oldPos.z })
    }
  }

  if (keyCode == '83') {
    //s
    let oldPos = peiceQueue[queuePointer].getMasterPos()
    if (!(oldPos.x <= 0)) {
      //VALIDATION, REMOVE IF AND ADD INTO WRITEUP FOR MARKS
      peiceQueue[queuePointer].setPos({ x: oldPos.x - 1, layerNum: oldPos.layerNum, z: oldPos.z })
    }
  }

  if (keyCode == '65') {
    //a
    let oldPos = peiceQueue[queuePointer].getMasterPos()
    if (!(oldPos.z <= 0)) {
      //VALIDATION, REMOVE IF AND ADD INTO WRITEUP FOR MARKS
      peiceQueue[queuePointer].setPos({ x: oldPos.x, layerNum: oldPos.layerNum, z: oldPos.z - 1 })
    }
  }

  if (keyCode == '68') {
    //d
    let oldPos = peiceQueue[queuePointer].getMasterPos()
    if (!(oldPos.z >= (9 - (peiceQueue[queuePointer].getDimensions().z - 1)))) {
      //VALIDATION, REMOVE IF AND ADD INTO WRITEUP FOR MARKS
      peiceQueue[queuePointer].setPos({ x: oldPos.x, layerNum: oldPos.layerNum, z: oldPos.z + 1 })
    }
  }
  //console.log(event)
}
// how to break code: ands and ors, i j k, -1, ==
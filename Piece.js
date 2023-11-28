// Class to handle and manage box elements called boxHandler
class boxHandler {
   // Constructor for initializing boxHandler with position, colour, and stroke
  constructor(newBox, colour, stroke) {
      this.boxPos = newBox;
      this.colour = colour;
      this.stroke = stroke;
  }
  // Method to display the box
  show() {
      push();
      fill(this.colour.r, this.colour.g, this.colour.b);
      stroke(this.stroke.r, this.stroke.g, this.stroke.b);
      // Calculate position based on layer and coordinates
      let y = (-20 - (10 * this.boxPos.layerNum));
      let x = valueCoordinator(this.boxPos.x);
      let z = valueCoordinator(this.boxPos.z);

      console.log("X coordinate for boxPos.x:", x);
      console.log("Z coordinate for boxPos.z:", z);

      translate(x, y, z); // Move to calculated position
      box(10, 10, 10);
      pop();
  }

  // Method to lower the box by one layer
  drop() {
      this.boxPos.layerNum = this.boxPos.layerNum - 1;
  }

  // Getter method for the box's position
  getPos() {
      return (this.boxPos);
  }

  // Setter method to update the box's position
  setPos(newBox) {
      this.boxPos = newBox;
  }
}

// Function to map grid values to coordinates
function valueCoordinator(value) {
  // Returns corresponding coordinate for each grid value
  if (value == 0) { return (-45) };
  if (value == 1) { return (-35) };
  if (value == 2) { return (-25) };
  if (value == 3) { return (-15) };
  if (value == 4) { return (-5) };
  if (value == 5) { return (5) };
  if (value == 6) { return (15) };
  if (value == 7) { return (25) };
  if (value == 8) { return (35) };
  if (value == 9) { return (45) };
}

// Class representing a game piece composed of multiple boxes
class piece {
  // Constructor for creating a new game piece
  constructor(pieceType, masterLocation, colour, fill) {
      this.boxArr = [];
      this.masterLocation = masterLocation;
      this.pieceType = pieceType;
      this.colour = colour;
      this.fill = fill;
      this.updatePos();
  }

  // Method to display the piece
  show() {
      // Iterate and display each box in the piece
      for (let i = 0; i < this.boxArr.length; i++) {
          this.boxArr[i].show();
      }
  }

  
  // Method to lower each box in the piece by one layer
  drop() {
      for (let i = 0; i < this.boxArr.length; i++) {
          this.boxArr[i].drop();
      }
  }

  // Getter for the master position of the piece
  getMasterPos() {
      return (this.boxArr[0].getPos());
  }

  // Setter to update the master location and reposition the piece
  setPos(masterLocation) {
      this.masterLocation = masterLocation;
      this.updatePos();
  }

  // Method to update the position of each box in the piece
  updatePos() {
      if (this.pieceType == 0) {
          //2x2box
          // [Creates 8 boxHandler instances for each box in the piece]
          this.boxArr[0] = new boxHandler({ x: this.masterLocation.x, layerNum: this.masterLocation.layerNum, z: this.masterLocation.z }, this.colour, this.fill);
          this.boxArr[1] = new boxHandler({ x: this.masterLocation.x + 1, layerNum: this.masterLocation.layerNum, z: this.masterLocation.z }, this.colour, this.fill);
          this.boxArr[2] = new boxHandler({ x: this.masterLocation.x, layerNum: this.masterLocation.layerNum, z: this.masterLocation.z + 1 }, this.colour, this.fill);
          this.boxArr[3] = new boxHandler({ x: this.masterLocation.x + 1, layerNum: this.masterLocation.layerNum, z: this.masterLocation.z + 1 }, this.colour, this.fill);
          this.boxArr[4] = new boxHandler({ x: this.masterLocation.x, layerNum: this.masterLocation.layerNum + 1, z: this.masterLocation.z }, this.colour, this.fill);
          this.boxArr[5] = new boxHandler({ x: this.masterLocation.x + 1, layerNum: this.masterLocation.layerNum + 1, z: this.masterLocation.z }, this.colour, this.fill);
          this.boxArr[6] = new boxHandler({ x: this.masterLocation.x, layerNum: this.masterLocation.layerNum + 1, z: this.masterLocation.z + 1 }, this.colour, this.fill);
          this.boxArr[7] = new boxHandler({ x: this.masterLocation.x + 1, layerNum: this.masterLocation.layerNum + 1, z: this.masterLocation.z + 1 }, this.colour, this.fill);
      }

  }

  // Method to get the dimensions of the piece
  getDimensions() {
      if (this.pieceType == 0) {
        // Dimensions for a 2x2x2 piece
        return ({ x: 2, y: 2, z: 2 });
      }
  }
}
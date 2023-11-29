// Class to handle and manage box elements called boxHandler
class boxHandler {
    // Constructor for initializing boxHandler with position, color and stroke
    constructor(newBox, colour, stroke) {
        this.boxPos = newBox
        this.colour = colour;
        this.stroke = stroke;
    }

    // Method to display the box
    show() {
        push();
        fill(this.colour.r, this.colour.g, this.colour.b);
        stroke(this.stroke.r, this.stroke.g, this.stroke.b);
        // Calculate position based on lyaer and coordinates
        let y = (-20 - (10 * this.boxPos.layerNum))
        let x = valueCoordinator(this.boxPos.x)
        let z = valueCoordinator(this.boxPos.z)
        translate(x, y, z); // Move to calculated position
        box(10, 10, 10);
        pop();
    }

    // Method to lower the box by one layer
    drop() {
        this.boxPos.layerNum = this.boxPos.layerNum - 1
    }

    // Getter method for the box's position
    getPos() {
        return (this.boxPos)
    }

    // Setter method to update the box's position
    setPos(newBox) {
        this.boxPos = newBox
    }
}

// Function to map grid values to coordinates
function valueCoordinator(value) {
    // Returns corresponding coordinate for each grid value
    if (value == 0) { return (-45) }
    if (value == 1) { return (-35) }
    if (value == 2) { return (-25) }
    if (value == 3) { return (-15) }
    if (value == 4) { return (-5) }
    if (value == 5) { return (5) }
    if (value == 6) { return (15) }
    if (value == 7) { return (25) }
    if (value == 8) { return (35) }
    if (value == 9) { return (45) }
}

// Class representing a game piece composed of multiple boxes 
class peice {
    // Constructor for creating a new game piece
    constructor(peiceType, masterLocation, color, fill) {
        this.boxArr = []
        this.masterLocation = masterLocation
        this.peiceType = peiceType
        this.color = color;
        this.fill = fill;
        this.updatePos()
    }

    // Method to display the piece
    show() {
        // Iterate and display each box in the piece
        for (let i = 0; i < this.boxArr.length; i++) {
            this.boxArr[i].show()
        }
    }

    // Method to lower each box in the piece by one layer
    drop() {
        for (let i = 0; i < this.boxArr.length; i++) {
            this.boxArr[i].drop()
        }
    }

    // Getter for the master position of the piece
    getMasterPos() {
        return (this.boxArr[0].getPos())
    }
    getAllPos(){
        let allPos = []
        for (let i = 0; i < this.boxArr.length; i++) {
            allPos[i] = this.boxArr[i].getPos()
        }
        return(allPos)
    }

    // Setter to update the master location reposition the piece
    setPos(masterLocation) {
        this.masterLocation = masterLocation
        this.updatePos()
    }

    updatePos() {
        if (this.peiceType == 0) {
            //2x2x2
            // [Creates 9 boxHandler instances for each box in the piece]
            this.boxArr[0] = new boxHandler({ x: this.masterLocation.x, layerNum: this.masterLocation.layerNum, z: this.masterLocation.z }, this.color, this.fill);
            this.boxArr[1] = new boxHandler({ x: this.masterLocation.x + 1, layerNum: this.masterLocation.layerNum, z: this.masterLocation.z }, this.color, this.fill);
            this.boxArr[2] = new boxHandler({ x: this.masterLocation.x, layerNum: this.masterLocation.layerNum, z: this.masterLocation.z + 1 }, this.color, this.fill);
            this.boxArr[3] = new boxHandler({ x: this.masterLocation.x + 1, layerNum: this.masterLocation.layerNum, z: this.masterLocation.z + 1 }, this.color, this.fill);
            this.boxArr[4] = new boxHandler({ x: this.masterLocation.x, layerNum: this.masterLocation.layerNum + 1, z: this.masterLocation.z }, this.color, this.fill);
            this.boxArr[5] = new boxHandler({ x: this.masterLocation.x + 1, layerNum: this.masterLocation.layerNum + 1, z: this.masterLocation.z }, this.color, this.fill);
            this.boxArr[6] = new boxHandler({ x: this.masterLocation.x, layerNum: this.masterLocation.layerNum + 1, z: this.masterLocation.z + 1 }, this.color, this.fill);
            this.boxArr[7] = new boxHandler({ x: this.masterLocation.x + 1, layerNum: this.masterLocation.layerNum + 1, z: this.masterLocation.z + 1 }, this.color, this.fill);
        }
        if (this.peiceType == 1) {
            //tPeice
            this.boxArr[0] = new boxHandler({ x: this.masterLocation.x, layerNum: this.masterLocation.layerNum, z: this.masterLocation.z }, this.color, this.fill);
            this.boxArr[1] = new boxHandler({ x: this.masterLocation.x + 1, layerNum: this.masterLocation.layerNum, z: this.masterLocation.z }, this.color, this.fill);
            this.boxArr[2] = new boxHandler({ x: this.masterLocation.x + 2, layerNum: this.masterLocation.layerNum, z: this.masterLocation.z }, this.color, this.fill);
            this.boxArr[3] = new boxHandler({ x: this.masterLocation.x + 1, layerNum: this.masterLocation.layerNum, z: this.masterLocation.z + 1 }, this.color, this.fill);
        }
        if (this.peiceType == 2) {
            //lPeice
            this.boxArr[0] = new boxHandler({ x: this.masterLocation.x, layerNum: this.masterLocation.layerNum, z: this.masterLocation.z }, this.color, this.fill);
            this.boxArr[1] = new boxHandler({ x: this.masterLocation.x + 1, layerNum: this.masterLocation.layerNum, z: this.masterLocation.z }, this.color, this.fill);
            this.boxArr[2] = new boxHandler({ x: this.masterLocation.x + 2, layerNum: this.masterLocation.layerNum, z: this.masterLocation.z }, this.color, this.fill);
            this.boxArr[3] = new boxHandler({ x: this.masterLocation.x, layerNum: this.masterLocation.layerNum, z: this.masterLocation.z + 1 }, this.color, this.fill);
        }
        if (this.peiceType == 3) {
            //line
            this.boxArr[0] = new boxHandler({ x: this.masterLocation.x, layerNum: this.masterLocation.layerNum, z: this.masterLocation.z }, this.color, this.fill);
            this.boxArr[1] = new boxHandler({ x: this.masterLocation.x + 1, layerNum: this.masterLocation.layerNum, z: this.masterLocation.z }, this.color, this.fill);
            this.boxArr[2] = new boxHandler({ x: this.masterLocation.x + 2, layerNum: this.masterLocation.layerNum, z: this.masterLocation.z }, this.color, this.fill);
            this.boxArr[3] = new boxHandler({ x: this.masterLocation.x + 3, layerNum: this.masterLocation.layerNum, z: this.masterLocation.z }, this.color, this.fill);
        }

    }

    getDimensions() {
        if (this.peiceType == 0) {
            return ({ x: 2, y: 2, z: 2 })
        }
        if (this.peiceType == 1) {
            return ({ x: 3, y: 1, z: 2 })
        }
        if (this.peiceType == 2) {
            return ({ x: 3, y: 1, z: 2 })
        }
        if (this.peiceType == 3) {
            return ({ x: 4, y: 1, z: 1 })
        }
    }
}
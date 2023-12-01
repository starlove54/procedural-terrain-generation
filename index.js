// Declare variables to store grid dimensions, rectangle sizes, and Perlin noise parameters
let rows = 20,
  cols = 20
let sizes = [] // 2D array to store the height of each box in the grid
let size = 25 // Initial size of each box
let xoff, yoff
let incre = 0.1 // Increment for Perlin noise
let zoff = 0

// Setup function - runs once at the beginning
function setup() {
  createCanvas(800, 800, WEBGL) // Create a 3D canvas
  rectMode(CENTER) // Set rectangle mode to the center
  angleMode(DEGREES) // Set angle mode to degrees
}

// Draw function - runs continuously in a loop
function draw() {
  background(220) // Set background color to light gray
  rotateX(-45) // Rotate along the X-axis to change the viewing angle
  rotateY(45) // Rotate along the Y-axis to change the viewing angle

  // Initialize an empty array for each row in the grid
  for (let i = 0; i < rows; i++) {
    sizes[i] = []
  }

  // Nested loops to iterate through each cell in the grid
  for (let i = 0; i < rows; i++) {
    // Reset xoff for each row
    xoff = 0
    for (let j = 0; j < cols; j++) {
      // Use Perlin noise to map values to the height of each box
      sizes[i][j] = map(noise(xoff, yoff, zoff), 0, 1, 0, 100)
      xoff += incre

      // Use Perlin noise for color values
      let r = noise(zoff) * 255
      let g = noise(zoff + 15) * 255
      let b = noise(zoff + 30) * 255

      // Set fill color and draw a box at the specified position with the calculated height
      fill(r, g, b)
      push() // Save the current transformation state
      translate(i * size - 200, sizes[i][j], j * size - 350) // Set the position of the box
      box(size, 100, size) // Draw a box with the specified size
      pop() // Restore the previous transformation state
    }
    zoff += 0.0006 // Increment zoff for the next row to create variation over time
  }
}

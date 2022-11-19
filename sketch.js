// this variable will hold our shader object
let theShader;
// this variable will hold our webcam video
let cam;
let mic;

function preload() {
  // load the shader
  theShader = loadShader("assets/webcam.vert", "assets/effect.frag");
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(710, 400, WEBGL);
  noStroke();

  cam = createCapture(VIDEO);
  cam.size(710, 400);
  cam.hide();

  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  // shader() sets the active shader with our shader
  shader(theShader);

  // passing cam as a texture
  theShader.setUniform("tex0", cam);

  let vol = mic.getLevel();
  console.log("volume", vol);

  background(255 * vol * 5);
  // rect gives us some geometry on the screen
  rect(0, 0, width, height);
}

// function draw() {
//   // shader() sets the active shader with our shader
//   shader(theShader);

//   // passing cam as a texture
//   theShader.setUniform("tex0", cam);

//   let vol = mic.getLevel();

//   console.log("?>??", vol);
//   // rect gives us some geometry on the screen
//   rect(0, 0, width, height);

//   background(0);

//   fill(255 * vol);
//   noStroke();

//   // let h = map(vol, 0, 1, height, 0);
//   // ellipse(width / 2, h - 25 + vol * 100, 50, 50 * vol);
// }

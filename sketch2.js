// in this sketch we're going to create a feedback effect by repeatedly sending the same image back to the shader and performing a slight modification
// click the mouse to get things started

// the shader variable
let camShader;

// the camera variable
let cam;
let mic, fft;

// we will need at least two layers for this effect
let shaderLayer;
let copyLayer;

function preload() {
  // load the shader
  camShader = loadShader("assets/basic.vert", "assets/basic.frag");
}

function setup() {
  // disables scaling for retina screens which can create inconsistent scaling between displays
  pixelDensity(1);

  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT();
  fft.setInput(mic);

  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // initialize the webcam at the window size
  cam = createCapture(VIDEO);
  cam.size(windowWidth, windowHeight);

  // hide the html element that createCapture adds to the screen
  cam.hide();

  // this layer will use webgl with our shader
  shaderLayer = createGraphics(windowWidth, windowHeight, WEBGL);

  // this layer will just be a copy of what we just did with the shader
  copyLayer = createGraphics(windowWidth, windowHeight);
}

function draw() {
  // shader() sets the active shader with our shader

  shaderLayer.shader(camShader);

  // lets just send the cam to our shader as a uniform
  camShader.setUniform("tex0", cam);

  // also send the copy layer to the shader as a uniform
  camShader.setUniform("tex1", copyLayer);

  let vol = mic.getLevel();

  let spectrum = fft.analyze();

  // send mouseIsPressed to the shader as a int (either 0 or 1)
  camShader.setUniform("mouseDown", int(mouseIsPressed));
  camShader.setUniform("u_mouse", [
    map(spectrum[200], 0, width, 0.5, 1.1),
    map(spectrum[800], 0, height, height, 0) / height
  ]);



  camShader.setUniform('tex', cam);
  camShader.setUniform('time', frameCount);
  
  let freq = 20.0;
  let amp = 0.02;

  camShader.setUniform('frequency', freq);
  camShader.setUniform('amplitude', amp);
  camShader.setUniform('mouse', [mouseX, mouseY]);
  camShader.setUniform('u_resolution', [600,600]);










  console.log('volume', vol, spectrum[200]);

  camShader.setUniform("time", frameCount * 0.01);

  // rect gives us some geometry on the screen
  shaderLayer.rect(0, 0, width, height);

  // draw the shaderlayer into the copy layer
  copyLayer.image(shaderLayer, 0, 0, width, height);

  // render the shaderlayer to the screen
  image(shaderLayer, 0, 0, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

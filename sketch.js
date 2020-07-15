// the shit is going right. but 

let brain = [];
let inp = [0,0,0]; // resembles rgb values - weight=bias see neuron constructor
let out = [0,0,0];
let standardBias = 0.3 
let layers = [3, 4, 3];
let neuronID = 0;
let colors = [];


function setup() {
  createCanvas(600, 600);
  // sets neuron grid
 
  for (let i = 0; i < layers.length; i++) {
    for (let j = 0; j < layers[i]; j++) {
      brain.push(new Neuron(neuronID,standardBias));
      neuronID += 1;
    }
  }
  // pics random rgb values to play with
  for (let i = 0; i < 100; i++) {
    colors.push([random(255), random(255), random(255)])
  }

}


function draw() {
//Frontend:
  background(220);
  for (let i = 0; i < layers.length; i++) {
    for (let j = 0; j < layers[i]; j++) {
// i could not code this graph better without a duzend ifs^^ I wanted to
// focus on the Network itself first before i care about frontend code
// the graphs might be useless anyway, but i wanna see the neurons working!
      fill(0)
      textSize(20);
      text("in  hidden  out", 40, 375);
      fill(250);
      ellipse(50 + 50 * i, 400 + 50 * j, 20, 20);

      strokeWeight(3);
      line(50, 400, 100, 400 + 50 * j);
      line(50, 450, 100, 400 + 50 * j);
      line(50, 500, 100, 400 + 50 * j);
      line(150, 400, 100, 400 + 50 * j);
      line(150, 450, 100, 400 + 50 * j);
      line(150, 500, 100, 400 + 50 * j);
      fill(20);
      text(round(100 * inp[0]) / 100, 5, 400);
      text(round(100 * inp[1]) / 100, 5, 450);
      text(round(100 * inp[2]) / 100, 5, 500);
      text(round(100 * out[0]) / 100, 175, 400);
      text(round(100 * out[1]) / 100, 175, 450);
      text(round(100 * out[2]) / 100, 175, 500);
    }
  }
  fill(out[0]);
  rect(176, 358, 20, 20);
  fill(inp);
  rect(10, 358, 20, 20);
  for (let i = 1; i < 6; i++) {
    for (let j = 1; j < 6; j++) {
      rcol += 1;
      fill(colors[rcol]);
      rect(50 * j, 50 * i, 50, 50);
    }
  }
  fill(0);
  textSize(14);
  text("all over Weight Value: " + standardBias, 25,350 );  
  //Backend:
  rcol = 0;
  mouseParse();
  for (let i = 0; i < brain.length; i++) {
    brain[i].toEval();
  }
}

class Neuron {
  constructor(id,Bias) {
    this.id = id
    this.inputConnections = []
    this.outputConnections = []
    this.bias = Bias
    // delta will be used to store a percentage of change in the weight
    this.delta = 0
    this.output = 0
 
  }

  toEval() {
// the brain
    let count = -1;
    let bl = brain.length;
    let ll = layers.length;
// having issues to get a scalable tensor array, 
// but it was easely hardcoded
    for (let i = 0; i < ll; i++) {
      for (let j = 0; j < layers[i]; j++) {
        count += 1;
        if (i == 0 && count == this.id) {
          this.inputConnections = inp[j];
          this.output = this.inputConnections * this.bias
        }
 // im tired today. I need to get this simple thing looped       
        if (i == 1 && count == this.id) {
          for (let k = 0; k < layers[i-1]; k++) {

            this.inputConnections = brain[0].output + 
              brain[1].output + brain[2].output 
            this.output = this.inputConnections  * this.bias       
          }
        }
        if (i == 2 && count == this.id) {
          for (let k = 0; k < layers[i-1]; k++) {

            this.inputConnections = brain[3].output + 
              brain[4].output + brain[5].output + brain[6].output
            this.output = this.inputConnections  * this.bias  
          }
        }
      }
    }
    for (let i = 0; i < layers[ll-1]; i++) { 
    out[i] = ([brain[bl-layers[ll-1]+i].output])
    }
  }
}
// interface stuff
let pickClick;
let rcol = 0
// when you click on a color, you can see each neuron input and output in console
function mousePressed() {
  let x = mouseX
  let y = mouseY
  for (let i = 0; i < brain.length; i++) {
    console.log(brain[i].id+", "+ round(100 * brain[i].inputConnections) / 100+", "+  round(100 * brain[i].output) / 100);
  }
  if ((x > 20 && x < 40) && (y > 20 && y < 40) && out != []) {

  } else if ((x > 50 && x < 70) && (y > 20 && y < 40) && out != []) {

  } else {

  }
}

function mouseParse() {
  pickClick = get(mouseX, mouseY);
  if (pickClick.length > 2) {
    pickClick.pop()
  }
  inp = pickClick
}
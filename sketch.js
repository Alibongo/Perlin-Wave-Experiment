let inc = 0.1;
let scl = 10;
let cols, rows;

let zoff = 0;
let fr;

let particles = [];

let flowfield;

function setup() {
  createCanvas(200, 200);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP("");

  flowfield = new Array(cols * rows);

  for (let i = 0; i < 400; i++) {
    particles[i] = new Particle();
  }
  background("#e63fca1f");
}

function draw() {
  let yoff = 0;
  for (let y = 0; y < height; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      let v = p5.Vector.fromAngle(angle);
      v.setMag();
      flowfield[index] = v;
      xoff += inc;
      stroke(0, 50);
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // strokeWeight(1);
      // line(0, 0, scl, 0);
      // pop();

      // fill(r);
      // rect(x * scl, y * scl, scl, scl);
    }
    yoff += inc;
    zoff += 0.0003;
  }
  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

  fr.html(floor(frameRate()));
}

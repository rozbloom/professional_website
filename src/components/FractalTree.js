import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import "../styles/FractalTree.css";

let angle;

const Sketch = p5 => {
  p5.setup = () => {
    p5.createCanvas(400, 400, "transparent");
    p5.noLoop();
  };

  p5.draw = () => {
    p5.clear();
    p5.translate(200, 200); // Center of canvas
    let petals = 20;
    let radius = 100;
    for (let i = 0; i < petals; i++) {
      let angle = p5.TWO_PI * i / petals;
      let x = radius * p5.cos(angle);
      let y = radius * p5.sin(angle);
      p5.push();
      p5.rotate(angle);
      p5.fill(255, 0, 100, 150); // Rose color with transparency
      p5.noStroke();
      p5.ellipse(x, y, 60, 30); // Petal shape
      p5.pop();
    }
    // Draw center
    p5.fill(255, 200, 200, 200);
    p5.ellipse(0, 0, 50, 50);
  };
};

function FractalTree() {
  return (
    <div id="fractal-tree">
      <ReactP5Wrapper sketch={Sketch} />
    </div>
  );
}

export default FractalTree;

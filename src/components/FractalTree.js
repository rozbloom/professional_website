import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import "../styles/FractalTree.css";

let angle;

const Sketch = p5 => {
  p5.setup = () => {
    p5.createCanvas(400, 400, "transparent");
  };

  p5.draw = () => {
    p5.clear();
    p5.translate(200, 200); // Center of canvas

    let petals = 20;
    let baseRadius = 100;
    let pulse = 20 * p5.sin(p5.frameCount * 0.05); // Animation for petal size
    let rotation = p5.frameCount * 0.01; // Animation for rotation

    for (let i = 0; i < petals; i++) {
      let angle = p5.TWO_PI * i / petals + rotation;
      let x = (baseRadius + pulse) * p5.cos(angle);
      let y = (baseRadius + pulse) * p5.sin(angle);

      p5.push();
      p5.rotate(angle);
      p5.fill(255, 0, 100, 180); // Rose color
      p5.noStroke();
      p5.ellipse(x, y, 60 + pulse, 30 + pulse / 2); // Animated petal
      p5.pop();
    }

    // Animated center
    let centerPulse = 10 * p5.sin(p5.frameCount * 0.1);
    p5.fill(255, 200, 200, 220);
    p5.ellipse(0, 0, 50 + centerPulse, 50 + centerPulse);

    // Extra: draw a glowing aura
    p5.noFill();
    p5.stroke(255, 0, 100, 80);
    p5.strokeWeight(4);
    p5.ellipse(0, 0, 180 + pulse, 180 + pulse);
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

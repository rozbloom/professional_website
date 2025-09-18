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
    p5.background(20, 20, 40, 100);
    p5.translate(200, 200);

    // Define layers
    const layers = [4, 6, 3]; // input, hidden, output
    const layerSpacing = 120;
    const nodeRadius = 18;
    let positions = [];

    // Calculate node positions
    for (let l = 0; l < layers.length; l++) {
      let layer = [];
      let y = (l - 1) * layerSpacing;
      for (let n = 0; n < layers[l]; n++) {
        let angle = p5.PI + (p5.PI * n) / (layers[l] - 1);
        let x = 120 * p5.cos(angle);
        layer.push({ x, y });
      }
      positions.push(layer);
    }

    // Draw connections
    p5.stroke(100, 200, 255, 120);
    p5.strokeWeight(2);
    for (let l = 0; l < positions.length - 1; l++) {
      for (let a of positions[l]) {
        for (let b of positions[l + 1]) {
          let pulse = 0.5 + 0.5 * p5.sin(p5.frameCount * 0.05 + a.x + b.x);
          p5.stroke(100, 200, 255, 120 * pulse);
          p5.line(a.x, a.y, b.x, b.y);
        }
      }
    }

    // Draw nodes
    for (let l = 0; l < positions.length; l++) {
      for (let i = 0; i < positions[l].length; i++) {
        let { x, y } = positions[l][i];
        let pulse = 1 + 0.3 * p5.sin(p5.frameCount * 0.1 + x + y);
        p5.noStroke();
        p5.fill(100 + l * 50, 200, 255, 200);
        p5.ellipse(x, y, nodeRadius * pulse, nodeRadius * pulse);
      }
    }
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

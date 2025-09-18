import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import "../styles/FractalTree.css";

let angle;

const Sketch = p5 => {
  const nodeCount = 18;
  const radius = 120;
  let nodes = [];
  let connections = [];
  let particles = [];

  p5.setup = () => {
    p5.createCanvas(400, 400, "transparent");
    // Create nodes in a circle
    nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      let angle = p5.TWO_PI * i / nodeCount;
      let x = 200 + radius * p5.cos(angle);
      let y = 200 + radius * p5.sin(angle);
      nodes.push({ x, y });
    }
    // Create random connections
    connections = [];
    for (let i = 0; i < nodeCount; i++) {
      let j = (i + p5.floor(p5.random(3, 7))) % nodeCount;
      connections.push([i, j]);
    }
    // Create particles
    particles = [];
    for (let c of connections) {
      for (let k = 0; k < 3; k++) {
        particles.push({
          from: c[0],
          to: c[1],
          t: p5.random(1)
        });
      }
    }
  };

  p5.draw = () => {
    p5.clear();
    p5.background(20, 20, 40, 100);

    // Draw connections
    p5.stroke(100, 200, 255, 120);
    p5.strokeWeight(2);
    for (let c of connections) {
      let a = nodes[c[0]];
      let b = nodes[c[1]];
      p5.line(a.x, a.y, b.x, b.y);
    }

    // Draw nodes (brain)
    for (let i = 0; i < nodes.length; i++) {
      let { x, y } = nodes[i];
      let pulse = 1 + 0.2 * p5.sin(p5.frameCount * 0.07 + i);
      p5.noStroke();
      p5.fill(100, 200, 255, 220);
      p5.ellipse(x, y, 18 * pulse, 18 * pulse);
    }

    // Animate flowing data (particles)
    for (let p of particles) {
      let a = nodes[p.from];
      let b = nodes[p.to];
      p.t += 0.01 + 0.01 * p5.noise(p.from, p.to, p.t);
      if (p.t > 1) p.t = 0;
      let x = p5.lerp(a.x, b.x, p.t);
      let y = p5.lerp(a.y, b.y, p.t);
      p5.noStroke();
      p5.fill(255, 255, 0, 180);
      p5.ellipse(x, y, 8, 8);
    }

    // Optional: draw a faint outline for the brain
    p5.noFill();
    p5.stroke(100, 200, 255, 60);
    p5.strokeWeight(3);
    p5.ellipse(200, 200, radius * 2.1, radius * 2.1);
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

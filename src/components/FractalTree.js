
import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import "../styles/FractalTree.css";
const numParticles = 200;

const Sketch = p5 => {
  let wheelRotation = 0;
  let isSpeeding = false;
  let blurTrails = [];

  function makeSteeringWheel(cx, cy, rOuter, rInner, spokes) {
    let arr = [];
    // Outer ring
    for (let i = 0; i < numParticles * 0.7; i++) {
      let angle = p5.TWO_PI * i / (numParticles * 0.7);
      arr.push({ x: cx + rOuter * p5.cos(angle), y: cy + rOuter * p5.sin(angle) });
    }
    // Inner ring
    for (let i = 0; i < numParticles * 0.2; i++) {
      let angle = p5.TWO_PI * i / (numParticles * 0.2);
      arr.push({ x: cx + rInner * p5.cos(angle), y: cy + rInner * p5.sin(angle) });
    }
    // Spokes
    for (let s = 0; s < spokes; s++) {
      let angle = p5.TWO_PI * s / spokes;
      for (let i = 0; i < numParticles * 0.1; i++) {
        let t = i / (numParticles * 0.1);
        arr.push({ x: cx + rInner * p5.cos(angle) * (1 - t) + rOuter * p5.cos(angle) * t, y: cy + rInner * p5.sin(angle) * (1 - t) + rOuter * p5.sin(angle) * t });
      }
    }
    return arr;
  }
  function makeSquare(cx, cy, size) {
    let arr = [];
    for (let i = 0; i < numParticles; i++) {
      let side = Math.floor(4 * i / numParticles);
      let t = (i % (numParticles / 4)) / (numParticles / 4);
      if (side === 0) arr.push({ x: cx - size + 2 * size * t, y: cy - size }); // top
      else if (side === 1) arr.push({ x: cx + size, y: cy - size + 2 * size * t }); // right
      else if (side === 2) arr.push({ x: cx + size - 2 * size * t, y: cy + size }); // bottom
      else arr.push({ x: cx - size, y: cy + size - 2 * size * t }); // left
    }
    return arr;
  }

  function makeTriangle(cx, cy, size) {
    let arr = [];
    for (let i = 0; i < numParticles; i++) {
      let side = Math.floor(3 * i / numParticles);
      let t = (i % (numParticles / 3)) / (numParticles / 3);
      if (side === 0) arr.push({ x: cx - size + 2 * size * t, y: cy + size }); // base
      else if (side === 1) arr.push({ x: cx + size - size * t, y: cy + size - 2 * size * t }); // right
      else arr.push({ x: cx - size + size * t, y: cy + size - 2 * size * t }); // left
    }
    return arr;
  }
  let particles = [];
  let shapes = [];
  let currentShape = 0;
  let nextShape = 1;
  let transitionProgress = 0;
  let lastSwitch = 0;
  let shapeInterval = 180; // frames (~3 seconds at 60fps)
  let numParticles = 200;

  function makeCircle(cx, cy, r) {
    let arr = [];
    for (let i = 0; i < numParticles; i++) {
      let angle = p5.TWO_PI * i / numParticles;
      arr.push({ x: cx + r * p5.cos(angle), y: cy + r * p5.sin(angle) });
    }
    return arr;
  }
  function makeStar(cx, cy, r1, r2, points) {
    let arr = [];
    for (let i = 0; i < numParticles; i++) {
      let angle = p5.TWO_PI * i / numParticles;
      let starAngle = (i % (numParticles / points)) < (numParticles / points) / 2 ? r1 : r2;
      arr.push({ x: cx + starAngle * p5.cos(angle), y: cy + starAngle * p5.sin(angle) });
    }
    return arr;
  }
  function makeHeart(cx, cy, size) {
    let arr = [];
    for (let i = 0; i < numParticles; i++) {
      let t = p5.PI * 2 * i / numParticles;
      let x = size * 32 * Math.pow(Math.sin(t), 3); // doubled size
      let y = -size * 2 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)); // doubled size
      arr.push({ x: cx + x, y: cy + y });
    }
    return arr;
  }

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight, "transparent");
    let cx = p5.width / 2, cy = p5.height / 2;
    let minDim = Math.min(p5.width, p5.height);
    shapes = [
      makeCircle(cx, cy, minDim * 0.45),
      makeSteeringWheel(cx, cy, minDim * 0.45, minDim * 0.19, 3),
      makeStar(cx, cy, minDim * 0.45, minDim * 0.23, 5),
      makeHeart(cx, cy, minDim * 0.03),
      makeSquare(cx, cy, minDim * 0.31),
      makeTriangle(cx, cy, minDim * 0.31)
    ];
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: p5.random(p5.width),
        y: p5.random(p5.height),
        tx: shapes[0][i].x,
        ty: shapes[0][i].y
      });
      blurTrails.push([]);
    }
  }

  p5.draw = () => {
    p5.clear();
    // Switch shapes every few seconds
    if (p5.frameCount - lastSwitch > shapeInterval) {
      lastSwitch = p5.frameCount;
      currentShape = nextShape;
      nextShape = (nextShape + 1) % shapes.length;
      transitionProgress = 0;
      // Set new targets for particles
      for (let i = 0; i < numParticles; i++) {
        particles[i].tx = shapes[currentShape][i].x;
        particles[i].ty = shapes[currentShape][i].y;
        blurTrails[i] = [];
      }
      // If morphing to steering wheel, start speeding effect
      isSpeeding = (currentShape === 1);
      wheelRotation = 0;
    }
    // Animate transition
    transitionProgress = Math.min(1, transitionProgress + 0.02);
    // Speeding effect: rotate wheel and add blur
    if (isSpeeding) {
      wheelRotation += 0.3; // increase for faster spin
    }
    for (let i = 0; i < numParticles; i++) {
      let p = particles[i];
      // Interpolate position
      p.x += (p.tx - p.x) * 0.08 * transitionProgress;
      p.y += (p.ty - p.y) * 0.08 * transitionProgress;
      // Artistic color (white dots)
      let c = p5.color(255, 255, 255);
      p5.noStroke();
      p5.fill(c);
      let dotSize = 14;
      let drawX = p.x, drawY = p.y;
      if (isSpeeding) {
        // Rotate around center
        let cx = p5.width / 2, cy = p5.height / 2;
        let dx = p.x - cx, dy = p.y - cy;
        let r = Math.sqrt(dx * dx + dy * dy);
        let theta = Math.atan2(dy, dx) + wheelRotation;
        drawX = cx + r * Math.cos(theta);
        drawY = cy + r * Math.sin(theta);
        // Add blur trail
        blurTrails[i].push({ x: drawX, y: drawY });
        if (blurTrails[i].length > 10) blurTrails[i].shift();
        for (let j = 0; j < blurTrails[i].length; j++) {
          let alpha = 40 + 20 * j;
          p5.fill(255, 255, 255, alpha);
          p5.ellipse(blurTrails[i][j].x, blurTrails[i][j].y, dotSize, dotSize);
        }
      }
      p5.ellipse(drawX, drawY, dotSize, dotSize);
    }
  }
}

const FractalTree = () => (
  <div id="fractal-tree">
    <ReactP5Wrapper sketch={Sketch} />
  </div>
);

export default FractalTree;

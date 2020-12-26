const canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 800;
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d")!;

function drawJerry(right: number, dir: number) {
  const pts = [
    { x: 260, y: 111 },
    { x: 250, y: 140 },
    { x: 245, y: 200 },
    { x: 225, y: 205 },
    { x: 255, y: 205 },
    { x: 245, y: 225 },
    { x: 225, y: 238 },
    { x: 245, y: 245 },
    { x: 225, y: 250 },
    { x: 245, y: 255 },
    { x: 260, y: 300 },
    { x: 250, y: 450 },
    { x: 300, y: 450 },
    { x: 320, y: 480 },
    { x: 325, y: 510 },
    { x: 340, y: 520 },
    { x: 355, y: 510 },
    { x: 355, y: 350 },
    { x: 285, y: 330 },
    { x: 285, y: 300 },
    { x: 270, y: 255 },
    { x: 285, y: 255 },
    { x: 290, y: 275 },
    { x: 300, y: 285 },
    { x: 325, y: 290 },
    { x: 330, y: 275 },
    { x: 325, y: 255 },
    { x: 360, y: 255 },
    { x: 360, y: 235 },
    { x: 330, y: 225 },
    { x: 350, y: 215 },
    { x: 375, y: 205 },
    { x: 360, y: 185 },
    { x: 350, y: 180 },
    { x: 335, y: 187 },
    { x: 320, y: 200 },
    { x: 360, y: 140 },
    { x: 340, y: 120 },
    { x: 310, y: 170 },
    { x: 303, y: 170 },
    { x: 290, y: 172 },
    { x: 275, y: 185 },
    { x: 275, y: 210 },
    { x: 300, y: 211 },
    { x: 310, y: 200 },
    { x: 315, y: 180 },
    { x: 290, y: 166 },
    { x: 250, y: 145 },
    { x: 210, y: 145 },
    { x: 200, y: 155 },
    { x: 190, y: 175 },
    { x: 210, y: 190 },
    { x: 220, y: 180 },
    { x: 215, y: 160 },
    { x: 180, y: 165 },
    { x: 170, y: 190 },
    { x: 175, y: 250 },
    { x: 205, y: 270 },
    { x: 235, y: 280 },
    { x: 235, y: 280 },
    { x: 245, y: 300 },
    { x: 240, y: 340 },
  ]
    .map((p) => ({ ...p, x: p.x - 250 }))
    .map((p) => ({ ...p, x: p.x * dir }))
    .map((p) => ({ ...p, x: p.x + right }));

  ctx.beginPath();
  for (const pt of pts) {
    ctx.lineTo(pt.x, pt.y);
  }
  // ctx.stroke()
  ctx.beginPath();

  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i + 1 < pts.length; i++) {
    const nextPoint = {
      x: (pts[i].x + pts[i + 1].x) / 2,
      y: (pts[i].y + pts[i + 1].y) / 2,
    };
    ctx.quadraticCurveTo(pts[i].x, pts[i].y, nextPoint.x, nextPoint.y);
  }
  ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
  ctx.strokeStyle = "white";
  ctx.filter = "blur(1px)";
  ctx.lineWidth = 0.5;
  ctx.stroke();
  ctx.stroke();
  ctx.stroke();
  ctx.stroke();
  ctx.globalAlpha = 0.8;
  ctx.filter = "blur(5px)";
  ctx.lineWidth = 5;
  ctx.stroke();

  const lingrad = ctx.createLinearGradient(0, 0, 800, 800);
  lingrad.addColorStop(0, "#a8cfff");
  lingrad.addColorStop(0.75, "#ff9af1");
  ctx.filter = "blur(0px)";
  ctx.fillStyle = lingrad;
  ctx.fill();
  ctx.stroke();
}

function keyDown(e: KeyboardEvent) {
  if (e.key == "ArrowRight") {
    movDir = 10;
  } else if (e.key == "ArrowLeft") {
    movDir = -10;
  }
}

function keyUp(e: KeyboardEvent) {
  if (e.key == "ArrowRight") {
    movDir = 0;
  } else if (e.key == "ArrowLeft") {
    movDir = 0;
  }
}
function lerp(t: number, x0: number, x1: number) {
  return t * x1 + (1 - t) * x0;
}

function draw() {
  requestAnimationFrame(draw);
  ctx.clearRect(0, 0, 800, 800);
  if (movDir != 0) {
    lastMoveDir = movDir;
  }
  facingDir = lerp(0.1, facingDir, Math.sign(lastMoveDir));

  right += movDir;
  drawJerry(right, -facingDir);
}

let lastMoveDir = 1;
let facingDir = 1;
let movDir = 0;
let right = 0;
document.body.addEventListener("keydown", keyDown);
document.body.addEventListener("keyup", keyUp);

draw();

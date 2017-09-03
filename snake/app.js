const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let px = 10, py = 10;
const body = [];
let bodyLen = 5;
let xv = 0, yv = 0;

let gs = 20, tc = 20;
let ax = Math.floor(Math.random()*tc);
let ay = Math.floor(Math.random()*tc);


window.addEventListener('load', init);

function init() {
  document.addEventListener('keydown', movePlayer);
  requestAnimationFrame(game);
}

function movePlayer(e) {
  switch(e.code) {
    case 'KeyS':
    case 'ArrowDown':
      xv = 0;
      yv = 1;
      break;
    case 'KeyW':
    case 'ArrowUp':
      xv = 0;
      yv = -1;
      break;
    case 'KeyA':
    case 'ArrowLeft':
      yv = 0;
      xv = -1;
      break;
    case 'KeyD':
    case 'ArrowRight':
      yv = 0;
      xv = 1;
      break;
  }
}
let rate = 100;
let lastTimeStap = null;
function game(timestamp) {
  if(!lastTimeStap) lastTimeStap = timestamp;
  if(timestamp - lastTimeStap > rate) {
    lastTimeStap = timestamp;
    px += xv;
    py += yv;
    if(px < 0) {
      px = tc-1;
    } else if(px > tc-1) {
      px = 0;
    }
    if(py < 0) {
      py = tc-1;
    } else if(py > tc-1) {
      py = 0;
    }


    // background
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // player
    ctx.fillStyle = '#1f2';
    for(let part of body) {
      ctx.fillRect(part.x*gs, part.y*gs, gs-2, gs-2);
      if( part.x === px && part.y === py) {
        bodyLen = 5;
      }
    }
    body.push({x: px, y: py});
    while(body.length > bodyLen) {
      body.shift();
    }


    if(px === ax && py === ay) {
      bodyLen += 1;
      let lvl = Math.max(10 - Math.floor(bodyLen / 5), 0);
      rate = 1000 - lvl*10;
      console.log('rate:', rate, '; len: ', bodyLen);

      ax = Math.floor(Math.random()*tc);
      ay = Math.floor(Math.random()*tc);
    }

    // apple
    ctx.fillStyle = '#f00';
    ctx.fillRect(ax*gs, ay*gs, gs-2, gs-2);

  }


  requestAnimationFrame(game);
}

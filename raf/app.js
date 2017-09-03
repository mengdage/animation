window.addEventListener('keydown', keypressHandler);
function keypressHandler(e) {
  console.log('window: ', e.key, e.code);
}
const box = document.querySelector('.box');
let start = null;
function move(timestamp) {
  if(!start) start = timestamp;
  console.log(timestamp);
  box.style.width = box.clientWidth + 1 + 'px';
  if(timestamp-start < 2000) {
    requestAnimationFrame(move);
  }
}

requestAnimationFrame(move);

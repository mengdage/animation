window.addEventListener('keydown', keypressHandler);
function keypressHandler(e) {
  console.log('window: ', e.key, e.code);
}
const box = document.getElementsByClassName('box')[0];
let start = null;
function move(timestamp) {
  if(!start) start = timestamp;
  console.log(timestamp);
  box.style.width = Math.max((timestamp-start)/10, 100) + 'px';
  if(timestamp-start < 2000) {
    requestAnimationFrame(move);
  }
}

requestAnimationFrame(move);

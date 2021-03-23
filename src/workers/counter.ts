export default function () {
  var i = 0;
  function time() {
    i += 1;
    postMessage(i, 'demo_weishao');
    setTimeout('time()', 500);
  }
  time();
}

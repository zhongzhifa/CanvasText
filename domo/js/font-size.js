(function (size) {
  var d = document.documentElement;
  var timer;
  function recalc() {
    var w = d.clientWidth;
    var dpr = window.devicePixelRatio;
    w = dpr === 1 ? size : w;
    d.setAttribute('data-dpr', dpr);
    d.style.fontSize = w / size * 100 + 'px';
    // 处理1像素边框，hairlines表示支持1像素边框
    if (dpr >= 2) {
      var testEl = document.createElement('div');
      testEl.style.border = '.5px solid transparent';
      // 兼容首次渲染body不存在以及resize事件
      if (document.body) {
        document.body.appendChild(testEl);
        (testEl.offsetHeight === 1) && d.classList.add('hairlines');
        document.body.removeChild(testEl);
      } else {
        var body = document.createElement('body');
        body.appendChild(testEl);
        (testEl.offsetHeight === 1) && d.classList.add('hairlines');
        document.removeChild(body);
      }
    }
  };
  // 函数节流
  function resize() {
    clearTimeout(timer);
    timer = setTimeout(recalc, 100);
  }
  window.addEventListener('resize', resize);
  document.addEventListener('DOMContentLoaded', recalc);
})(750);
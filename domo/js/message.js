/*
 * Name: 简单Message提示框控件
 * Version: v1.0.0
 * Date: 2018-02-08
 * Author: zz.f@foxmail.com
 */
function Message() {
  this.timer = '';
  document.getElementById('message') || this.createDom();
  document.getElementById('message-css') || this.createCss();
};

// 主函数
Message.prototype.show = function (info) {
  var messageBox = document.getElementById('message');
  messageBox.getElementsByTagName('span')[0].innerText = info
  messageBox.classList.add('show');
  // 如果定时器为真，则清空定时器
  this.timer && clearTimeout(this.timer);
  this.timer = setTimeout(function () {
    messageBox.classList.remove('show');
    clearTimeout(this.timer);
  }, 3000)
};

// 创建dom
Message.prototype.createDom = function () {
  var message = document.createElement('div');
  var span = document.createElement('span');
  message.id = 'message';
  message.appendChild(span);
  document.body.appendChild(message);
};

// 动态创建css
Message.prototype.createCss = function () {
  var style = document.createElement('style');
  style.id = 'message-css';
  var text = '#message{position:fixed;top:-50px;left:0;width:100%;text-align:center;-webkit-transition:all .5s;transition:all .5s;z-index:1000;opacity:0}#message span{display:inline-block;padding:0 10px;background-color:rgba(0,0,0,.7);border-radius:4px;color:#fff;font-size:14px;line-height:30px;white-space:nowrap}#message.show{opacity:1;-webkit-transform:translate3d(0,100px,0);transform:translate3d(0,100px,0)}'
  style.innerHTML = text;
  document.head.appendChild(style);
};
/*
 * Name: canvas文字绘制
 * Version: v1.0.0
 * Date: 2018-02-07
 * Author: zz.f@foxmail.com
 */
function CanvasText() {};

/**
 * 绘制居中的单一文本
 * @param {Object} ctx - 2d canvas容器
 * @param {Object} opt - 文本及配置参数
 */
CanvasText.prototype.drawCenter = function (ctx, opt) {
  // 绘制标题
  ctx.font = opt.style;
  ctx.fillStyle = opt.color;
  ctx.textAlign = 'center';
  ctx.fillText(opt.content, ctx.canvas.width / 2, opt.y);
};

/**
 * 绘制单行居中的复杂文本
 * @param {Object} ctx - 2d canvas容器
 * @param {Object} opt - 文本及配置参数
 */
CanvasText.prototype.SingleCenterByComplex = function (ctx, opt) {
  var centerPoint = ctx.canvas.width / 2; // 中心点
  var W = 0; // 字体总宽度
  var dx; // 记录距离左侧的位置
  ctx.textAlign = 'left';
  for (var j = 0; j < opt.content.length; j++) {
    ctx.font = opt.content[j].style;
    W += opt.content[j].width = ctx.measureText(opt.content[j].text).width;
  };
  dx = centerPoint - W / 2;
  for (var i = 0; i < opt.content.length; i++) {
    ctx.font = opt.content[i].style;
    ctx.fillStyle = opt.content[i].color ? (opt.content[i].color) : ('#000000');
    ctx.fillText(opt.content[i].text, dx, opt.y);
    dx += opt.content[i].width;
  };
};

/**
 * 绘制多行居中的复杂文本
 * @param {Object} ctx - 2d canvas容器
 * @param {Object} opt - 文本及配置参数
 */
CanvasText.prototype.MultiLineByComplex = function (ctx, opt) {
  ctx.textAlign = 'left';
  var dX = (ctx.canvas.width - opt.width) / 2; // 左侧Y轴起点
  var endX = ctx.canvas.width - dX;
  var currentX = dX; // 当前Y轴点
  var currentW = 0; // 当前行宽度
  var currentT = opt.y; // 当前行的高
  // 首行缩进2字符
  if (opt.textIndent) {
    currentX = parseInt(opt.content[0].style) + dX;
  };
  for (var i = 0; i < opt.content.length; i++) {
    var fontSize = parseInt(opt.content[i].style);
    ctx.font = opt.content[i].style;
    ctx.fillStyle = opt.content[i].color ? opt.content[i].color : '#333333';
    for (var j = 0; j < opt.content[i].text.length; j++) {
      var text = opt.content[i].text.substr(j, 1);
      var textWidth = ctx.measureText(text).width;
      currentX += textWidth + 2;
      if ((currentX + fontSize) > endX) {
        currentT += opt.lianHeght;
        currentX = dX;
      };
      ctx.fillText(text, currentX, currentT);
    };
  };
};

/**
 * 绘制单行的方向对齐文本,left或right
 * @param {Object} ctx - 2d canvas容器
 * @param {Object} opt - 文本及配置参数
 */
CanvasText.prototype.SingleByDirection = function (ctx, opt) {
  ctx.textAlign = 'left';
  var dx = opt.x,
    width; // 字体宽度
  ctx.font = opt.style;
  ctx.fillStyle = opt.color;
  width = ctx.measureText(opt.text).width;
  opt.direction === 'right' && (dx = ctx.canvas.width - opt.x - width);
  ctx.fillText(opt.text, dx, opt.y);
};
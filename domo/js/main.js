// 称号数组
var titleList = [
  {text: '最优秀毕业生', textEnd: '称号'},
  {text: '最具潜力毕业生', textEnd: '称号'},
  {text: '受到清华、北大等  10家名校', textEnd: '青睐'},
  {text: '全球  500强企业的干部储备生', textEnd: '名额'},
  {text: '美国常春藤名校', textEnd: '青睐'},
],
score = Math.ceil(Math.random() * 100) + 650, // 随机分数
title = Math.ceil(Math.random() * (titleList.length - 1)), // 随机选择数组
mask = document.getElementById('mask'),
image = new Image();
image.src = './img/bg.png';
image.onload = function () {
  mask.style.display = 'none';
  mask.classList.remove('bg-w');
  document.getElementById('loading').style.display = 'none';
  main();
};
var canvas = document.getElementById('canvas'),
ctx = canvas.getContext('2d');

// canvas函数
function main() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.drawImage(image, 0, 0);
  ctx.textBaseline = 'alphabetic';
  var main = new CanvasText();
  // 标题
  main.drawCenter(ctx, {
    content: '— 2018年高考捷报 —',
    style: '34px Bold SimSun',
    color: '#ab322a',
    y: 430
  });
  // 绘制分数
  main.SingleCenterByComplex(ctx, {
    content: [
      {text: score, style: '58px Bold SimSun'},
      {text: '分', style: '36px Bold SimSun'}
    ],
    y: 520
  });
  // 绘制描述
  main.MultiLineByComplex(ctx, {
    content: [
      {text: '2018年高考成绩揭晓，', style: '28px Bold SimSun'},
      {text: ''+ sessionStorage.name +'', style: '36px Bold SimSun', color: '#9c180a'},
      {text: ' 同学以 ', style: '28px Bold SimSun'},
      {text: ''+ score +'分 ', style: '36px Bold SimSun', color: '#9c180a'},
      {text: '获得', style: '28px Bold SimSun'},
      {text: ''+ titleList[title].text +' ', style: '36px Bold SimSun', color: '#9c180a'},
      {text: ''+ titleList[title].textEnd +'，以优异的成绩为校增光，望广大师生同学多向'+ sessionStorage.name +'同学请教学习。', style: '28px Bold SimSun'}
    ],
    y: 594,
    width: 420,
    lianHeght: 55,
    textIndent: true
  });
  // 处理学校的Y坐标
  var schoolY = 920;
  (title === 2 || title === 3) && (schoolY = 960);
  // 绘制学校名称
  main.SingleByDirection(ctx, {
    direction: 'right',
    x: 170,
    y: schoolY,
    text: '— '+ sessionStorage.schoolName +'',
    style: '28px Bold SimSun',
    color: '#333333'
  });
};

// 变换模板
document.getElementById('change').addEventListener('click', function () {
  ++title;
  title > titleList.length - 1 && (title = 0);
  main();
});

// 生成图片
document.getElementById('build').addEventListener('click', function () {
  var main = new CanvasText();
  // 二维码描述
  main.drawCenter(ctx, {
    content: '测测您的高考成绩',
    style: '24px Bold SimSun',
    color: '#ab322a',
    y: 1120
  });
  var code = new Image();
  code.src = './img/code.png';
  code.onload = function () {
    ctx.drawImage(code, 312, 970, 126, 126);
    var url = canvas.toDataURL();
    document.getElementById('img').src = url;
    document.getElementById('img').classList.remove('none');
    mask.style.display = '';
    document.getElementById('exit').classList.remove('none');
  };
});

// 关闭
document.getElementById('exit').addEventListener('click', function () {
  main();
  mask.style.display = 'none';
});
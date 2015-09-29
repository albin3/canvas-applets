$(document).ready(function() {
  var canvas = $('#canvas');
  var canvasWidth  = canvas.width();
  var canvasHeight = canvas.height();
  var context = canvas.get(0).getContext('2d');
  var playAnimation = true;
  var startButton = $('#startAnimation');
  var stopButton = $('#stopAnimation');
  startButton.hide();
  startButton.click(function() {
    $(this).hide();
    stopButton.show();
    playAnimation = true;
    animate();
  });

  stopButton.click(function() {
    $(this).hide();
    startButton.show();
    playAnimation = false;
  });

  //全局变量
  var margin = 100; //margin
  var w = 20;       //方块的大小

  var baseLine = (function () {
    return function () {
      //左边的线
      context.beginPath();
      context.moveTo(margin, 0);
      context.lineTo(margin, canvasHeight);
      context.stroke();
     
      //右边的线
      context.beginPath();
      context.moveTo(canvasWidth - margin, 0);
      context.lineTo(canvasWidth - margin, canvasHeight);
      context.stroke();
    };
  })();

  //匀速直线运动
  var uniformMotion = (function () {
    var v = 5;        //速度
    var x = margin;   //方块在屏幕中的x位置

    return function() {
      context.fillStyle = '#5CA0E7';
      context.fillRect(x, 50, w, w);
      x = x + v;
      if (x + w >= canvasWidth - margin || x <= margin) {
        v = -v;
      }
    };
  })();

  //匀加速运动
  var uniformlyAcceleratedMotion = (function () {
    var v = 0;
    var a = 1;
    var x = margin;

    return function () {
      context.fillStyle = '#5CA0E7';
      context.fillRect(x, 100, w, w);
      v = v + a;
      if (x + v >= canvasWidth - margin) {
        v = -v;
      } else {
        x = x + v;
      }
    };
  })();


  function animate() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    //基准线
    baseLine();

    //匀速直线运动
    uniformMotion();

    //匀加减速直线运动
    uniformlyAcceleratedMotion();

    if (playAnimation) {
      setTimeout(animate, 33);
    }
  };

  animate();
});

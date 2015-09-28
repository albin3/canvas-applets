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

  var v = 5;        //速度
  var margin = 100; //margin
  var x = margin;   //方块在屏幕中的x位置
  var w = 20;       //方块的大小
  function animate() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);

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

    context.fillStyle = '#5CA0E7';
    context.fillRect(x, 200, w, w);
    x = x + v;
    if (x + w >= canvasWidth - margin || x <= margin) {
      v = -v;
    }

    if (playAnimation) {
      setTimeout(animate, 33);
    }
  };

  animate();
});

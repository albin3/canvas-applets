//TODO: 待优化，让效果更像冒泡，比如碰撞后合并，随机生成泡泡等
$(document).ready(function() {
  var canvas = $('#canvas');
  var canvasWidth  = canvas.width();
  var canvasHeight = canvas.height();
  var context = canvas.get(0).getContext("2d");
  var playAnimation = true;
  var startButton = $("#startAnimation");
  var stopButton = $("#stopAnimation");
  startButton.hide();
  startButton.click(function(){
    $(this).hide();
    stopButton.show();
    playAnimation = true;
    animate();
  });
  stopButton.click(function(){
    $(this).hide();
    startButton.show();
    playAnimation = false;
  });
  var Shape = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width  = width;
    this.height = height;
    this.angle  = 2*Math.PI*Math.random();
    var radius = Math.random() * 5  + 10;
    this.radius = radius;
    this.mvlength = 100;
    this.vx = (Math.random()*1 + 0.5)/10;
    //加入浮力作用，冒泡为加速运动
    this.ay = radius*radius*radius*Math.PI/80000;
    this.vy = 0;
  }
  var shapes = new Array();
  for (var i=0; i<60; i++) {
    var x = Math.random()*600;
    var y = Math.random()*600;
    var width = height = Math.random()*30;
    shapes.push(new Shape(x, y, width, height));
  }
  function animate() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    for(var i=0; i<shapes.length; i++) {
      context.save();
      context.fillStyle = "rgb(200,200,200)";
      context.globalCompositeOperation = "lighter";
      var tmpShape = shapes[i];
      if (tmpShape.y+tmpShape.radius<0) {
        tmpShape.vy = 0;
        tmpShape.y = 600+tmpShape.radius;
      } else {
        tmpShape.vy += tmpShape.ay;
        tmpShape.y -= tmpShape.vy;
      }
      tmpShape.angle += Math.PI/180/100;
      // tmpShape.x = tmpShape.x+tmpShape.radius > 1000 ? tmpShape.radius : tmpShape.x+1;
      context.beginPath();
      context.arc(tmpShape.x+tmpShape.mvlength*Math.cos(tmpShape.angle*(Math.PI*180)*tmpShape.vx), tmpShape.y, tmpShape.radius, 0, Math.PI*2, false);
      context.closePath();
      context.fill();
      context.restore();
    }
    if (playAnimation) {
      setTimeout(animate, 33);
    }
  };
  animate();
});

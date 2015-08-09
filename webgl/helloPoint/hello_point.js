
//顶点着色器
var VSHADER_SOURCE =
    'void main() {' +
    ' gl_Position = vec4(0.0, 0.0, 0.0, 1.0);' +
    ' gl_PointSize = 10.0;' +
    '}';

//片元着色器
var FSHADER_SOURCE =
    'void main() {' +
    ' gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);' +
    '}';

function main() {
  //canvas
  var canvas = document.getElementById('webgl');

  //获取上下文
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  //初始化着色器
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to initialize shaders.');
    return;
  }

  //设置canvas背景色
  gl.clearColor(0.0, 0,0, 0,0, 1.0);

  //清空canvas
  gl.clear(gl.COLOR_BUFFER_BIT);

  //绘制一个点
  gl.drawArrays(gl.POINTS, 0, 1);
}



export const run = () =>{
 // 获取WebGL上下文（核心依赖）
 const canvas = document.getElementById('canvas');
 const gl = canvas.getContext('webgl');

 // 顶点着色器源码（用户提供的代码）
 const vsSource = `
   attribute vec4 a_position;
   void main() {
     gl_Position = a_position;
   }c
 `;

 // 片段着色器（必要补充）
 const fsSource = `
   precision mediump float;
   void main() {
     gl_FragColor = vec4(1, 0, 0.5, 1); // 紫色
   }
 `;

 // 创建着色器程序
 const program = gl.createProgram();

 // 编译顶点着色器
 const vertexShader = gl.createShader(gl.VERTEX_SHADER);
 gl.shaderSource(vertexShader, vsSource);
 gl.compileShader(vertexShader);
 gl.attachShader(program, vertexShader);

 // 编译片段着色器
 const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
 gl.shaderSource(fragmentShader, fsSource);
 gl.compileShader(fragmentShader);
 gl.attachShader(program, fragmentShader);

 // 链接着色程序
 gl.linkProgram(program);
 gl.useProgram(program);

 // 顶点数据（三角形）
 const positions = new Float32Array([
    0, 0.5,   // 顶点1
   -0.5,-0.5, // 顶点2
    0.5,-0.5  // 顶点3
 ]);

 // 创建缓冲区
 const positionBuffer = gl.createBuffer();
 gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
 gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

 // 获取属性位置
 const aPosition = gl.getAttribLocation(program, 'a_position');
 gl.enableVertexAttribArray(aPosition);

 // 配置属性指针（关键步骤）
 gl.vertexAttribPointer(
   aPosition, 
   2,         // vec2 (x,y)
   gl.FLOAT, 
   false, 
   0,         // stride
   0          // offset
 );

 // 渲染
 gl.drawArrays(gl.TRIANGLES, 0, 3);
}
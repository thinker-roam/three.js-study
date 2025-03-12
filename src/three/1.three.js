import * as THREE from 'three';

export const renderBox = () => {
  /**

    1. 创建场景 sence 
    2. 创建相机 & 设置相机尺寸
        new THREE.PerspectiveCamera() // 透视相机
    3. 创建渲染器
        new THREE.WebGLRenderer()
    4. 设置渲染器尺寸
    5. 将渲染器 dom 挂载到页面中
    
    6. 创建 立方体
    7. 创建 材质
    8. 创建网格 应用 立方体 与 材质
    9. 将网格 添加到 场景中
    10. 移动摄像机位置 防止重合
    11. 创建持续动画
        11-1 requestAnimationFrame
        11-2 cute.rotation x/y
        11-3 renderer.render(sence, camera)
 */

  const scene = new THREE.Scene();
  // 透视摄像机
  // 某部分物体比 近截面 近 或 比 远截面 远 时，该部分不会渲染到场景中
  const camera = new THREE.PerspectiveCamera(
    75, // 视野角度 FOV （：无论什么时候，能在显示器上看到的场景范围）单位是角度
    window.innerWidth / window.innerHeight, // 长宽比 aspect ratio
    0.1, // 近截面 near
    1000 // 远截面 far
  );

  // 创建渲染器
  const renderer = new THREE.WebGLRenderer();
  // 设置渲染器尺寸
  renderer.setSize(
    window.innerWidth,
    window.innerHeight
    // false // updateStyle 保持应用程序尺寸,但以较低分辨率渲染
  );

  document.body.appendChild(renderer.domElement);

  // 创建 立方体
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // 设置立方体的 材质
  const material = new THREE.MeshBasicMaterial({ color: '#f40' });

  // 创建一个网格
  const cube = new THREE.Mesh(geometry, material);

  //将网格添加到场景中  , 默认添加到 (0,0,0) 坐标中
  scene.add(cube);

  // 移动摄像机位置 , 防止重合
  camera.position.z = 5;

  // 持续动画
  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();
};

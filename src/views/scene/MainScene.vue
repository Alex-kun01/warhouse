<template>
  <div class="mainScene">
    <div id="scene_main"></div>
    <WarList />
    <ThingList />
    <FangAn />
  </div>
</template>
<script>
import Scene from '@/utils/scene.js';
import WarList from '../components/WarList.vue';
import ThingList from '../components/ThingList.vue';
import FangAn from '../components/FangAn.vue';

export default {
  name: 'mainScene',
  components: { WarList, ThingList, FangAn },
  data: () => {
      return {
        scene: null,
        warHeight: 10,
        warWidth: 30,
        warLength: 60,
        boxHeight: 3,
        boxWidth: 3,
        boxLength: 6,
        positionX: 0,
        positionY: 0,
        positionZ: 0,
      }
  },
  mounted(){
      this.$nextTick(() => {
        const instance = document.getElementById('scene_main');
        this.scene = new Scene(instance);
      })
  },
  methods: {
      // 创建仓库
      createWar() {
        const { warLength, warWidth, warHeight } = this;
        if (!warHeight || !warWidth || !warLength) return;
        this.scene.createWarhouse(+warLength, +warWidth, +warHeight);
      },
      // 创建箱子
      createBox() {
        const { boxLength, boxWidth, boxHeight, positionX, positionY, positionZ } = this;
        this.scene.createBox(+boxLength, +boxWidth, +boxHeight, +positionX, +positionY, +positionZ );
      },
      deleteWar() {
          this.scene.removeWarhouse();
      },
      // 初始化场景
      initScene(instance){
        const hetght = instance.clientHeight - 25;
        const width = instance.clientWidth - 25;

        // 创建场景对象Scene
      const scene = new THREE.Scene();
      scenFun.addSkybox(1000, scene);

      // 创建相机对象
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1,1000);

      // 创建渲染器对象
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, hetght);

      instance.append(renderer.domElement);
      renderer.render(scene, camera);
      camera.position.z = 5;
      renderer.setClearColor(0xeeeeee, 1.0);

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

      // 辅助坐标系  参数400表示坐标系大小，可以根据场景大小去设置
    //   const axisHelper = new THREE.AxisHelper(20);
    //   scene.add(axisHelper);

      //点光源
      const point = new THREE.PointLight(0xffffff);
      point.position.set(0, 0, 0);
      scene.add(point); //点光源添加到场景中

      // 点光源2  位置和point关于原点对称
      const point2 = new THREE.PointLight(0xffffff);
      point2.position.set(-400, -200, -300); //点光源位置
      scene.add(point2); //点光源添加到场景中。

      //鼠标操作旋转、缩放,OrbitControls需要单独引入
      new THREE.OrbitControls(camera, renderer.domElement);

        const animate = function () {
            requestAnimationFrame(animate);
            //   cube.rotation.x += 0.01;
            //   cube.rotation.y += 0.01;
            renderer.render(scene, camera);
            };

            animate();
      }
  }
}
</script>

<style lang="less" scoped>
.mainScene {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    .button {
        width: 200px;
        height: 150px;
        background: #ffff;
        position: absolute;
        top: 20px;
        left: 30px;
        box-sizing: border-box;
        padding-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;

        &.two {
          height: 230px;
          left: 300px;
        }

        .input_box {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;

          input {
            margin-bottom: 10px;
          }
         }

        button {
            margin-right: 10px;
        }
    }

    #scene_main {
        width: 100%;
        height: 100%;

        canvas {
          width: 100%;
          height: 100%;
        }
    }
}
</style>

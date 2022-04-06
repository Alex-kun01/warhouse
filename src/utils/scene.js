const right = require('../../public/static/images/skybox/远山_RT.jpg');
const left = require('../../public/static/images/skybox/远山_LF.jpg');
const top = require('../../public/static/images/skybox/远山_UP.jpg');
const bottom = require('../../public/static/images/skybox/远山_DN.jpg');
const back = require('../../public/static/images/skybox/远山_BK.jpg');
const front = require('../../public/static/images/skybox/远山_FR.jpg');
const floorBg = require('../../public/static/images/floor.jpg');
const boxBg = require('../../public/static/images/box.png');

export default class Scene {
    constructor(targetDom) {
        this.target = targetDom;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.matArrayB = []; // 外墙
        this.floor = null; // 地板
        this.warBoxs = []; // 仓库的墙体数组
        this.warWidth = 30; // 仓库墙高
        this.warHeight = 1; // 仓库墙宽
        this.warLength = 60; // 仓库墙长
        this.orbitControls = null; // 控制器
        this.things = []; // 箱子对象数组
        this.init();
        this.animate();
    }

    init = () => {
        this.initScene();
        this.initCamera();
        this.addSkybox();
        this.initLight();
        this.initRenderer();
        this.openOrbitControls();
        this.createWallMaterail();
    }

    // 初始化场景
    initScene = () => {
        this.scene = new THREE.Scene(); 
    }

    // 初始化相机
    initCamera = () => {
        this.camera = new THREE.PerspectiveCamera(80, 1, 1,1500);
        this.camera.name = 'mainCamrea';
        window.jcamera = this.camera;
    }

    // 初始化灯光
    initLight = () => {
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3); //模拟远处类似太阳的光源
        directionalLight.color.setHSL(0.1, 1, 0.95);
        directionalLight.position.set(0, 200, 0).normalize();
        this.scene.add(directionalLight);
  
        const ambient = new THREE.AmbientLight(0xffffff, 1); //AmbientLight,影响整个场景的光源
        ambient.position.set(0, 0, 0);
        this.scene.add(ambient);
      }

    //region 放置天空盒
    addSkybox = ( size,scene ) => {
        const urls = [right,left,top,bottom,back,front];
         const skyboxCubemap = new THREE.CubeTextureLoader().load( urls );
         skyboxCubemap.format = THREE.RGBFormat;
 
         const skyboxShader = THREE.ShaderLib['cube'];
         skyboxShader.uniforms['tCube'].value = skyboxCubemap;
         const obj = new THREE.Mesh(
             new THREE.BoxGeometry( 1000, 1000, 1000 ),
             new THREE.ShaderMaterial({
                 fragmentShader : skyboxShader.fragmentShader,
                 vertexShader : skyboxShader.vertexShader,
                 uniforms : skyboxShader.uniforms,
                 depthWrite : false,
                 side : THREE.BackSide
             })
         );
         this.scene.add( obj );
     }

     // 初始化渲染器
     initRenderer = () => {
        this.renderer = new THREE.WebGLRenderer({
          antialias: true
        });
        this.renderer.setSize(this.target.clientHeight - 25, this.target.clientWidth - 25);
        this.renderer.setClearColor(0x4682B4, 1.0);
        this.target.append(this.renderer.domElement);
        this.renderer.render(this.scene, this.camera);
        this.camera.position.x = 90;
        this.camera.position.y = 90;
        this.camera.position.z = 0;
      }

     /**
      *  创建仓库
      * @param {*} length 长
      * @param {*} width  宽
      * @param {*} height 高
      * @returns 
      */
     createWarhouse = (length, width, height) => {
        if (this.warBoxs.length !== 0) return;
        this.warHeight = height;
        this.warLength = length + 2;
        this.warWidth = width + 2;  
        // 计算x轴偏移量
        const clineX = (this.warWidth / 2) - 0.5; 
        // 计算y轴偏移量
        const clineY = (this.warLength / 2) - 0.5;
        // 计算z轴偏移量
        const clineZ = this.warHeight / 2;
        // 创建地板
        this.createFloor();
        //                  宽  高  长                    左  高  前
        // this.createCubeWall(1, 10, 60, 0, this.matArrayB, -14.5, 5, 0, "test");
        this.createCubeWall(1, this.warHeight, this.warLength, 0, this.matArrayB, -clineX, clineZ, 0, "墙面-左");
        this.createCubeWall(1, this.warHeight, this.warLength, 0, this.matArrayB, clineX, clineZ, 0, "墙面-右");
        this.createCubeWall(1, this.warHeight, this.warWidth, 1.5, this.matArrayB, 0, clineZ, clineY, "墙面-前");
        this.createCubeWall(1, this.warHeight, this.warWidth, 1.5, this.matArrayB, 0, clineZ, -clineY, "墙面-后");
     }
     
     // 创建箱子
     createBox = (length, width, height, x, y, z) => {
       
       if (!length || !width || !height || this.warBoxs.length === 0) return;
      const cubeGeo = new THREE.BoxBufferGeometry( width, height, length );
			const cubeMaterial = new THREE.MeshLambertMaterial( { color: 0xfeb74c, map: new THREE.TextureLoader().load( boxBg ) } );
      const voxel = new THREE.Mesh( cubeGeo, cubeMaterial );
      // 计算X轴原点
      const originX = this.warLength / 2 - (1 + length / 2);
      // 计算Y轴原点
      const originY = -(this.warWidth / 2 - (1 + width / 2));
      // Z轴原点
      const originZ = 2;
      // 根据传入的参数 得到箱子的X、Y、Z轴相对于仓库的坐标
      const positionX = originX - x;
      const positionY = originY + y;
      const positionZ = originZ + z;
      voxel.position.set(positionY,positionZ,positionX);
      voxel.name = "货物1";
      this.scene.add( voxel );
      this.things.push(voxel);
     }

     // 销毁仓库
     removeWarhouse = () => {
         if (this.warBoxs.length !== 0) {
           this.warBoxs.forEach(thing => {
            this.scene.remove(thing);
           })
         };

         if (this.things.length !== 0) {
          this.things.forEach(thing => {
            this.scene.remove(thing);
           })
         }

         setTimeout(() => { 
          this.warBoxs = [];
          this.warHeight = 0;
          this.warLength = 0;
          this.warWidth = 0;
          this.floor = null;
          }, 0)
     }
    
     // 创建地板
     createFloor = () => {
        const loader = new THREE.TextureLoader();
        loader.load(floorBg, (texture) => {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
          texture.repeat.set(10, 10);
          //                                          宽  长  高
          const floorGeometry = new THREE.BoxGeometry(this.warWidth, this.warLength, 1);
          const floorMaterial = new THREE.MeshBasicMaterial({
            map: texture,
          });
          this.floor = new THREE.Mesh(floorGeometry, floorMaterial);
          this.floor.rotation.x = -Math.PI / 2;
          this.floor.name = "地面";
          this.scene.add(this.floor);
          this.warBoxs.push(this.floor);
        });
      }

      // 创建墙体纹理
      createWallMaterail = () => {
        this.matArrayB.push(new THREE.MeshPhongMaterial({color: 0xafc0ca}));  //前  0xafc0ca :灰色
        this.matArrayB.push(new THREE.MeshPhongMaterial({color: 0x9cb2d1}));  //后  0x9cb2d1：淡紫
        this.matArrayB.push(new THREE.MeshPhongMaterial({color: 0xd6e4ec}));  //上  0xd6e4ec： 偏白色
        this.matArrayB.push(new THREE.MeshPhongMaterial({color: 0xd6e4ec}));  //下
        this.matArrayB.push(new THREE.MeshPhongMaterial({color: 0xafc0ca}));  //左   0xafc0ca :灰色
        this.matArrayB.push(new THREE.MeshPhongMaterial({color: 0xafc0ca}));  //右
      }
      
      // 创建墙体 this.createCubeWall(10, 200, 2600, 1.5, this.matArrayB, 0, 100, -700, "墙面");
      createCubeWall = (width, height, depth, angle, material, x, y, z, name) => {
        console.log('jzk ', width, height, depth)
        const cubeGeometry = new THREE.BoxGeometry(width, height, depth);
        const cube = new THREE.Mesh(cubeGeometry, material);
        cube.position.x = x;
        cube.position.y = y;
        cube.position.z = z;
        cube.rotation.y += angle * Math.PI; //-逆时针旋转,+顺时针
        cube.name = name;
        this.scene.add(cube);
        this.warBoxs.push(cube);
      }

    // 摄像机控制
    openOrbitControls = () => {
        //鼠标操作旋转、缩放,OrbitControls需要单独引入
        this.orbitControls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        // 限制zoom缩放
        this.orbitControls.minDistance = window.config.sceneParams.carams.minDistance;
        this.orbitControls.maxDistance = window.config.sceneParams.carams.maxDistance;
        // 限制垂直旋转的角度上限
        this.orbitControls.maxPolarAngle = window.config.sceneParams.carams.maxPolarAngle;
        // 启用或禁用摄像机缩放
        this.orbitControls.enableZoom = window.config.sceneParams.carams.enableZoom;
        // 启用或禁用键盘控制
        this.orbitControls.enableKeys = window.config.sceneParams.carams.enableKeys;
        // 启用或禁用摄像机平移
        this.orbitControls.enablePan = window.config.sceneParams.carams.enablePan;
    }

     animate = () => {
        requestAnimationFrame(this.animate);
        this.orbitControls.update();
        this.renderer.render(this.scene, this.camera);
     }
}
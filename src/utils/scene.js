const right = require(`../../public/static/images/skybox/${window.config.sceneParams.scene.skyBox}/posx.jpg`);
const left = require(`../../public/static/images/skybox/${window.config.sceneParams.scene.skyBox}/negx.jpg`);
const top = require(`../../public/static/images/skybox/${window.config.sceneParams.scene.skyBox}/posy.jpg`);
const bottom = require(`../../public/static/images/skybox/${window.config.sceneParams.scene.skyBox}/negy.jpg`);
const back = require(`../../public/static/images/skybox/${window.config.sceneParams.scene.skyBox}/posz.jpg`);
const front = require(`../../public/static/images/skybox/${window.config.sceneParams.scene.skyBox}/negz.jpg`);
const floorBg = require('../../public/static/images/floor.jpg');
const boxBg = require('../../public/static/images/box.png');
import store from '../store';
export default class Scene {
    constructor(targetDom) {
        this.target = targetDom; // 目标渲染dom
        this.scene = null; // 场景实例
        this.camera = null; // 相机实例
        this.renderer = null; // 渲染器实例
        this.matArrayB = []; // 外墙
        this.floor = null; // 地板
        this.warBoxs = []; // 仓库的墙体数组
        this.warWidth = 30; // 仓库墙高
        this.warHeight = 1; // 仓库墙宽
        this.warLength = 60; // 仓库墙长
        this.orbitControls = null; // 控制器
        this.things = []; // 箱子对象数组
        this.thingLines = []; // 箱子描边数组
        this.thingObj = null; // 单个箱子
        this.lineBox = null; // 单个箱子描边
        this.raycaster = null;
        this.mouse = null;
        this.composer = null;
        this.outlinePass = null;
        this.renderPass = null;
        this.orbit = {};
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
        this.target.addEventListener( "mousedown", this.thingClickEnent, false );
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
    }

    // 初始化场景
    initScene = () => {
        this.scene = new THREE.Scene();
    }

    // 初始化相机
    initCamera = () => {
        this.camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 1500);
        this.camera.name = 'mainCamrea';
        window.$camera = this.camera;
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
         const { length, width, height } = window.config.sceneParams.scene;
         const obj = new THREE.Mesh(
             new THREE.BoxGeometry( length, width, height ),
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
        antialias: true,
        preserveDrawingBuffer: true,
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
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
    createWarhouse = (name,length, width, height) => {
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
        this.createCubeWall(1, this.warHeight, this.warLength, 0, this.matArrayB, -clineX, clineZ, 0, "墙面-左");
        this.createCubeWall(1, this.warHeight, this.warLength, 0, this.matArrayB, clineX, clineZ, 0, "墙面-右");
        this.createCubeWall(1, this.warHeight, this.warWidth, 1.5, this.matArrayB, 0, clineZ, clineY, "墙面-前");
        this.createCubeWall(1, this.warHeight, this.warWidth, 1.5, this.matArrayB, 0, clineZ, -clineY, "墙面-后");
        setTimeout(() => {
          store.commit('setWarInfo', {
            name,
            width: this.warWidth,
            height: this.warHeight,
            length: this.warLength
          })
        },0)
    }
    
    // 创建箱子
    createBox = (name,length, width, height, x = 0, y = 0, z = 0) => {
      //  未创建仓库时 直接创建箱子
      if (this.warBoxs.length === 0) {
        this.createBoxOntWar(name,length, width, height, x, y, z);
        return;
      }
      const uuid = this.getUuid();
      //  已经创建仓库时 创建箱子
      if (!length || !width || !height || this.warBoxs.length === 0) return;
      // 使用图片加载箱子
      // const cubeGeo = new THREE.BoxBufferGeometry( width, height, length );
      // const cubeMaterial = new THREE.MeshLambertMaterial( { color: 0xfeb74c, map: new THREE.TextureLoader().load( boxBg ) } );
      // const voxel = new THREE.Mesh( cubeGeo, cubeMaterial );
      const color = this.getRadomColor();
      const geometry1 = new THREE.BoxGeometry( width, height, length );
      const material1 = new THREE.MeshBasicMaterial( {color} );
      const box = new THREE.Mesh( geometry1, material1 );
      // 箱子描边
      const geometry = new THREE.BoxBufferGeometry(width, height, length);
      const edges = new THREE.EdgesGeometry(geometry);
      const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: 0xffffff}));
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
      box.position.set(positionY,positionZ,positionX);
      line.position.set(positionY,positionZ,positionX);
      box.name = `${name}`;
      box.uuidx = uuid;
      line.name = `${name}-描边`;
      line.uuidx = uuid;
      this.scene.add( box );
      this.scene.add( line );
      this.things.push(box);
      this.thingLines.push(line);
      this.storeBoxCreate(name,length, width, height, x, y, z, color, uuid);
    }

    //  无仓库创建箱子
    createBoxOntWar = (name,length, width, height, x, y, z) => {
      const uuid = this.getUuid();
      const color = this.getRadomColor();
      const geometry1 = new THREE.BoxGeometry( width, height, length );
      const material1 = new THREE.MeshBasicMaterial( {color} );
      const box = new THREE.Mesh( geometry1, material1 );
      // 箱子描边
      const geometry = new THREE.BoxBufferGeometry(width, height, length);
      const edges = new THREE.EdgesGeometry(geometry);
      const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: 0xffffff}));
      box.name = name;
      box.uuidx = uuid;
      line.name =`${name}-描边`;
      line.uuidx = uuid;
      this.scene.add( box );
      this.scene.add(line);
      this.thingObj = box;
      this.lineBox = line;
      this.storeBoxCreate(name,length, width, height, x, y, z, color,uuid);
    }

    // 记录箱子创建
    storeBoxCreate = (name,length, width, height, x, y, z, color, uuid) => {
      const things = store.state.things;
      const newList = [...things];
      const item = {
        name,
        id: uuid,
        width,
        height,
        length,
        posX: x,
        posY: y,
        posZ: z,
        color,
      };
      newList.push(item);
      store.commit('setThings', newList);
    }

    // 删除指定id的箱子
    deleteBox = (id) => {
      if (this.things.length === 0) {
        this.scene.remove(this.thingObj);
        this.scene.remove(this.lineBox);
        this.thingObj = null;
        this.lineBox = null;
        store.commit('setThings', []);
        return;
      }
      const targetThing = this.things.filter(item => item.uuidx === id);
      const newThings = this.things.filter(item => item.uuidx !== id);
      this.things = newThings;
      const targetLine = this.thingLines.filter(item => item.uuidx === id);
      const newLises = this.thingLines.filter(item => item.uuidx !== id);
      this.thingLines = newLises;
      // 此处删除箱子重新请求接口刷新vuex数据
      if (targetThing[0]) this.scene.remove(targetThing[0]);
      if (targetLine[0]) this.scene.remove(targetLine[0]);
    }

    // 销毁场景所有数据
    removeWarhouse = () => {
        // 销毁仓库列表
        if (this.warBoxs.length !== 0) {
          this.warBoxs.forEach(thing => {
          this.scene.remove(thing);
          })
        };
        // 销毁物体列表
        if (this.things.length !== 0) {
        this.things.forEach(thing => {
          this.scene.remove(thing);
          })
        }
        // 销毁单个物体
        if (this.thingObj) {
          this.scene.remove(this.thingObj);
        }
        // 销毁单个物体的描边
        if (this.lineBox) {
          this.scene.remove(this.lineBox);
        }
        // 销毁物体列表的描边
        if (this.thingLines.length !== 0) {
          this.thingLines.forEach(thing => {
          this.scene.remove(thing);
          })
        }

        setTimeout(() => { 
        //  重置所有仓库,物体数据
        this.warBoxs = [];
        this.warHeight = 0;
        this.warLength = 0;
        this.warWidth = 0;
        this.floor = null;
        this.thingObj = null;
        this.lineBox = null;
        // 重置vuex仓库,物体列表
        store.commit('setWarInfo', {});
        store.commit('setThings', []);
        }, 0)
    }
  
    // 创建地板
    createFloor = () => {
      const loader = new THREE.TextureLoader();
      loader.load(floorBg, (texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(10, 10);
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
      const opacity = window.config.sceneParams.warOpts.opacity;
      this.matArrayB.push(new THREE.MeshPhongMaterial({color: 0xafc0ca, opacity, transparent:true }));  //前  0xafc0ca :灰色
      this.matArrayB.push(new THREE.MeshPhongMaterial({color: 0x9cb2d1, opacity, transparent:true }));  //后  0x9cb2d1：淡紫
      this.matArrayB.push(new THREE.MeshPhongMaterial({color: 0xd6e4ec, opacity, transparent:true }));  //上  0xd6e4ec： 偏白色
      this.matArrayB.push(new THREE.MeshPhongMaterial({color: 0xd6e4ec, opacity, transparent:true }));  //下
      this.matArrayB.push(new THREE.MeshPhongMaterial({color: 0xafc0ca, opacity, transparent:true }));  //左   0xafc0ca :灰色
      this.matArrayB.push(new THREE.MeshPhongMaterial({color: 0xafc0ca, opacity, transparent:true }));  //右
    }
    
    // 创建墙体 
    createCubeWall = (width, height, depth, angle, material, x, y, z, name) => {
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
        //鼠标操作旋转、缩放
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

    // 获取随机数
    getRadomNumber = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // 获取随机颜色
    getRadomColor = () => {
      return `rgb(${this.getRadomNumber(0,255)},${this.getRadomNumber(0,255)},${this.getRadomNumber(0,255)})`
    }

    // 获取0x开头的随机颜色 #00ff00 => 0x00ff00
    getOxRadomColor = () => {
      return this.colorZh(this.getRadomColor()).replace('#', '0x')
    }
    
    // 颜色转换 rgb => reutrn #00ff00
    colorZh = (sRGB) => {
      return sRGB.replace(/^rgb\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\)$/,function($0,$1,$2,$3){
          return '#'+('0'+(+$1).toString(16)).slice(-2)+('0'+(+$2).toString(16)).slice(-2)+('0'+(+$3).toString(16)).slice(-2);
        });
    }

    // 获取唯一id
    getUuid = () => {
      return (Math.random() + '').substr(3,8) + Date.now().toString(32);
    }

    // 将当前视角保存为图片
    cancasDownLoad = () => {
      const canvas = this.renderer.domElement;
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = store.state.warInfo.name;
      link.click();
    }

    // 根据id使物体外发光
    getIdThingOutline = (id) => {
      const targets = this.things.filter(item => item.uuidx === id);
      if (targets.length !== 0) this.outlineObj(targets);
    }

    // 开启外发光
    outlineObj = (selectedObjects) => {
      const { outLineColor, pulsePeriod, edgeStrength, edgeGlow, edgeThickness } = window.config.sceneParams.thingOPts;
      // 创建一个EffectComposer（效果组合器）对象，然后在该对象上添加后期处理通道。
      this.composer = new THREE.EffectComposer(this.renderer)
      // 新建一个场景通道  为了覆盖到原理来的场景上
      this.renderPass = new THREE.RenderPass(this.scene, this.camera)
      this.composer.addPass(this.renderPass);
      // 物体边缘发光通道
      this.outlinePass = new THREE.OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), this.scene, this.camera, selectedObjects)
      this.outlinePass.selectedObjects = selectedObjects
      this.outlinePass.edgeStrength = edgeStrength // 边框的亮度
      this.outlinePass.edgeGlow = edgeGlow// 光晕[0,1]
      this.outlinePass.usePatternTexture = false // 是否使用父级的材质
      this.outlinePass.edgeThickness = edgeThickness// 边框宽度
      this.outlinePass.downSampleRatio = 1 // 边框弯曲度
      this.outlinePass.pulsePeriod = pulsePeriod // 呼吸闪烁的速度
      this.outlinePass.visibleEdgeColor.set(parseInt(outLineColor)) // 呼吸显示的颜色
      this.outlinePass.hiddenEdgeColor = new THREE.Color(0, 0, 0) // 呼吸消失的颜色
      this.outlinePass.clear = true
      this.composer.addPass(this.outlinePass)
      // 自定义的着色器通道 作为参数
      var effectFXAA = new THREE.ShaderPass(THREE.FXAAShader)
      effectFXAA.uniforms.resolution.value.set(1 / window.innerWidth, 1 / window.innerHeight)
      effectFXAA.renderToScreen = true
      this.composer.addPass(effectFXAA)
    }

    // 物体点击事件
    thingClickEnent = (e) => {
        e.preventDefault();
        // 将鼠标点击位置的屏幕坐标转换成threejs中的标准坐标
        this.mouse.x = ((e.clientX - this.target.getBoundingClientRect().left) / this.target.offsetWidth) * 2 - 1
        this.mouse.y = -((e.clientY - this.target.getBoundingClientRect().top) / this.target.offsetHeight) * 2 + 1
        // 通过鼠标的位置和当前相机的矩阵计算出raycaster
        this.raycaster.setFromCamera( this.mouse, this.camera );
        // 获取raycaster直线和所有模型相交的数组集合
        const allThings = this.scene.children.filter(item => item.uuidx);
        // 剔除描边物体
        const intersects = this.raycaster.intersectObjects( allThings );
        const targets = intersects.filter(item => !item.object.name.includes('描边'));
        // 筛选出需要点击的物体
        if (targets.length !== 0) {
          const target = targets[0].object;
          this.outlineObj([target]);
          store.commit('setActiveId', target.uuidx);
        }
    }
  
     animate = () => {
        requestAnimationFrame(this.animate);
        this.orbitControls.update();
        this.renderer.render(this.scene, this.camera);
        if (this.composer) {
          this.composer.render()
        }
     }
}
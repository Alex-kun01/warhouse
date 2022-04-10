// @ts-ignore
window.config = {
    // 接口服务地址+端口
    http: '',
    //场景参数配置
    sceneParams: {
        // 场景配置
        scene: {
          // 场景盒子的长宽高
          length: 1000,
          width: 1000,
          height: 1000,
          // 天空盒配置 可配参数如下 可自定义天空盒 路径 'static/images/skybox'
          // BlueSky CloudySky Dark DarkBlue MilkyWay White Night Universal DeepAsh Grassland
          skyBox: 'Night',
        },
        warOpts: {
          // 仓库墙体透明度配置0-1
          opacity: 0.4,
        },
        thingOPts: {
          // 外发光-物体选中效果颜色 16进制颜色值 0x + ffff00
          outLineColor: 0xffff00,
          // 外发光-呼吸闪烁的速度
          pulsePeriod: 3,
          // 外发光-边框的亮度
          edgeStrength: 10.0,
          // 外发光-光晕 [0,1]
          edgeGlow: 1,
          // 外发光-边框宽度
          edgeThickness: 1.0,
          // 外发光-边框弯曲度
          downSampleRatio: 1
        },
        // 相机配置
        carams: {
            // 控制鼠标上垂直旋转的角度上限 区间【0-Math.PI(3.14)】
            maxPolarAngle: 1.4,
            // 限制鼠标可缩放最小值
            minDistance: 3,
            // 限制鼠标可缩放最大值
            maxDistance: 200,
            // 是否禁用鼠标缩放
            enableZoom: true,
            // 启用或禁用键盘控制
            enableKeys: true,
            // 启用或禁用摄像机平移 （鼠标右键拖拽平移）
            enablePan: true,
        }
    }
}

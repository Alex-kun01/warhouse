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
        },
        // 相机配置
        carams: {
            // 控制鼠标上垂直旋转的角度上限 区间【0-Math.PI(3.14)】
            maxPolarAngle: 3,
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

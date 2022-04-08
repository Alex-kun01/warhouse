<template>
  <div class="home">
    <MainScene />
    <!-- <DateTime /> -->
    <Loding v-if="show" />
    <!-- 仓库 -->
    <el-dialog title="创建仓库" width="25%" :visible.sync="dialogFormVisible">
      <el-form :model="warForm">
        <el-form-item label="仓库名称" :label-width="formLabelWidth">
          <el-input v-model="warForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="仓库长度" :label-width="formLabelWidth">
          <el-input v-model="warForm.length" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="仓库宽度" :label-width="formLabelWidth">
          <el-input v-model="warForm.width" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="仓库高度" :label-width="formLabelWidth">
          <el-input v-model="warForm.height" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"  @click="subWarCreate">确 定</el-button>
      </div>
  </el-dialog>
  <!-- 物体 -->
  <el-dialog title="创建仓库" width="25%" :visible.sync="dialogThingVisible">
      <el-form :model="thingForm">
        <el-form-item label="物体名称" :label-width="formLabelWidth">
          <el-input v-model="thingForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="物体长度" :label-width="formLabelWidth">
          <el-input v-model="thingForm.length" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="物体宽度" :label-width="formLabelWidth">
          <el-input v-model="thingForm.width" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="物体高度" :label-width="formLabelWidth">
          <el-input v-model="thingForm.height" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="物体X轴" :label-width="formLabelWidth">
          <el-input v-model="thingForm.posX" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="物体Y轴" :label-width="formLabelWidth">
          <el-input v-model="thingForm.posY" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="物体Z轴" :label-width="formLabelWidth">
          <el-input v-model="thingForm.posZ" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogThingVisible = false">取 消</el-button>
        <el-button type="primary"  @click="subThingCreate">确 定</el-button>
      </div>
  </el-dialog>
  </div>
</template>

<script>
import MainScene from './scene/MainScene.vue'
import DateTime from './components/DateTime.vue'
import Loding from '../views/components/Loding.vue'
import { emitWarning } from 'process'

export default {
  name: 'Home',
  components: {
    MainScene,
    DateTime,
    Loding
  },
  data() {
    return {
      show: false,
      formLabelWidth: '120px',
      dialogFormVisible: false,
      dialogThingVisible: false,
      warForm: {
        name: '测试仓库',
        width: 30,
        height: 10,
        length: 60,
      },
      thingForm: {
        name: '测试仓库',
        width: 30,
        height: 10,
        length: 60,
        posX: 0,
        posY: 0,
        posZ: 0
      },
    }
  },
  mounted() {
    this.$bus.$off('openLoading');
    this.$bus.$on('openLoading', (bool) => {
      this.show = bool;
    })
    this.$bus.$off('controlWarDialog');
    this.$bus.$on('controlWarDialog', (bool) => {
      this.dialogFormVisible = bool;
    })
    this.$bus.$off('controlThingDialog');
    this.$bus.$on('controlThingDialog', (bool) => {
      this.dialogThingVisible = bool;
    })
  },methods: {
    subWarCreate(){
      const { name, width, height, length} = this.warForm;
      if (!name) return this.$message({ type: 'warning', message: '请输入仓库名称！' });
      if (!width) return this.$message({ type: 'warning', message: '请输入仓库宽度！' });
      if (!height) return this.$message({ type: 'warning', message: '请输入仓库高度！' });
      if (!length) return this.$message({ type: 'warning', message: '请输入仓库长度！' });
      window.$scene && window.$scene.createWarhouse(+length, +width, +height);
      this.dialogFormVisible = false;
    },
    subThingCreate(){
      const { name, width, height, length, posX, posY, posZ} = this.thingForm;
      if (!name) return this.$message({ type: 'warning', message: '请输入仓库名称！' });
      if (!width) return this.$message({ type: 'warning', message: '请输入仓库宽度！' });
      if (!height) return this.$message({ type: 'warning', message: '请输入仓库高度！' });
      if (!length) return this.$message({ type: 'warning', message: '请输入仓库长度！' });
      window.$scene && window.$scene.createBox(+length, +width, +height, +posX, +posY, +posZ );
      this.dialogThingVisible = false;
    }
  },
}
</script>
<style>
.home {
  
}
</style>

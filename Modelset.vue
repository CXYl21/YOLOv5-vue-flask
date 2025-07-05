<template>
  <div id="app">

    <div class="flex-div">

      <BaseRight/>

      <div class="flex-div-right">
        <div style="padding: 20px">
          <div style="width: 100%;height: 100%;">
            <div style="padding: 20px 0">
              <a style="padding: 0 20px 0 0">模型选择</a>
              <el-select v-model="model" placeholder="请选择">
                <el-option
                    v-for="item in model_list"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div style="padding: 20px 0">
              <div class="block">
                <span class="demonstration">默认可信度</span>
                <el-slider v-model="reliability_number"></el-slider>
              </div>
            </div>


            <div style="padding: 10px 0 ">
              <el-button v-on:click="save_info" type="primary">保存数据</el-button>
            </div>
          </div>
        </div>

      </div>

    </div>


  </div>
</template>
<script>
import BaseRight from "@/components/BaseRight.vue";
import axios from 'axios';

export default {
  name: 'App',
  components: {
    BaseRight,
  },
  data() {
    return {
      reliability_number: 80,
      model: 'fall.pt',
      model_list: [
        {
          value: 'fall.pt',
          label: 'fall.pt'
        },{
          value: 'posture.pt',
          label: 'posture.pt'
        },{
          value: 'yolov5s.pt',
          label: 'yolov5s.pt'
        }],
    }
  },


  mounted() {
    var reliability_number = sessionStorage.getItem('reliability_number');
    var line_weight_number = sessionStorage.getItem('line_weight_number');
    var model = sessionStorage.getItem('model');

    if (!reliability_number) {
      sessionStorage.setItem('reliability_number', '80');
      this.reliability_number = 80
    } else {
      this.reliability_number = parseInt(reliability_number)
    }

    if (!line_weight_number) {
      sessionStorage.setItem('line_weight_number', '80');
      this.line_weight_number = 80
    } else {
      this.line_weight_number = parseInt(line_weight_number)
    }

    if (!model) {
      sessionStorage.setItem('model', 'fall.pt');
      this.model = 'fall.pt'
    } else {
      this.model = model
    }
  },


  methods: {
    save_info() {
      
      sessionStorage.setItem('reliability_number', this.reliability_number.toString());
      console.log("model的值",this.model);
      sessionStorage.setItem('model', this.model);

      // 使用axios发送POST请求
    axios.post('http://127.0.0.1:5000/change_pt', {
      ff: this.model
    })
      .then(response => {
        console.log(response.data);
        if(response.data.code == '1'){
          this.$message({
          message: '修改成功',
          type: 'success'
        });
        }
      })
      .catch(error => {
        console.error(error);
      });

      
    }
  },


}
</script>


<style>
* {
  margin: 0;
}
/* 修改Slider的颜色 */
.el-slider__runway {
  background-color:  #1192a8e0;
}

.el-slider__bar {
  background-color: #1192a8e0;
}

/* .el-slider__button-wrapper {
  background-color: #11709ce0;
} */
/* 修改按钮的颜色 */
.el-button--primary {
  background-color: #107fb3e0;
  border-color: #1592cce0;
  color: #f7f7f7;
}
.flex-div {
  display: flex;
  width: 100%;
}


.flex-div-right {
  flex: 80;
  background-color: #ffffff;
}

</style>




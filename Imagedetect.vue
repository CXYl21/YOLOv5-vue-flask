<template>
  <div id="app">
    <div class="flex-div">
      <BaseRight/>
      <div  class="flex-div-right">
        <div style="padding: 20px">
          <div style="">
            <div style="display: flex">
              <div style="flex: 50;">
                <div style="padding: 20px">
                  <img :src="selectedImage" v-if="selectedImage" style="width: 100%;height: 100%;object-fit: cover;">
                  <el-empty v-if="!selectedImage" description="空图片"></el-empty>
                </div>
              </div>
              <div style="flex: 50">
                <div style="padding: 20px">
                  <img :src="show_img_path" v-if="selectedImage" style="width: 100%;height: 100%;object-fit: cover;">
                  <el-empty v-if="!selectedImage" description="空图片"></el-empty>
                </div>
              </div>
            </div>
            <div>
              <el-table
                  :data="data"
                  height="200"
                  style="width: 100%;">
                <el-table-column
                    prop="id"
                    label="id"
                >
                </el-table-column>
                <el-table-column
                    prop="confidence"
                    label="confidence"
                >
                </el-table-column>
                <el-table-column
                    prop="size"
                >
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div style="padding: 20px">
            <div style="display: flex">
              <div style="flex: 50">
                <div style="padding: 20px">
                  <a style="font-size: 30px;color: #0f668fe0;font-weight: 500">置信度:{{ reliability_number }}</a>
                </div>
              </div>
              <div style="flex: 50">
                <div style="padding: 20px;float: right">
                  <el-button type="primary" @click="openFileSelector">选择图片</el-button>
                </div>
              </div>
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
      line_weight_number: 80,

      selectedImage: null,
      show_img_path: '',
      data: '',
    }
  },
  mounted() {
    var reliability_number = sessionStorage.getItem('reliability_number');
    this.reliability_number = reliability_number
  },
  methods: {
    openFileSelector() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/jpeg';
      input.onchange = this.handleFileChange;
      input.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedImage = e.target.result;
        };
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append('reliability_number', this.reliability_number);
        formData.append('image', file);

        axios.post('http://127.0.0.1:5000/get_img', formData)
            .then(response => {
              if (response.data.code == '1') {
                this.show_img_path = 'http://127.0.0.1:5000/static/img/' + response.data.name + '.jpg'
                this.data = response.data.data
              }

            })
            .catch(error => {
              // 处理错误
              console.error('Error uploading image:', error);
            });
      }
    }
  },
}
</script>


<style scoped>
* {
  margin: 0;
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




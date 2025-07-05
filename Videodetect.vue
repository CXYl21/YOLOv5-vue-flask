<template>
  <div id="app">
    <div class="flex-div">
      <BaseRight/>
      <div v-loading="loading" class="flex-div-right">
        <div style="padding: 20px">
          <div style="height: 60vh">
            <div style="display: flex">
              <div style="flex: 50">
                <div style="padding: 20px">
                  <video :src="selectedVideo" v-if="selectedVideo" controls
                         style="width: 100%; height: 100%; object-fit: cover;"></video>
                  <el-empty v-else description="无视频"></el-empty>
                </div>
              </div>
              <div style="flex: 50">
                <div style="padding: 20px">
                  <!-- 这里展示处理后的视频 -->
                  <video :src="show_video_path" v-if="show_video_path" controls
                         style="width: 100%; height: 100%; object-fit: cover;"></video>
                  <el-empty v-else description="无视频"></el-empty>
                </div>
              </div>
            </div>
          </div>
          <div style="padding: 20px">
            <div style="display: flex">
              <div style="flex: 50">
                <div style="padding: 20px">
                  <a style="font-size: 30px; color: #5a9cf8; color: #0f668fe0;font-weight: 500">置信度:{{ reliability_number }}</a>
                </div>
              </div>
              <div style="flex: 50">
                <div style="padding: 20px; float: right">
                  <el-button type="primary" @click="openFileSelector">选择视频</el-button>
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
      //
      loading: false,
      //
      reliability_number: 80,
      selectedVideo: null, // 更改为selectedVideo
      show_video_path: '' // 用于存储处理后视频的路径
    }
  },
  mounted() {
    let reliability_number = sessionStorage.getItem('reliability_number');
    this.reliability_number = reliability_number || this.reliability_number;
  },
  methods: {
    openFileSelector() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'video/*'; // 修改为接受视频文件
      input.onchange = this.handleFileChange;
      input.click();
    },
    handleFileChange(event) {
      this.loading = true
      const file = event.target.files[0];
      if (file) {
        // 使用URL.createObjectURL直接为视频文件创建一个URL
        this.selectedVideo = URL.createObjectURL(file);

        const formData = new FormData();
        formData.append('video', file); // 确保后端接受的是'video'字段
        formData.append('reliability_number', this.reliability_number); // 确保后端接受的是'video'字段


        axios.post('http://127.0.0.1:5000/process_video', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
            .then(response => {
              if (response.data.code == 1) {
                this.loading = false
                this.show_video_path = `http://127.0.0.1:5000/static/video/${response.data.name}.mp4`;
              } else {
                this.loading = false
                console.error('Error processing video:', response.data.message);
              }
            })
            .catch(error => {
              console.error('Error uploading video:', error);
            });
      }

    }
  },
}
</script>

<style>
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

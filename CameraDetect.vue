<template>
  <div id="app">
    <div class="flex-div">
      <BaseRight/>
      <div class="flex-div-right">
        <div style="padding: 20px">
          <div style="height: 70vh">
            <div style="display: flex">
              <div class="flex-div-right">  
                <div class="video-container" style="padding: 20px"> 
                  <div class="video-wrapper" style="height: 70vh">  
                    <div class="video-content" style="display: flex">  
                      <div class="video-box" style="flex: 1; padding: 20px">  
                        <div v-if="!show_video" style="padding: 100px">  
                  <el-empty description="暂停播放中"></el-empty>  
                </div>  
                <img v-if="show_video" class="video-image"  
                     :src="videoUrl" style="height: 70vh;width: 80%" alt="MJPEG Video Stream">  
              </div>  
            </div>  
          </div>  
          <div class="controls-container" style="padding: 20px">  
            <div class="controls" style="display: flex; justify-content: space-between">  
              <div class="control-box" style="flex: 1">
                 <!-- 摄像头选择按钮 -->  
          <div>  
            <div class="camera-selector" style="margin-bottom: 20px;margin-top: 10px;">  
              <el-button type="primary" @click="selectCamera('local')" style="margin-right: 20px;">选择电脑摄像头</el-button>  
              <el-button type="primary" @click="selectCamera('network')" style="margin-right: 400px;">选择局域网摄像头</el-button>  
              <el-button type="primary" @click="toggleVideo">{{ show_video ? '暂停检测' : '开始检测' }}</el-button>  
                <div class="video-container"  v-if="show_video" style="height:100%; width: 100%; position: relative;">  
                           
                </div>
                <div ></div>
                <div style="flex: 50">
                <div style="padding: 20px;margin-top: 20px;">
                  <a style="font-size: 30px; color: #5a9cf8; color: #0f668fe0;font-weight: 500">置信度:{{ reliability_number }}</a>
                </div>
              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
export default {  
  name: 'App',
  components: {
    BaseRight,
  },
  data() {  
    return {  
      show_video: false,  
      reliability_number: 80,
      selectedCamera: null, // 用于存储选中的摄像头类型  
      videoUrl: '', // 用于存储视频流的 URL  
    };  
  },  
  mounted() {
    let reliability_number = sessionStorage.getItem('reliability_number');
    this.reliability_number = reliability_number || this.reliability_number;
  },
  methods: {  
    selectCamera(cameraType) {  
      this.selectedCamera = cameraType;  
      this.updateVideoUrl();  
    },  
    updateVideoUrl() {  
      // 根据选中的摄像头类型设置视频流的 URL  
      if (this.selectedCamera === 'local') {  
        this.videoUrl = 'http://127.0.0.1:5000/live'; // 这里应该是您电脑摄像头的实际 URL  
      } else if (this.selectedCamera === 'network') {  
        this.videoUrl = 'http://127.0.0.1:5000/net'; // 这里应该是您局域网摄像头的实际 URL  
      }  
      // 如果视频 URL 更新，并且之前未显示视频，则开始显示视频  
      if (this.videoUrl && !this.show_video) {  
        this.show_video = true;  
      }  
    },  
    toggleVideo() {  
      // 切换视频的显示与隐藏  
      this.show_video = !this.show_video;  
      // 您可以在这里添加额外的逻辑，比如暂停和恢复视频流（如果需要的话）  
    },  
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




<template>  
  <div>  
    <h1>Media Gallery</h1>  
      
    <div id="image-gallery">  
      <img v-for="image in images" :src="image" :key="image" alt="Media Image">  
    </div>  
      
    <div id="video-gallery">  
      <video v-for="video in videos" :src="video.url" :key="video.url" controls>  
        <source :src="video.url" :type="video.type">  
        Your browser does not support the video tag.  
      </video>  
    </div>  
  </div>  
</template>  
  
<script>  
import axios from 'axios'; // 假设你正在使用axios进行HTTP请求  
  
export default {  
  name: 'MediaGallery',  
  data() {  
    return {  
      images: [], // 图片列表  
      videos: [], // 视频列表（包含url和type）  
    };  
  },  
  mounted() {  
    this.fetchMedia();  
  },  
  methods: {  
    fetchMedia() {  
      axios.get('/api/media')  
        .then(response => {  
          this.images = response.data.images.map(imagePath => `/path/to/your/images/${imagePath}`); // 假设图片在特定路径下  
          this.videos = response.data.videos.map(videoData => ({  
            url: videoData.url, // 视频URL  
            type: videoData.type, // 视频MIME类型  
          }));  
        })  
        .catch(error => console.error('Error fetching media list:', error));  
    },  
  },  
};  
</script>  
  
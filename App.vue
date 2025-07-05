<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App',

  mounted() {
    sessionStorage.setItem('flask_ip', '127.0.0.1:5000');
    var reliability_number = sessionStorage.getItem('reliability_number');
    var line_weight_number = sessionStorage.getItem('line_weight_number');
    var model = sessionStorage.getItem('model');

    if (!reliability_number) {
      sessionStorage.setItem('reliability_number', '80');
      this.reliability_number = 80
    }

    if (!line_weight_number) {
      sessionStorage.setItem('line_weight_number', '80');
      this.line_weight_number = 80
    }

    if (!model) {
      sessionStorage.setItem('model', 'last.pt');
      this.model = 'last.pt'
    }


    const code = localStorage.getItem('code');

    const currentPath = this.$route.path;
    if (currentPath != '/login') {
      if (code != 1) {
        this.$router.push('/login');
      }
    }
  }


}
</script>






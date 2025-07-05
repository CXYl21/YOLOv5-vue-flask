<template>
  <div id="app">
    <div class="container">
      <div class="left-panel">
        <div class="logo">
          <a class="logo-text">欢迎使用</a>
          <a class="logo-text">人体摔倒检测系统</a>
        </div>
      </div>
      <div class="right-panel">
        <div class="login-card">
          <h2 class="login-title">系统登录</h2>
          <div class="form-group">
           <label for="username" class="input-label">账号:</label>
              <el-input id="username" v-model="username" placeholder="账号"></el-input>
            </div>
            <div class="form-group">
              <label for="password" class="input-label">密码:</label>
              <el-input id="password" v-model="password" placeholder="密码" show-password></el-input>
            </div>
          <div class="form-group">
            <el-button v-on:click="login" type="primary" round class="login-button" >登录</el-button>
          </div>
          <el-dialog
          title="错误提示"
          :visible.sync="errorDialogVisible"
          width="30%"
          :before-close="resetError" class="error-dialog"
        >
          <span>{{ errorMessage }}</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="errorDialogVisible = false">关闭</el-button>
          </span>
        </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      username: '',
      password: '',
      errorDialogVisible: false, // 控制错误提示框的显示和隐藏
      errorMessage: '' // 错误信息
    }
  },
  methods: {
    login() {
      if (this.username === 'admin' && this.password === 'admin') {
        localStorage.setItem('code', '1');
        localStorage.setItem('name', 'admin');
        this.$router.push({path: '/Imagedetect'});
      }
      else {
        // 用户名或密码错误，显示错误提示框
        this.errorMessage = '账号或密码错误';
        this.errorDialogVisible = true;
      }
    },
    resetError() {
      // 关闭错误提示框时重置错误信息
      this.errorMessage = '';
    }
  }
};
</script>

<style scoped>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('/public/background.png');
  background-size: cover;
  background-position: center;
}
.container {
  display: flex;
  width: 800px;
  border-radius: 8px;
  overflow: hidden;
}
.error-dialog {
  background-color: #f0f0f065; /* 错误提示框背景颜色 */
  border-radius: 4px; /* 错误提示框圆角 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); /* 错误提示框阴影 */
}

.error-dialog .el-dialog__header {
  background-color: #f0f0f0; /* 错误提示框标题栏背景颜色 */
  color: #333; /* 错误提示框标题栏文字颜色 */
  border-bottom: none; /* 移除标题栏底部边框 */
}

.error-dialog .el-dialog__body {
  padding: 20px; /* 错误提示框内容区域内边距 */
}

.error-dialog span{
  font-size: 18px;
  color: #221e1ee5;
}
.error-dialog .el-dialog__footer {
  background-color: #f0f0f0; /* 错误提示框底部区域背景颜色 */
  border-top: none; /* 移除底部区域顶部边框 */
}

.error-dialog .el-button {
  background-color: #309dbe; /* 关闭按钮背景颜色 */
  color: #fff; /* 关闭按钮文字颜色 */
  border: none; /* 移除按钮边框 */
  border-radius: 4px; /* 关闭按钮圆角 */
  padding: 12px 20px; /* 关闭按钮内边距 */
  font-size: 14px; /* 关闭按钮文字大小 */
  height: 40px;
  width: 70px;
}

.error-dialog .el-button:hover {
  background-color: #36a0c7; /* 鼠标悬停时的背景颜色 */
}
.left-panel {
  flex: 50;
  background-image:url();
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px; /* 添加内边距 */
  text-align: center; /* 居中文本内容 */
}

.right-panel {
  flex: 50;
  background-color: #199cc48e;
  align-items: center;
  padding: 10% 0 0 0;
}

.logo {
  text-align: center;
}

.logo-text {
  display: block;
  font-size: 40px;
  font-weight: 900;
  color: #dceaeeec;
  margin-bottom: 10px;
}

.login-card {
  padding: 20px;
}

.login-title {
  text-align: center;
  font: 30px;
  color: #ffffffd3;
  font-weight: 600;
  margin-bottom: 20px;
}

.form-group {
  padding: 10px 30px;
}
.input-label {
  color: rgba(240, 240, 240, 0.884);
  font-size: px;
  padding-right: 10px; /* 在标签右侧添加10像素的空格 */
}

.el-input {
  width: 80%;
}

.el-button {
  padding-left: 20px; 
  width: 80%;
}
.login-button {
  width: 40%; /* 按钮宽度 */
  padding-left: 20px; /* 按钮内边距左 */
  background-color: #3ab6dbb7; /* 按钮背景颜色 */
  color: white; /* 按钮文字颜色 */
  border: none; /* 移除边框 */
  border-radius: 5px; /* 按钮圆角 */
  cursor: pointer; /* 鼠标指针样式 */
  margin-left: 90px;
}

.login-button:hover {
  background-color: #3ba9f3; /* 鼠标悬停时的背景颜色 */
}
</style>
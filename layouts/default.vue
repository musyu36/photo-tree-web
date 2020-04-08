<template>
  <div>
    <nuxt />
    <app-footer />
  </div>
</template>

<script>
import AppFooter from "~/components/Footer.vue";
export default {
  components: {
    AppFooter,
  },
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.vertical-middle {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.modal {
  background: white;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
}

.uploaded-image {
  max-height: 120px;
}

.post-btn {
  padding: 4xpx 12px;
  border-radius: 24px;
  background-color: black;
  color: white;
  font-size: 12px;
}

.el-upload {
  width: 100%;
}

.el-button {
  width: 100%;
}
</style>

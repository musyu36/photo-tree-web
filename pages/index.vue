<template>
  <div>
    <header class="flex justify-center border-b border-gray-300">
      <div class="logo">
        <img src="/images/logo.png" class="w-20 py-2" />
      </div>
      <img
        src="/images/camera.svg"
        @click="openModal"
        class="absolute w-6 post"
      />
    </header>
    <!-- ref="posts"でPosts.vueのメソッドを利用できるようにする -->
    <posts ref="posts" />
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import Posts from "~/components/Posts.vue";
export default {
  components: {
    Posts,
  },
  methods: {
    //Postsのメソッドを実行
    openModal() {
      this.$refs.posts.openModal();
    },
  },
};
</script>

<style scoped>
.post {
  top: 12px;
  right: 10px;
}
</style>

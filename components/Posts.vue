<template>
  <div>
    <div class="posts overflow-scroll mb-24">
      <post
        v-for="(post, index) in posts"
        :key="index"
        :post="post.content"
        :user="post.user"
        :be-liked="post.beLiked"
      />
    </div>
  </div>
</template>

<script>
import Post from "~/components/Post.vue";

export default {
  components: {
    Post,
  },
  data() {
    return {
      posts: [
        {
          user: {
            displayName: "mimura36",
            photoURL: "/images/post0.jpg",
          },
          content: {
            text: "恵比寿ナウ",
            image: "images/post0.jpg",
          },
          beLiked: true,
        },
        {
          user: {
            displayName: "mimura36-2",
            photoURL: "/images/post1.jpg",
          },
          content: {
            text: "恵比寿ナウ-2",
            image: "images/post1.jpg",
          },
          beLiked: true,
        },
      ],
    };
  },
};
</script>

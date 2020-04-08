<template>
  <div>
    <div class="posts overflow-scroll mb-24">
      <post v-for="(post, index) in posts" :key="index" :post="post" />
    </div>

    <div class="modal">
      <div class="actions mt-4 flex justify-between px-8">
        <div class="back-btn vertical-middle">
          <img src="/images/back.svg" class="h-4" />
        </div>
      </div>
      <div class="modal_content p-8">
        <el-upload action="" :show-file-list="false" :http-request="uploadFile">
          <el-button size="small" type="primary">Click to upload</el-button>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
import Post from "~/components/Post.vue";
import { db, firebase } from "~/plugins/firebase";

export default {
  components: {
    Post,
  },
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    async uploadFile(data) {
      const storageRef = firebase.storage().ref();
      const time = new Date().getTime();
      //どこに保存するか, 名前が一意になるように時間情報を加える
      const ref = storageRef.child(`posts/${time}_${data.file.name}`);
      const snapshot = await ref.put(data.file);
    },
  },
  mounted() {
    //postsを監視
    db.collection("posts").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const doc = change.doc;
        //追加された時
        if (change.type === "added") {
          this.posts.unshift({ id: doc.id, ...doc.data() });
        }
      });
    });
  },
};
</script>

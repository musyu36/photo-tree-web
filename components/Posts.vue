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
        <div class="post-btn" @click="post">
          Post
        </div>
      </div>
      <div class="modal_content p-8">
        <div class="flex justify-center">
          <img :src="imageUrl" class="uploaded-image" alt="" />
        </div>
        <el-upload
          v-if="!imageUrl"
          action=""
          :show-file-list="false"
          :http-request="uploadFile"
        >
          <el-button size="small" type="primary">Click to upload</el-button>
        </el-upload>
        <el-input
          type="textarea"
          :rows="8"
          placeholder="Please input"
          class="mt-8"
          v-model="text"
        >
        </el-input>
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
      imageUrl: null,
      text: null,
    };
  },
  methods: {
    async uploadFile(data) {
      const storageRef = firebase.storage().ref();
      const time = new Date().getTime();
      //どこに保存するか, 名前が一意になるように時間情報を加える
      const ref = storageRef.child(`posts/${time}_${data.file.name}`);
      const snapshot = await ref.put(data.file);

      //アップロード後にURLを取得
      const url = await snapshot.ref.getDownloadURL();
      this.imageUrl = url;
    },
    async post() {
      await db.collection("posts").add({
        text: this.text,
        image: this.imageUrl,
        createdAt: new Date().getTime(),
      });
      this.modalVisible = false;
      this.text = null;
      this.imageUrl = null;
      window.alert("保存されました");
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

<style>
.post-btn {
  background-color: white;
  color: black;
  cursor: pointer;
}
</style>

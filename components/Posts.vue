<template>
  <div>
    <div class="posts overflow-scroll mb-24">
      <post v-for="(post, index) in posts" :key="index" :post="post" />
    </div>
    <div v-if="modalVisible && isAuthenticated" class="modal">
      <div class="actions mt-4 flex justify-between px-8">
        <div class="back-btn vertical-middle">
          <img src="/images/back.svg" class="h-4" @click="modalVisible = false" />
        </div>
        <div class="post-btn" @click="post">Post</div>
      </div>
      <div class="modal_content p-8">
        <div class="flex justify-center">
          <img :src="imageUrl" class="uploaded-image" alt />
        </div>
        <el-upload v-if="!imageUrl" action :show-file-list="false" :http-request="uploadFile">
          <el-button size="small" type="primary">Click to upload</el-button>
        </el-upload>
        <el-input type="textarea" :rows="8" placeholder="Please input" class="mt-8" v-model="text"></el-input>
      </div>
    </div>

    <div v-else-if="!isAuthenticated && modalVisible" class="modal">
      <div class="actions mt-4 flex justify-between px-8">
        <div class="back-btn verical-middle" @click="modalVisible = false">
          <img src="/images/back.svg" class="h-4" />
        </div>
      </div>
      <div class="modal_content p-8 w-full h-full relative">
        <div class="flex justify-center">
          <img src="images/logo.png" class="w-32 my-32" />
        </div>
        <el-button size="small" type="primary" @click="login">Login</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Post from "~/components/Post.vue";
import { db, firebase } from "~/plugins/firebase";
import { mapActions } from 'vuex'
export default {
  components: {
    Post,
  },
  data() {
    return {
      posts: [],
      imageUrl: null,
      text: null,
      modalVisible: false,
    };
  },
  computed:{
    currentUser(){
      //store/index.js内の情報を返す
      return this.$store.state.user
    },
    isAuthenticated(){
        return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    //actionsであるsetUserメソッドを使用出来るようにする
    ...mapActions(['setUser']),
    login() {
      //Google認証を使うのでGoogleAuthProvider
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          //ログイン情報を変更
          this.setUser(result.user)
        })
        .catch((error) => {
          window.alert(error);
        });
    },
    openModal() {
      this.modalVisible = true;
    },
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
      this.modalVisible = false;
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

.modal {
  background: white;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
}
</style>

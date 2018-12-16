<template>
  <div class="signup">
    <form @submit.prevent="signup" class="signup__form">
      <h2 class="signup__title">Signup</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="user_email" id="email" class="field__input" v-model="email">
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input
          type="password"
          name="user_password"
          id="password"
          class="field__input"
          v-model="password"
        >
      </div>
      <div class="field">
        <label for="nickname">Nickname:</label>
        <input
          type="text"
          name="user_nickname"
          id="nickname"
          class="field__input"
          v-model="nickname"
        >
      </div>
      <div class="field">
        <p v-if="feedback" class="field__text">{{ feedback }}</p>
        <button type="submit" class="field__btn">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/fbConfig.js";
import firebase from "firebase/app";
import "firebase/auth";
import slugify from "slugify";

export default {
  name: "Signup",
  data() {
    return {
      email: null,
      password: null,
      nickname: null,
      slug: null,
      feedback: null
    };
  },
  methods: {
    signup() {
      if (this.email && this.password && this.nickname) {
        this.feedback = null;
        this.slug = slugify(this.nickname, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        const ref = db.collection("users").doc(this.slug);
        ref.get().then(doc => {
          if (doc.exists) {
            this.feedback = "This nickname is already used";
          } else {
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then(cred => {
                ref.set({
                  user_id: cred.user.uid,
                  nickname: this.nickname
                });
              })
              .then(() => {
                this.$router.push({ name: "home" });
              })
              .catch(error => (this.feedback = error.message));
          }
        });
      } else {
        this.feedback = "Please fill in all fields";
      }
    }
  }
};
</script>

<style lang="scss">
@import "../assets/styles/mixins";

.signup {
  @include form;
}
</style>
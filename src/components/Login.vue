<template>
  <div class="login">
    <form @submit.prevent="login" class="login__form">
      <h2 class="login__title">Login</h2>
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
        <p v-if="feedback" class="field__text">{{ feedback }}</p>
        <button type="submit" class="field__btn">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      feedback: null
    };
  },
  methods: {
    login() {
      if (this.email && this.password) {
        this.feedback = null;
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            // console.log(cred.user);
            this.$router.push({ name: "home" });
          })
          .catch(err => (this.feedback = err.message));
      } else {
        this.feedback = "Please fill in both fields";
      }
    }
  }
};
</script>

<style lang="scss">
@import "../assets/styles/mixins";

.login {
  @include form;
}
</style>
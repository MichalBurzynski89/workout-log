<template>
  <div class="login">
    <form @submit.prevent class="login__form">
      <h2 class="login__title">Login</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="user_email" id="email" class="field__input">
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="user_password" id="password" class="field__input">
      </div>
      <div class="field">
        <button type="submit" class="field__btn">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {};
  }
};
</script>

<style lang="scss">
@import "../assets/styles/mixins";

.login {
  @include form;
}
</style>
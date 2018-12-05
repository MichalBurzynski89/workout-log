<template>
  <div class="signup">
    <form @submit.prevent class="signup__form">
      <h2 class="signup__title">Signup</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="user_email" id="email" class="field__input">
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="user_password" id="password" class="field__input">
      </div>
      <div class="field">
        <label for="nickname">Nickname:</label>
        <input type="text" name="user_nickname" id="nickname" class="field__input">
      </div>
      <div class="field">
        <button type="submit" class="field__btn">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {};
  }
};
</script>

<style lang="scss">
@import "../assets/styles/mixins";

.signup {
  @include form;
}
</style>
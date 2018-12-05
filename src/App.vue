<template>
  <div id="app">
    <div class="overlay">
      <Navbar/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  list-style-type: none;
  box-sizing: border-box;
  border: none;
  outline: none;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  min-width: 320px;
  overflow-x: hidden;
}

#app {
  height: 100vh;
  background-image: url("./assets/bg-home.jpeg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  & .overlay {
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>

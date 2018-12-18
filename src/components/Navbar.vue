<template>
  <div class="navbar">
    <nav class="header">
      <h1 class="title">
        <router-link :to="{ name: 'home' }" class="title__link">Workout Log</router-link>
      </h1>
      <ul class="menu">
        <li v-if="!user" class="menu__item">
          <router-link :to="{ name: 'Signup' }" class="menu__link">Signup</router-link>
        </li>
        <li v-if="!user" class="menu__item">
          <router-link :to="{ name: 'Login' }" class="menu__link">Login</router-link>
        </li>
        <li v-if="user" class="menu__item">
          <a class="menu__link">{{ user.email }}</a>
        </li>
        <li v-if="user" class="menu__item">
          <a @click.prevent="logout" href class="menu__link">Logout</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Navbar",
  data() {
    return {
      user: null
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Login" });
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.header {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.3);

  @media (min-width: 640px) {
    justify-content: space-between;
    padding: 10px 32px;
  }

  @media (min-width: 1024px) {
    padding: 16px 64px;
  }

  & .title {
    font-size: 48px;
    margin-bottom: 8px;
    text-shadow: 0 0 8px orange;

    &:hover {
      text-shadow: 1px 1px 12px orange;
    }

    @media (min-width: 1024px) {
      font-size: 64px;
    }

    @media (min-width: 1600px) {
      font-size: 80px;
    }

    .title__link {
      display: block;
      color: #000;
      text-decoration: none;
    }
  }

  & .menu {
    display: flex;

    @media (min-width: 1600px) {
      margin-right: 32px;
    }

    .menu__item {
      margin: 0 10px;

      .menu__link {
        display: block;
        text-decoration: none;
        color: #fff;
        text-shadow: 1px 1px 8px #000;
        font-size: 16px;

        @media (min-width: 1024px) {
          font-size: 24px;
        }

        @media (min-width: 1600px) {
          font-size: 28px;
        }
      }
    }
  }
}
</style>

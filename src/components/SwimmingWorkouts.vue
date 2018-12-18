<template>
  <div class="swimming-workouts">
    <h2 class="heading">Swimming Workouts</h2>
    <router-link class="btn" :to="{ name: 'AddSwimmingWorkout' }">Add Workout</router-link>
  </div>
</template>

<script>
export default {
  name: "SwimmingWorkouts",
  data() {
    return {};
  },
  mounted() {
    document.getElementById("app").classList.add("bg-swimming");
  },
  beforeRouteLeave(to, from, next) {
    if (!to.path.includes("swimming-workouts")) {
      document.getElementById("app").classList.remove("bg-swimming");
    }
    next();
  }
};
</script>

<style lang="scss">
@import "../assets/styles/mixins";

.swimming-workouts {
  @include button;
  @include stylesForWorkoutsComponents;
}
</style>
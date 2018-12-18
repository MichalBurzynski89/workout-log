<template>
  <div class="weightlifting-workouts">
    <h2 class="heading">Weight Lifting Workouts</h2>
    <router-link class="btn" :to="{ name: 'AddWLWorkout' }">Add Workout</router-link>
  </div>
</template>

<script>
export default {
  name: "WeightliftingWorkouts",
  data() {
    return {};
  }
};
</script>

<style lang="scss">
@import "../assets/styles/mixins";

.weightlifting-workouts {
  @include button;
  @include stylesForWorkoutsComponents;
}
</style>
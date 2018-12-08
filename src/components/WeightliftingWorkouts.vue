<template>
  <div class="weightlifting-workouts">
    <h2 class="heading">Weight Lifting Workouts</h2>
    <router-link class="btn" to>Add Workout</router-link>
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
}

.heading {
  font-size: 20px;
  margin-top: 8px;
  text-align: center;
  color: orange;
  text-shadow: 0 0 4px #000;

  @media (min-width: 1024px) {
    font-size: 28px;
    margin-top: 16px;
    text-shadow: 0 0 8px #000;
  }

  @media (min-width: 1600px) {
    font-size: 32px;
  }
}

.btn {
  text-decoration: none;
  position: absolute;
  top: 160px;
  left: 50%;
  transform: translateX(-50%);

  @media (min-width: 478px) {
    top: 130px;
  }

  @media (min-width: 640px) {
    top: 140px;
  }

  @media (min-width: 1024px) {
    top: 200px;
  }

  @media (min-width: 1600px) {
    top: 220px;
  }
}
</style>
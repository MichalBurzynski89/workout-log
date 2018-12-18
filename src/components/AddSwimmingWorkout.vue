<template>
  <div class="add-workout">
    <form @submit.prevent="addWorkout" class="add-workout__form">
      <h2 class="add-workout__title">Add New Swimming Workout</h2>
      <div class="field">
        <label for="time">Overall time (in minutes):</label>
        <input type="number" min="1" name="time" class="field__input">
      </div>
      <div class="field">
        <label for="laps">Total laps:</label>
        <input type="number" min="1" name="laps" class="field__input">
      </div>
      <div class="field">
        <label for="butterfly">Butterfly (laps):</label>
        <input type="number" min="0" name="butterfly" class="field__input">
      </div>
      <div class="field">
        <label for="backstroke">Backstroke (laps):</label>
        <input type="number" min="0" name="backstroke" class="field__input">
      </div>
      <div class="field">
        <label for="breaststroke">Breaststroke (laps):</label>
        <input type="number" min="0" name="breaststroke" class="field__input">
      </div>
      <div class="field">
        <label for="freestyle">Freestyle / Front Crawl (laps):</label>
        <input type="number" min="0" name="freestyle" class="field__input">
      </div>
      <div class="field">
        <button type="submit" class="field__btn">Add Workout</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddSwimmingWorkout",
  data() {
    return {};
  },
  mounted() {
    if (!document.getElementById("app").classList.contains("bg-swimming"))
      document.getElementById("app").classList.add("bg-swimming");
  },
  beforeRouteLeave(to, from, next) {
    if (!to.path.includes("swimming-workouts")) {
      document.getElementById("app").classList.remove("bg-swimming");
    }
    next();
  },
  methods: {
    addWorkout(e) {
      console.log(e);
    }
  }
};
</script>
<template>
  <div class="swimming-workouts">
    <h2 class="heading">Swimming Workouts</h2>
    <router-link class="btn" :to="{ name: 'AddSwimmingWorkout' }">Add Workout</router-link>
    <div v-if="workouts" class="container">
      <table v-for="(workout, index) in workouts" :key="index">
        <thead>
          <tr>
            <th colspan="2">
              Workout {{ workouts.length - index }}
              <span>{{ workout.timestamp }}</span>
            </th>
          </tr>
          <tr>
            <th>Stroke</th>
            <th>Laps</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Butterfly</th>
            <td>{{ workout.butterfly }}</td>
          </tr>
          <tr>
            <th>Backstroke</th>
            <td>{{ workout.backstroke }}</td>
          </tr>
          <tr>
            <th>Breaststroke</th>
            <td>{{ workout.breaststroke }}</td>
          </tr>
          <tr>
            <th>Freestyle</th>
            <td>{{ workout.freestyle }}</td>
          </tr>
          <tr>
            <th>TOTAL</th>
            <td>{{ workout.laps }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colspan="2">
              OVERALL TIME
              <span>(in minutes):</span>
              {{ workout.time }}
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/fbConfig";
import firebase from "firebase/app";
import "firebase/auth";
import moment from "moment";

export default {
  name: "SwimmingWorkouts",
  data() {
    return {
      workouts: null
    };
  },
  created() {
    db.collection("users")
      .where("user_id", "==", firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.workouts = doc.data().swimmingWorkouts;
        });
      })
      .then(() => {
        this.workouts.forEach(workout => {
          workout.timestamp = moment(workout.timestamp).format("llll");
        });
        this.workouts.reverse();
      })
      .catch(err => alert(err));
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
  @include table;
}
</style>
<template>
  <div class="weightlifting-workouts">
    <h2 class="heading">Weight Lifting Workouts</h2>
    <router-link class="btn" :to="{ name: 'AddWLWorkout' }">Add Workout</router-link>
    <div v-if="workouts.length" class="container">
      <table v-for="(workout, index) in workouts" :key="index">
        <thead>
          <tr>
            <th colspan="7">
              Workout {{ workouts.length - index }}
              <span>{{ timestamps[index] }}</span>
            </th>
          </tr>
          <tr>
            <th colspan="2">Exercise</th>
            <th v-for="i in 5" :key="i">Set {{ i }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="exercise in workout" :key="exercise.name">
            <th colspan="2">{{ exercise.name }}</th>
            <td v-for="(set, idx) in exercise.sets" :key="idx">{{ set }}</td>
            <td v-for="i in 5 - exercise.sets.length" :key="i + exercise.sets.length - 1">-</td>
          </tr>
        </tbody>
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
  name: "WeightliftingWorkouts",
  data() {
    return {
      workouts: [],
      timestamps: []
    };
  },
  created() {
    db.collection("users")
      .where("user_id", "==", firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          for (
            let i = doc.data().totalAmountOfWorkouts.weightlifting;
            i >= 1;
            i--
          ) {
            this.workouts.push(doc.data().weightliftingWorkouts[`workout${i}`]);
            this.timestamps.push(
              moment(
                doc.data().weightliftingWorkouts[`workout${i}_timestamp`]
              ).format("llll")
            );
          }
        });
      })
      .catch(err => alert(err));
  }
};
</script>

<style lang="scss">
@import "../assets/styles/mixins";

.weightlifting-workouts {
  @include button;
  @include stylesForWorkoutsComponents;
  @include table;
}
</style>
<template>
  <div class="weightlifting-workouts">
    <h2 class="heading">Weight Lifting Workouts</h2>
    <router-link class="btn" :to="{ name: 'AddWLWorkout' }">Add Workout</router-link>
    <div v-if="workouts.length" class="container">
      <table v-for="(workout, index) in workouts" :key="index">
        <thead>
          <tr>
            <th colspan="7">
              Workout {{ index + 1 }}
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
            let i = 1;
            i <= doc.data().totalAmountOfWorkouts.weightlifting;
            i++
          ) {
            this.workouts.push(doc.data().weightliftingWorkouts[`workout${i}`]);
            this.timestamps.push(
              moment(
                doc.data().weightliftingWorkouts[`workout${i}_timestamp`]
              ).format("LLLL")
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

  .container {
    font-size: 12px;
    margin: 64px 4px 16px;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    @media (min-width: 1024px) {
      margin-top: 80px;
      font-size: 16px;
    }

    @media (min-width: 1600px) {
      margin-top: 100px;
    }

    table {
      border-collapse: collapse;
      background: rgba(255, 165, 0, 0.6);
      white-space: nowrap;
      box-shadow: 0 0 4px #fff;
      text-shadow: 0 0 4px orange;
      margin-left: 8px;
      margin-right: 8px;

      @media (min-width: 1024px) {
        margin-left: 12px;
        margin-right: 12px;
      }

      @media (min-width: 1600px) {
        margin-left: 20px;
        margin-right: 20px;
      }

      &:not(:last-of-type) {
        margin-bottom: 16px;
      }

      th,
      td {
        border: 1px solid rgba(0, 0, 0, 0.6);
        padding: 4px;

        @media (min-width: 1024px) {
          padding: 8px;
        }

        &:nth-child(even) {
          background: rgba(255, 165, 0, 0.9);
        }
      }

      thead tr:first-child th {
        padding: 12px 4px;
        font-size: 16px;

        @media (min-width: 1024px) {
          padding: 20px 8px;
          font-size: 24px;
        }

        span {
          font-size: 14px;
          font-weight: normal;

          @media (min-width: 1024px) {
            font-size: 18px;
          }
        }
      }

      thead tr:last-child {
        th:first-of-type {
          font-weight: normal;
        }
      }

      tbody tr {
        th {
          background: rgba(255, 165, 0, 0.3);
        }
      }
    }
  }
}
</style>
<template>
  <div class="add-workout">
    <form @submit.prevent="addWorkout" class="add-workout__form">
      <h2
        class="add-workout__title"
      >{{ this.workout ? `Edit Swimming Workout #${this.$route.params.action_type.slice(this.$route.params.action_type.search(/\d/))}` : "Add New Swimming Workout"}}</h2>
      <div class="field">
        <label for="time">Overall time (in minutes):</label>
        <input type="number" min="0" name="time" class="field__input" v-model="time">
      </div>
      <div class="field">
        <label for="laps">Total laps:</label>
        <input type="number" min="0" name="laps" class="field__input" v-model="laps">
      </div>
      <div class="field">
        <label for="butterfly">Butterfly (laps):</label>
        <input type="number" min="0" name="butterfly" class="field__input" v-model="butterfly">
      </div>
      <div class="field">
        <label for="backstroke">Backstroke (laps):</label>
        <input type="number" min="0" name="backstroke" class="field__input" v-model="backstroke">
      </div>
      <div class="field">
        <label for="breaststroke">Breaststroke (laps):</label>
        <input
          type="number"
          min="0"
          name="breaststroke"
          class="field__input"
          v-model="breaststroke"
        >
      </div>
      <div class="field">
        <label for="freestyle">Freestyle / Front Crawl (laps):</label>
        <input type="number" min="0" name="freestyle" class="field__input" v-model="freestyle">
      </div>
      <div class="field">
        <button type="submit" class="field__btn">{{ this.workout ? "Done" : "Add Workout" }}</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/fbConfig";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "AddSwimmingWorkout",
  props: {
    workout: Object
  },
  data() {
    return {
      time: this.workout ? this.workout.time : "",
      laps: this.workout ? this.workout.laps : "",
      butterfly: this.workout ? this.workout.butterfly : "",
      backstroke: this.workout ? this.workout.backstroke : "",
      breaststroke: this.workout ? this.workout.breaststroke : "",
      freestyle: this.workout ? this.workout.freestyle : ""
    };
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
    addWorkout() {
      if (this.computedTime && this.computedLaps) {
        const allStrokes =
          this.computedButterfly +
          this.computedBackstroke +
          this.computedBreaststroke +
          this.computedFreestyle;
        if (this.computedLaps === allStrokes) {
          const workout = {
            time: this.computedTime,
            laps: this.computedLaps,
            butterfly: this.computedButterfly,
            backstroke: this.computedBackstroke,
            breaststroke: this.computedBreaststroke,
            freestyle: this.computedFreestyle,
            timestamp: this.workout ? null : Date.now()
          };
          db.collection("users")
            .where("user_id", "==", firebase.auth().currentUser.uid)
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                if (this.workout) {
                  const swimmingWorkouts = doc.data().swimmingWorkouts;
                  const workoutIndex =
                    parseInt(
                      this.$route.params.action_type.slice(
                        this.$route.params.action_type.search(/\d/)
                      )
                    ) - 1;
                  workout.timestamp = swimmingWorkouts[workoutIndex].timestamp;
                  swimmingWorkouts[workoutIndex] = workout;
                  db.collection("users")
                    .doc(doc.id)
                    .update({ swimmingWorkouts: swimmingWorkouts });
                } else {
                  db.collection("users")
                    .doc(doc.id)
                    .update({
                      swimmingWorkouts: firebase.firestore.FieldValue.arrayUnion(
                        workout
                      ),
                      "totalAmountOfWorkouts.swimming":
                        doc.data().totalAmountOfWorkouts.swimming + 1
                    });
                }
              });
            })
            .then(() => this.$router.push({ name: "SwimmingWorkouts" }))
            .catch(err => alert(err));
        } else {
          alert(
            "The sum of all four strokes added to each other must be exactly the same as the total number of laps!"
          );
        }
      } else {
        alert("Overall time and Total laps must be set to at least 1!");
      }
    }
  },
  computed: {
    computedTime() {
      if (typeof this.time === "number") return this.time;
      if (/[1-9]/.test(this.time[0])) return parseInt(this.time);
      return 0;
    },
    computedLaps() {
      if (typeof this.laps === "number") return this.laps;
      if (/[1-9]/.test(this.laps[0])) return parseInt(this.laps);
      return 0;
    },
    computedButterfly() {
      if (typeof this.butterfly === "number") return this.butterfly;
      if (/[1-9]/.test(this.butterfly[0])) return parseInt(this.butterfly);
      return 0;
    },
    computedBackstroke() {
      if (typeof this.backstroke === "number") return this.backstroke;
      if (/[1-9]/.test(this.backstroke[0])) return parseInt(this.backstroke);
      return 0;
    },
    computedBreaststroke() {
      if (typeof this.breaststroke === "number") return this.breaststroke;
      if (/[1-9]/.test(this.breaststroke[0]))
        return parseInt(this.breaststroke);
      return 0;
    },
    computedFreestyle() {
      if (typeof this.freestyle === "number") return this.freestyle;
      if (/[1-9]/.test(this.freestyle[0])) return parseInt(this.freestyle);
      return 0;
    }
  }
};
</script>
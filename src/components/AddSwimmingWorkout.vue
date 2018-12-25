<template>
  <div class="add-workout">
    <form @submit.prevent="addWorkout" class="add-workout__form">
      <h2 class="add-workout__title">Add New Swimming Workout</h2>
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
        <button type="submit" class="field__btn">Add Workout</button>
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
  data() {
    return {
      time: "",
      laps: "",
      butterfly: "",
      backstroke: "",
      breaststroke: "",
      freestyle: ""
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
            timestamp: Date.now()
          };
          db.collection("users")
            .where("user_id", "==", firebase.auth().currentUser.uid)
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                db.collection("users")
                  .doc(doc.id)
                  .update({
                    swimmingWorkouts: firebase.firestore.FieldValue.arrayUnion(
                      workout
                    ),
                    "totalAmountOfWorkouts.swimming":
                      doc.data().totalAmountOfWorkouts.swimming + 1
                  });
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
      if (/[1-9]/.test(this.time[0])) return parseInt(this.time);
      return 0;
    },
    computedLaps() {
      if (/[1-9]/.test(this.laps[0])) return parseInt(this.laps);
      return 0;
    },
    computedButterfly() {
      if (/[1-9]/.test(this.butterfly[0])) return parseInt(this.butterfly);
      return 0;
    },
    computedBackstroke() {
      if (/[1-9]/.test(this.backstroke[0])) return parseInt(this.backstroke);
      return 0;
    },
    computedBreaststroke() {
      if (/[1-9]/.test(this.breaststroke[0]))
        return parseInt(this.breaststroke);
      return 0;
    },
    computedFreestyle() {
      if (/[1-9]/.test(this.freestyle[0])) return parseInt(this.freestyle);
      return 0;
    }
  }
};
</script>
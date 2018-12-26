<template>
  <div class="add-workout">
    <form @submit.prevent="addWorkout" class="add-workout__form">
      <h2
        class="add-workout__title"
      >{{ this.workout ? `Edit Weight Lifting Workout #${this.$route.params.action_type[this.$route.params.action_type.length - 1]}` : "Add New Weight Lifting Workout" }}</h2>
      <ul v-if="exercises.length" class="exercises">
        <li v-for="(exercise, index) in exercises" class="exercise" :key="index">
          <span class="exercise__name">{{ exercise.name }}</span>
          <ol class="exercise__sets">
            <li v-for="(set, i) in exercise.sets" class="set" :key="i">{{ set }}</li>
          </ol>
          <i
            @click="deleteExercise(exercise.name)"
            class="fas fa-minus-circle exercise__icon-delete"
            title="Remove the exercise"
          ></i>
        </li>
      </ul>
      <div class="field">
        <label for="exercise">Exercise:</label>
        <input
          type="text"
          name="exercise"
          placeholder="up to 14 characters"
          class="field__input"
          v-model="name"
        >
        <i @click="addExercise" class="fas fa-plus-circle field__icon-add" title="Add exercise"></i>
      </div>
      <div v-if="name" class="field">
        <label for="sets">Sets (between 1 and 5):</label>
        <input type="number" min="1" name="sets" class="field__input" v-model="setsCounter">
      </div>
      <div
        v-show="name"
        v-for="(set, index) in computedNumberOfSets"
        class="field field--margin-left"
        :data-id="index"
        :key="index"
      >
        <label for="set">Set {{ set }} (reps x weight in kg):</label>
        <input
          @input="addSet"
          type="text"
          name="set"
          placeholder="e.g. 10 x 60"
          class="field__input"
        >
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

const regex = /^[1-9]\d{0,1}\sx\s[1-9]\d{0,2}$/i;

export default {
  name: "AddWLWorkout",
  props: {
    workout: Array
  },
  data() {
    return {
      exercises: this.workout ? this.workout : [],
      name: null,
      sets: [],
      setsCounter: 1
    };
  },
  watch: {
    name(value) {
      if (!value) this.reset();
    },
    computedNumberOfSets(newNumber) {
      if (newNumber > 5) this.setsCounter = 5;
      while (this.sets.length > newNumber) this.sets.pop();
    }
  },
  methods: {
    addWorkout() {
      if (this.exercises.length) {
        db.collection("users")
          .where("user_id", "==", firebase.auth().currentUser.uid)
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              const update = {};
              const workoutIndex = this.workout
                ? this.$route.params.action_type[
                    this.$route.params.action_type.length - 1
                  ]
                : doc.data().totalAmountOfWorkouts.weightlifting + 1;
              update[
                `weightliftingWorkouts.workout${workoutIndex}`
              ] = this.exercises;
              if (!this.workout) {
                update[
                  `weightliftingWorkouts.workout${workoutIndex}_timestamp`
                ] = Date.now();
                update["totalAmountOfWorkouts.weightlifting"] = workoutIndex;
              }
              db.collection("users")
                .doc(doc.id)
                .update(update);
            });
          })
          .then(() => this.$router.push({ name: "WeightliftingWorkouts" }))
          .catch(err => alert(err));
      } else {
        alert("To add or edit a workout, you must enter at least one exercise");
      }
    },
    addExercise() {
      if (this.name && this.name.length < 15 && this.sets.length) {
        if (
          this.sets.indexOf(null) === -1 &&
          this.sets.length === this.computedNumberOfSets
        ) {
          const exercise = {
            name: this.name,
            sets: this.sets
          };
          this.exercises.push(exercise);
          this.name = null;
          this.reset();
        } else {
          alert("Please fill in all fields in the correct format!");
        }
      } else {
        alert(
          "To add an exercise, you must enter its name (the name cannot be longer than 14 characters including whitespace characters) and at least one set of it in the appropriate format"
        );
      }
    },
    addSet(e) {
      if (regex.test(e.target.value)) {
        this.sets[e.target.parentNode.dataset.id] = e.target.value;
      } else {
        this.sets[e.target.parentNode.dataset.id] = null;
      }
    },
    deleteExercise(name) {
      this.exercises = this.exercises.filter(
        exercise => exercise.name !== name
      );
    },
    reset() {
      this.sets = [];
      this.setsCounter = 1;
      const inputFields = [
        ...document.querySelectorAll(".field[data-id] .field__input")
      ];
      inputFields.forEach(inputField => (inputField.value = ""));
    }
  },
  computed: {
    computedNumberOfSets() {
      if (this.setsCounter && this.setsCounter[0] !== "-")
        return parseInt(this.setsCounter);
      return 0;
    }
  }
};
</script>

<style lang="scss">
@import "../assets/styles/mixins";

.add-workout {
  @include form;

  .add-workout__form {
    position: static;
    transform: none;
    margin: 5vw 10vw;

    @media (min-width: 1024px) {
      margin: 5vw 20vw;
    }

    @media (min-width: 1600px) {
      margin: 5vw 25vw;
    }

    .add-workout__title {
      font-size: 24px;

      @media (min-width: 1200px) {
        font-size: 28px;
      }
    }

    .exercises {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      font-size: 13px;
      margin-bottom: 20px;

      @media (min-width: 1024px) {
        font-size: 14px;
        margin-bottom: 40px;
      }

      @media (min-width: 1600px) {
        font-size: 16px;
      }

      .exercise {
        position: relative;
        margin: 0 8px 8px;
        padding: 10px 14px;
        background-color: rgba(0, 0, 0, 0.4);
        border-radius: 8px;
        color: #fff;
        text-shadow: 1px 1px 8px #000;

        @media (min-width: 1024px) {
          padding: 12px 16px;
        }

        @media (min-width: 1600px) {
          padding: 16px 24px;
        }

        .exercise__name {
          color: orange;
          display: block;
          margin-bottom: 4px;
        }

        .exercise__icon-delete {
          position: absolute;
          top: 3px;
          right: 3px;
          cursor: pointer;

          @media (min-width: 1024px) {
            top: 5px;
            right: 5px;
          }

          @media (min-width: 1600px) {
            top: 7px;
            right: 7px;
          }
        }
      }
    }

    .field__icon-add {
      position: absolute;
      top: 8px;
      font-size: 24px;
      color: orange;
      text-shadow: 1px 1px 8px #000;
      cursor: pointer;

      @media (orientation: landscape) and (max-width: 823px) {
        right: 0;
      }

      @media (min-width: 1200px) {
        font-size: 32px;
      }

      @media (min-width: 1600px) {
        font-size: 40px;
      }
    }

    .field--margin-left {
      margin-left: 12px;
    }
  }
}
</style>
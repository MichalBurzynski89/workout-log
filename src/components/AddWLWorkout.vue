<template>
  <div class="add-workout">
    <form @submit.prevent="addWorkout" class="add-workout__form">
      <h2 class="add-workout__title">Add New Weight Lifting Workout</h2>
      <ul v-if="exercises" class="exercises">
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
        <input type="text" name="exercise" class="field__input" v-model="name">
        <i @click="addExercise" class="fas fa-plus-circle field__icon-add" title="Add exercise"></i>
      </div>
      <div v-if="name" class="field">
        <label for="sets">Sets:</label>
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
        <input @input="addSet" type="text" name="set" class="field__input">
      </div>
      <div class="field">
        <button type="submit" class="field__btn">Add Workout</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddWLWorkout",
  data() {
    return {
      exercises: [],
      name: null,
      sets: [],
      setsCounter: 1
    };
  },
  methods: {
    addWorkout() {
      console.log(this.exercises);
    },
    addExercise() {
      if (this.name && this.sets.length) {
        const exercise = {
          name: this.name,
          sets: this.sets
        };
        this.exercises.push(exercise);
        this.name = null;
        this.sets = [];
        this.setsCounter = 1;
        const inputFields = [
          ...document.querySelectorAll(".field[data-id] .field__input")
        ];
        inputFields.forEach(inputField => (inputField.value = ""));
      }
    },
    addSet(e) {
      if (e.target.value) {
        this.sets[e.target.parentNode.dataset.id] = e.target.value;
      }
    },
    deleteExercise(name) {
      this.exercises = this.exercises.filter(
        exercise => exercise.name !== name
      );
    }
  },
  computed: {
    computedNumberOfSets() {
      if (this.setsCounter) return parseInt(this.setsCounter);
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
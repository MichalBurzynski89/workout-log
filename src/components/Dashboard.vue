<template>
  <div class="dashboard">
    <div class="section">
      <h2 class="section__title">Weight Lifting</h2>
      <router-link :to="{ name: 'WeightliftingWorkouts' }">
        <img class="section__img" src="../assets/images/weight-lifting-640x425.jpeg" alt="Gym">
      </router-link>
    </div>
    <div class="section">
      <h2 class="section__title">Swimming</h2>
      <router-link :to="{ name: 'SwimmingWorkouts' }">
        <img class="section__img" src="../assets/images/swimming-640x425.jpeg" alt="Swimming">
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.dashboard {
  text-align: center;

  @media (orientation: landscape) {
    display: flex;
  }

  @media (orientation: landscape) and (min-width: 640px) {
    margin-top: 24px;
  }

  @media (orientation: portrait) and (min-width: 360px) {
    margin-top: 36px;
  }

  @media (min-width: 973px) {
    margin-top: 100px;
  }
}

.section {
  width: 240px;
  margin: 12px auto;
  padding: 12px 8px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 12px;

  @media (orientation: portrait) and (min-width: 768px) {
    width: 360px;
    margin: 64px auto;
    padding: 24px 12px;
  }

  @media (min-width: 973px) {
    width: 400px;
    padding: 24px 8px;
  }

  &:first-child {
    @media (orientation: portrait) and (min-width: 360px) {
      margin-bottom: 32px;
    }
  }

  .section__title {
    margin-bottom: 12px;
    color: orange;
    text-shadow: 0 0 4px #000;

    @media (orientation: portrait) and (min-width: 768px) {
      margin-bottom: 20px;
      font-size: 28px;
    }

    @media (min-width: 973px) {
      margin-bottom: 24px;
      font-size: 32px;
    }
  }

  .section__img {
    width: 80%;
    display: block;
    margin: 0 auto 4px;
    box-shadow: 0 0 4px 2px orange;
    border-radius: 4px;

    @media (min-width: 973px) {
      margin: 0 auto 12px;
    }
  }
}
</style>
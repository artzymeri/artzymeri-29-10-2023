<template>
  <div class="students-body">
    <div class="navigation-bar">
      <div class="navigation-top">
        <h1>Help and Assistance</h1>
        <div class="pages-buttons-container">
          <p @click="toHome">Home</p>
          <p @click="toStudents">Students</p>
          <p @click="toArchive">Archive</p>
        </div>
      </div>
    </div>
    <div class="help-container">
      <p>If you do need help</p>
      <p style="font-weight: bold">then GOOGLE it :)</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelpView",
  methods: {
    toHome() {
      this.$router.push("/");
    },
    toStudents() {
      this.$router.push("/students");
    },
    toArchive() {
      this.$router.push("/archive");
    },
  },
  created() {
    const loggedIn = localStorage.getItem("logedIn");
    this.logedInToken = JSON.parse(loggedIn);
    console.log(this.logedInToken);
  },
};
</script>

<style scoped>
.help-container {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 20px;
}

.navigation-bar {
  box-shadow: 0px 2px 10px rgba(47, 79, 79, 0.5);
}
</style>

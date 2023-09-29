<template>
  <div class="home-body">
    <div class="home-nav">
      <h1>Welcome to home page</h1>
      <button v-if="logedInToken" class="home-login-button" @click="logOut">
        Logout
      </button>
      <div v-else class="home-login-button" @click="toLogin">Login</div>
    </div>
    <div class="home-content-wrapper">
      <div
        class="home-content-element home-student-element"
        @click="toStudentsManagment"
      >
        <h1>Students Managment</h1>
      </div>
      <div
        class="home-content-element home-archive-element"
        @click="toStudentsArchive"
      >
        <h1>Students Archive</h1>
      </div>
      <div class="home-content-element home-help-element" @click="toHelp">
        <h1>Help and assistance</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      logedInToken: false,
    };
  },
  methods: {
    toLogin() {
      this.$router.push("/login");
    },
    toStudentsManagment() {
      this.$router.push("/students");
    },
    toStudentsArchive() {
      this.$router.push("/archive");
    },
    toHelp() {
      this.$router.push("/help");
    },
    logOut() {
      localStorage.setItem("logedIn", false);
      location.reload();
    },
  },
  created() {
    const loggedIn = localStorage.getItem("logedIn");
    this.logedInToken = JSON.parse(loggedIn);
    console.log(this.logedInToken);
  },
};
</script>

<style>
.home-body {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.home-nav {
  width: 100%;
  height: 65px;
  display: flex;
  justify-content: space-between;
  padding: 0px 100px;
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.5);
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  z-index: 999;
}

.home-nav h1 {
  text-transform: uppercase;
  font-size: 20px;
  color: whitesmoke;
}

.home-content-wrapper {
  flex-grow: 1;
  justify-content: center;
  display: flex;
  align-items: center;
  width: 100%;
}

.home-content-element {
  width: 34%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease-in-out;
  position: relative;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 1;
  cursor: pointer;
}

.home-content-element h1 {
  color: whitesmoke;
  z-index: 3;
  text-transform: uppercase;
  font-size: 20px;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.7);
  padding: 15px;
  text-align: center;
}

.home-content-element::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  content: "";
  transition: 0.2s ease-in-out;
}

.home-student-element {
  background-image: url("../assets/student-home-element.jpeg");
}

.home-archive-element {
  background-image: url("../assets/archive-home-element.jpeg");
}

.home-help-element {
  background-image: url("../assets/help-home-element.jpeg");
}

.home-content-element:hover {
  width: 45%;
}

.home-content-element:hover::after {
  background-color: rgba(0, 0, 0, 0.3);
}

.home-login-button {
  font-size: 15x;
  background-color: whitesmoke;
  color: darkslategrey;
  padding: 10px 30px;
  border-style: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  text-transform: uppercase;
}

.home-login-button:hover {
  background-color: white;
}

@media (max-width: 800px) {
  .home-nav {
    padding: 0px 15px;
  }
  .home-nav h1 {
    font-size: 10px;
  }
  .home-login-button {
    font-size: 10px;
  }
}

@media (max-width: 500px) {
  .home-content-wrapper {
    flex-direction: column;
  }

  .home-content-element {
    height: 34%;
    width: 100%;
  }

  .home-content-element:hover {
    height: 45%;
    width: 100%;
  }
}
</style>

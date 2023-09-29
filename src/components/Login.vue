<template>
  <div class="login-body">
    <div class="login-left"></div>
    <div class="login-right">
      <div
        v-if="logedInToken"
        style="
          color: whitesmoke;
          font-size: 20px;
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-direction: column;
        "
      >
        You are Logged in
        <a href="/" style="color: whitesmoke">Go to Home Page</a>
      </div>
      <div
        style="
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          gap: 15px;
        "
        v-else
      >
        <h1>Login Page</h1>
        <el-input
          placeholder="Type your username"
          prefix-icon="el-icon-search"
          v-model="username"
        >
        </el-input>
        <el-input
          placeholder="Please input password"
          v-model="password"
          prefix-icon="el-icon-lock"
          show-password
        ></el-input>
        <el-button type="primary" @click="login" icon="el-icon-unlock"
          >Login</el-button
        >
        <p class="login-bottom-text" @click="toHomePage">
          Go back to Home Page
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  methods: {
    toHomePage() {
      this.$router.push("/");
    },
    login() {
      if (this.username === "admin" && this.password === "admin") {
        this.$router.push("/");
        localStorage.setItem("logedIn", true);
      } else
        window.alert("Correct username is admin and password is admin also!");
    },
  },
  data() {
    return {
      username: "",
      password: "",
      logedInToken: false,
    };
  },
  created() {
    const loggedIn = localStorage.getItem("logedIn");
    this.logedInToken = JSON.parse(loggedIn);
    console.log(this.logedInToken);
  },
};
</script>

<style scoped>
.login-body {
  height: 100.5vh;
  width: 100.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-image: url("../assets/landscapelogin.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.login-left {
  content: "";
  width: 50%;
  height: 100%;
  background: transparent;
}

.login-right {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  width: 50%;
  height: 100%;
  flex-direction: column;
  gap: 20px;
  transition: 0.2s;
  position: relative;
}

.login-right h1 {
  color: whitesmoke;
}

.el-input {
  width: 80% !important;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
  color: whitesmoke !important;
}

.el-input__inner {
  background-color: rgba(0, 0, 0, 0.1) !important;
  backdrop-filter: blur(10px);
  border-style: none !important;
  color: whitesmoke !important;
}

.el-button {
  width: 80%;
  background-color: rgba(0, 0, 0, 0.1) !important;
  backdrop-filter: blur(10px);
  border-style: none !important;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
}

.el-button:hover {
  background-color: rgba(0, 0, 0, 0.5) !important;
}

.login-bottom-text {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  text-decoration: underline;
  cursor: pointer;
  text-transform: uppercase;
  color: whitesmoke;
}

@media (max-width: 800px) {
  .login-right {
    width: 100%;
  }
  .login-left {
    display: none;
  }
}
</style>

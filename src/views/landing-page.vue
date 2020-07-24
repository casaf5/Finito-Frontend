<template>
  <div class="landing-page">
    <section class="hero-container">
      <nav class="navbar-container">
        <span class="logo">Finito</span>
        <ul class="navbar">
          <router-link to="/login" tag="li">
            <a>Login</a>
          </router-link>
          <router-link to="/signup" tag="li">
            <a>Sign Up</a>
          </router-link>
        </ul>
      </nav>
      <div class="hero-content-container">
        <div class="hero-content">
          <h1>
            Managing tasks has never been easier
            <div class="line"></div>
          </h1>
          <h3>Take your Task organizing skills far beyond</h3>
          <p>
            Finito offers a cutting edge managment system which make working in
            large teams a breaze and takes you further than before
          </p>
          <router-link tag="button" to="/home" class="cta-btn">Go aboard!</router-link>
        </div>
        <div class="hero-img">
          <img src="../assets/images/hero.svg" alt />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import AddTask from "../components/add-task.cmp";
import TaskLabel from "../components/task label/taks-label.cmp";
import taskDuedate from "../components/task-duedate.cmp";
import TaskCheckList from "../components/task-checklist.cmp";
import TaskMembers from "../components/task-members.cmp";
export default {
  name: "Landing-page",
  components: {
    AddTask,
    TaskLabel,
    taskDuedate,
    TaskCheckList,
    TaskMembers
  }
};
</script>

<style lang="scss" scoped>
.landing-page {
  display: grid;
  grid-template-columns:
    minmax(2rem, 1fr)
    minmax(auto, 980px)
    minmax(2rem, 1fr);
  .hero-container {
    min-height: 100vh;
    background-color: #1d3557;
    padding: 2rem;
    grid-column: 1/-1;
    // display: flex;
    // align-items: center;
    color: #fff;
    overflow: hidden;
    > *:not(:first-child) {
      grid-column: 2/3;
    }
    .hero-content-container {
      display: flex;
      align-items: center;
    }
    h1 {
      font-size: 3rem;
      line-height: 1;
      font-weight: 800;
      text-transform: uppercase;
      max-width: 25ch;
      position: relative;
      z-index: 2;
    }
    .hero-content {
      margin-top: -50px;
    }
    .logo {
      font-size: 40px;
    }
    h3 {
      margin: 5px 0;
    }
    p {
      margin-top: 15px;
      color: #dedede;
      margin-bottom: 10px;
      line-height: 1.4;
    }
  }
  .navbar-container {
    grid-column: 1/-1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .navbar {
    display: flex;
    align-items: center;
    > * {
      padding: 5px 10px;
    }
    li {
      transition: all 0.3s ease-in-out;
      cursor: pointer;
      position: relative;
      z-index: 0;
      a {
        text-decoration: none;
        color: #fff;
      }
      &:hover {
        border-radius: 3px;
        :after {
          width: 100%;
        }
      }
      :after {
        z-index: -1;
        content: "";
        position: absolute;
        top: 0%;
        left: 0;
        background-color: #e63946;
        width: 0%;
        height: 100%;
        transition: all 0.3s ease-in-out;
      }
    }
  }
  .cta-btn {
    transition: all 0.3s ease-in-out;
    font-family: inherit;
    text-transform: uppercase;
    font-weight: 600;
    border-radius: 3px;
    font-size: 16px;
    padding: 10px 20px;
    background-color: #e63946;
    color: #fff;
    &:hover {
      background: #a31420;
    }
  }
}
</style>

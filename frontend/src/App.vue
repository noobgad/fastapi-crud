<script setup lang="ts">
</script>

<template>
  <nav id="nav" class="fixed-top">
    <div id="logos">
      <!-- <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a> -->
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>

    <router-link to="/"> Home </router-link>
    |
    <router-link to="/login"> Login </router-link>
    |
    <router-link to="/rough"> Rough </router-link>
    |
    <router-link to="/feed"> Posts </router-link>

  </nav>

  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.underline {
  text-decoration: underline;
}
</style>

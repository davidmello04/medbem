<template>
  <v-app class="app">
    <v-app-bar class="main" app>
      <v-img src="./assets/logoMed.png" class="img" max-width="200"></v-img>
      <v-btn class="btn">
        <router-link to="/" class="link">Início</router-link>
      </v-btn>
      <v-btn class="btn">
        <router-link to="/doctors" class="link">Médicos</router-link>
      </v-btn>
      <v-btn class="btn">
        <router-link to="/secretaries" class="link">Secretários</router-link>
      </v-btn>
      <v-btn class="btn">
        <router-link to="/patients" class="link">Pacientes</router-link>
      </v-btn>
    </v-app-bar>
    <router-view />
  </v-app>
</template>

<script setup></script>

<style scoped>
.app {
  background-color: #0693e3;
}

.main {
  padding: 1em;
  display: flex;
  align-items: center;
}

.btn {
  margin-left: 1em;
}

.link {
  text-decoration: none;
  color: #0e17bd;
}

.img {
  margin-right: 4em;
}
</style>

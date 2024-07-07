<template>
  <v-app class="app">
    <v-app-bar class="main" app>
      <v-img src="./assets/logoMed.png" class="img"></v-img>
      <v-btn class="btn"
        ><router-link to="/" class="link">Home</router-link></v-btn
      >
      <v-btn class="btn"
        ><router-link to="/doctors" class="link">Doctors</router-link></v-btn
      >
      <v-btn
        ><router-link to="/secretaries" class="link"
          >Secretaries</router-link
        ></v-btn
      >
      <v-btn
        ><router-link to="/patients" class="link">Patients</router-link></v-btn
      >
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
}

.btn {
}

.link {
  text-decoration: none;
  color: #0e17bd;
}

.img {
  margin-right: 4em;
  max-width: 200px;
}
</style>

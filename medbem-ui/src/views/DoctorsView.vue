<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <RegisterConsult />
      </v-col>
      <v-col cols="12" md="6">
        <Patient />
      </v-col>
      <v-col cols="12" md="6">
        <ManageSecretaries />
      </v-col>
      <v-col cols="12" md="6">
        <Consults />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RegisterConsult from "@/components/Doctor/RegisterConsult.vue";
import Patient from "@/components/Doctor/Patient.vue";
import ManageSecretaries from "@/components/Doctor/ManageSecretaries.vue";
import Consults from "@/components/Doctor/Consults.vue";

export default {
  components: {
    RegisterConsult,
    Patient,
    ManageSecretaries,
    Consults,
  },
};
</script>

<style scoped>
.card-action {
  cursor: pointer;
  transition: transform 0.3s ease;
  padding: 20px;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-action:hover {
  transform: scale(1.05);
}

.title {
  color: #0693e3;
  font-size: 1.5em;
  text-align: center;
}

.description {
  color: #666;
  font-size: 0.875em;
  text-align: center;
  margin-top: 0.5em;
}

.v-container {
  padding-top: 10em;
}

.v-card-text {
  padding-top: 0;
}

.v-btn {
  margin: 0 4px;
}
</style>

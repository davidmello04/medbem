<template>
  <v-container class="d-flex justify-center align-center" fill-height>
    <v-row class="pd-row">
      <v-col cols="12" md="6" class="mb-4">
        <v-card @click="showModal('paciente')" class="card-action">
          <v-card-title class="title">Cadastrar Paciente</v-card-title>
          <v-card-text class="description">
            Adicione um novo paciente ao sistema com suas informações
            detalhadas.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class="mb-4">
        <v-card @click="showModal('listaPacientes')" class="card-action">
          <v-card-title class="title">Exibir Lista de Pacientes</v-card-title>
          <v-card-text class="description">
            Veja a lista completa de pacientes cadastrados no sistema.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Modal Cadastrar Paciente -->
    <v-dialog v-model="dialogPaciente" max-width="900px">
      <v-card>
        <v-card-title>Cadastrar Paciente</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="registerPatient">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Nome"
                  v-model="paciente.name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Número da Carteira"
                  v-model="paciente.cardId"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-btn color="blue darken-1" text small type="submit">
              Cadastrar Paciente
            </v-btn>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text small @click="dialogPaciente = false"
            >Fechar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal Exibir Lista de Pacientes -->
    <v-dialog v-model="dialogListaPacientes" max-width="800px">
      <v-card class="v-card text-title">
        <v-card-text class="pt-0">
          <PatientsList :pacientes="listaPacientes" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialogListaPacientes = false"
            >Fechar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";
import PatientsList from "@/components/PatientsList.vue";

export default {
  data: () => ({
    dialogPaciente: false,
    dialogListaPacientes: false,
    paciente: {
      name: "",
      cardId: "",
    },
    listaPacientes: [],
  }),
  mounted() {
    this.getPatients();
  },
  methods: {
    showModal(type) {
      if (type === "paciente") {
        this.dialogPaciente = true;
      } else if (type === "listaPacientes") {
        this.dialogListaPacientes = true;
      }
    },
    async getPatients() {
      try {
        const response = await axios.get("http://localhost:3333/patients");
        this.listaPacientes = response.data;
      } catch (error) {
        this.handleError("Erro ao buscar pacientes", error);
      }
    },
    async registerPatient() {
      try {
        await axios.post("http://localhost:3333/patients", this.paciente);
        await this.getPatients();
        this.dialogPaciente = false;
        this.paciente = {
          name: "",
          cardId: "",
        };
      } catch (error) {
        this.handleError("Erro ao cadastrar o paciente", error);
      }
    },
    handleError(message, error) {
      this.error = message;
      console.error(message, error);
    },
  },
  components: {
    PatientsList,
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
  padding-top: 0em;
}

.pd-row {
  padding-top: 10em;
}

.text-title {
  padding: 1em;
}

.v-card-text {
  padding-top: 0;
}

.v-btn {
  margin: 0 4px;
}
</style>

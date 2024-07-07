<template>
  <v-container class="d-flex justify-center align-center" fill-height>
    <v-row>
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
    <v-dialog v-model="dialogPaciente" max-width="600px">
      <v-card>
        <v-card-title>Cadastrar Paciente</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field label="Nome" v-model="paciente.name"></v-text-field>
            <v-text-field
              label="Número da Carteira"
              v-model="paciente.cardId"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialogPaciente = false"
            >Fechar</v-btn
          >
          <v-btn color="blue darken-1" text @click="registerPatient"
            >Cadastrar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal Exibir Lista de Pacientes -->
    <v-dialog v-model="dialogListaPacientes" max-width="800px">
      <v-card>
        <v-card-title>Lista de Pacientes</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item
              v-for="(paciente, index) in listaPacientes"
              :key="index"
            >
              <v-list-item-content>
                <v-list-item-title>{{ paciente.name }}</v-list-item-title>
                <v-list-item-subtitle
                  >Número da Carteira:
                  {{ paciente.cardId }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialogListaPacientes = false"
            >Fechar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";

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
      } catch (error) {
        this.error = "Erro ao cadastrar o paciente";
        console.error(error);
      }
    },
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
</style>

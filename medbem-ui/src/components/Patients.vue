<template>
  <v-container fill-height>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="title">Lista de Pacientes</v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                cols="12"
                md="6"
                v-for="(paciente, index) in listaPacientes"
                :key="index"
              >
                <v-card class="patient-card">
                  <v-card-text>
                    <v-list-item class="patient-info">
                      <v-list-item-title>{{ paciente.name }}</v-list-item-title>
                      <v-list-item-subtitle>
                        Número da Carteira: {{ paciente.cardId }}
                      </v-list-item-subtitle>
                    </v-list-item>
                    <div class="patient-actions">
                      <v-btn color="blue" small @click="editPaciente(index)">
                        Editar
                      </v-btn>
                      <v-btn color="red" small @click="deletePaciente(index)">
                        Excluir
                      </v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Modal Editar Paciente -->
    <v-dialog v-model="dialogEditarPaciente" max-width="600px">
      <v-card>
        <v-card-title>Editar Paciente</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              label="Nome"
              v-model="pacienteEdicao.name"
            ></v-text-field>
            <v-text-field
              label="Número da Carteira"
              v-model="pacienteEdicao.cardId"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialogEditarPaciente = false"
            >Fechar</v-btn
          >
          <v-btn color="blue darken-1" text @click="salvarEdicaoPaciente"
            >Salvar</v-btn
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
    dialogEditarPaciente: false,
    pacienteEdicao: {
      name: "",
      cardId: "",
    },
    indexEdicao: null,
    listaPacientes: [],
    error: null,
  }),
  mounted() {
    this.getPatients();
  },
  methods: {
    async getPatients() {
      try {
        const response = await axios.get("http://localhost:3333/patients");
        this.listaPacientes = response.data;
      } catch (error) {
        this.handleError("Erro ao buscar pacientes", error);
      }
    },

    async editPaciente(index) {
      try {
        this.pacienteEdicao = { ...this.listaPacientes[index] };
        this.indexEdicao = this.pacienteEdicao.id;
        this.dialogEditarPaciente = true;
      } catch (error) {
        this.handleError("Erro ao editar o paciente", error);
      }
    },

    async salvarEdicaoPaciente() {
      try {
        await axios.put(
          `http://localhost:3333/patients/${this.indexEdicao}`,
          this.pacienteEdicao
        );
        await this.getPatients();
        this.dialogEditarPaciente = false;
      } catch (error) {
        this.handleError("Erro ao salvar a edição do paciente", error);
      }
    },

    async deletePaciente(index) {
      const patient = { ...this.listaPacientes[index] };
      const confirmed = confirm(
        `Tem certeza que deseja excluir o paciente ${patient.name}?`
      );

      if (confirmed) {
        try {
          await axios.delete(`http://localhost:3333/patients/${patient.id}`);
          await this.getPatients();
        } catch (error) {
          this.handleError("Erro ao excluir o paciente", error);
        }
      }
    },

    handleError(message, error) {
      this.error = message;
      console.error(message, error);
    },
  },
};
</script>

<style scoped>
.title {
  color: #0693e3;
  font-size: 1.5em;
  text-align: center;
}

.v-container {
  padding-top: 10em;
}

.patient-info {
  text-align: left;
}

.patient-card {
  margin-bottom: 20px;
  border: 1px solid #0693e3;
  box-shadow: none;
}

.patient-actions {
  display: flex;
  gap: 10px;
  padding-top: 1em;
}

.v-btn {
  font-size: 0.875em;
}
</style>

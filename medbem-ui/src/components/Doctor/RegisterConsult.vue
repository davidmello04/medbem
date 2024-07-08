<template>
  <v-col cols="12" class="mb-4">
    <v-card @click="showModal" class="card-action">
      <v-card-title class="title">Registrar Consulta</v-card-title>
      <v-card-text class="description">
        Comece uma nova consulta médica e registre informações do paciente.
      </v-card-text>
    </v-card>

    <!-- Modal Registrar Consulta -->
    <v-dialog v-model="dialogConsulta" max-width="600px">
      <v-card>
        <v-card-title>Registrar Consulta</v-card-title>
        <v-card-text>
          <div v-if="!consultaFormVisible">
            <v-list>
              <v-list-item
                v-for="(paciente, index) in listaPacientes"
                :key="index"
                @click="iniciarConsulta(paciente)"
              >
                <v-list-item>
                  <v-list-item-title>{{ paciente.name }}</v-list-item-title>
                  <v-list-item-subtitle>
                    Número da Carteira: {{ paciente.cardId }}
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list-item>
            </v-list>
          </div>
          <v-form v-else>
            <v-text-field
              label="Paciente atendido"
              v-model="consult.patientId"
              disabled
            ></v-text-field>
            <v-text-field
              label="Médico"
              v-model="consult.doctorId"
            ></v-text-field>
            <v-text-field
              label="Data de entrada"
              v-model="consult.entryDate"
              type="date"
            ></v-text-field>
            <v-text-field
              label="Data de saída"
              v-model="consult.outDate"
              type="date"
            ></v-text-field>
            <v-textarea
              label="Notas sobre o atendimento"
              v-model="consult.note"
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text small @click="dialogConsulta = false"
            >Fechar</v-btn
          >
          <v-btn
            color="blue darken-1"
            text
            small
            v-if="consultaFormVisible"
            @click="createConsult"
            >Salvar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import axios from "axios";

export default {
  name: "Consult",
  data() {
    return {
      dialogConsulta: false,
      consultaFormVisible: false,
      consult: {
        entryDate: "",
        outDate: "",
        note: "",
        doctorId: null,
        patientId: null,
      },
      listaPacientes: [],
    };
  },
  mounted() {
    this.getPatients();
  },
  methods: {
    showModal() {
      this.dialogConsulta = true;
      this.consultaFormVisible = false;
    },
    async getPatients() {
      try {
        const response = await axios.get("http://localhost:3333/patients");
        this.listaPacientes = response.data;
      } catch (error) {
        console.error("Erro ao buscar pacientes", error);
      }
    },
    async createConsult() {
      try {
        const response = await axios.post(
          "http://localhost:3333/consults",
          this.consult
        );
        console.log("Consulta salva", response.data);
        this.dialogConsulta = false;
        this.consult = {
          entryDate: "",
          outDate: "",
          note: "",
          doctorId: "",
          patientId: "",
        };
      } catch (error) {
        console.error("Erro ao cadastrar consulta", error);
      }
    },
    iniciarConsulta(paciente) {
      this.consult.patientId = paciente.id;
      this.consultaFormVisible = true;
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

.v-card-text {
  padding-top: 0;
}

.v-btn {
  margin: 0 4px;
}
</style>

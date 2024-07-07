<template>
  <v-col cols="12" class="mb-4">
    <v-card @click="showModal('consulta')" class="card-action">
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
                v-for="(paciente, index) in pacientesNaoConsultados"
                :key="index"
                @click="iniciarConsulta(paciente)"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ paciente.name }}</v-list-item-title>
                  <v-list-item-subtitle>
                    Número da Carteira: {{ paciente.cardId }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
          <v-form v-else>
            <v-text-field
              label="Paciente atendido"
              v-model="consulta.pacienteNome"
              disabled
            ></v-text-field>
            <v-text-field
              label="Médico"
              v-model="consulta.medico"
            ></v-text-field>
            <v-text-field
              label="Data de entrada"
              v-model="consulta.dataEntrada"
              type="date"
            ></v-text-field>
            <v-text-field
              label="Data de saída"
              v-model="consulta.dataSaida"
              type="date"
            ></v-text-field>
            <v-textarea
              label="Notas sobre o atendimento"
              v-model="consulta.notas"
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
            @click="salvarConsulta"
            >Salvar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
export default {
  name: "Consult",
  data() {
    return {
      dialogConsulta: false,
      consultaFormVisible: false,
      consulta: {
        pacienteNome: "",
        medico: "",
        dataEntrada: "",
        dataSaida: "",
        notas: "",
      },
      pacientesNaoConsultados: [
        { name: "Carlos Jr", cardId: "123456" },
        { name: "Luiza Smith", cardId: "789012" },
      ],
    };
  },
  methods: {
    showModal(type) {
      this.dialogConsulta = true;
      this.consultaFormVisible = false;
    },
    iniciarConsulta(paciente) {
      this.consulta.pacienteNome = paciente.name;
      this.consultaFormVisible = true;
    },
    salvarConsulta() {
      console.log("Consulta salva", this.consulta);
      this.dialogConsulta = false;
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

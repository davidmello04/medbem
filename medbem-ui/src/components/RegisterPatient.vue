<template>
  <v-col cols="12" class="mb-4">
    <v-card @click="showModal" class="card-action">
      <v-card-title class="title">Cadastrar Paciente</v-card-title>
      <v-card-text class="description">
        Adicione um novo paciente ao sistema com suas informações detalhadas.
      </v-card-text>
    </v-card>

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
                  v-model="paciente.nome"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Número da Carteira"
                  v-model="paciente.numeroCarteira"
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
  </v-col>
</template>

<script>
export default {
  name: "Patient",
  data() {
    return {
      dialogPaciente: false,
      paciente: {
        nome: "",
        numeroCarteira: "",
      },
    };
  },
  methods: {
    showModal() {
      this.dialogPaciente = true;
    },
    registerPatient() {
      console.log("Paciente cadastrado", this.paciente);
      this.dialogPaciente = false;
      // Limpar os campos do formulário após o cadastro
      this.paciente = {
        nome: "",
        numeroCarteira: "",
      };
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

<template>
  <v-container class="d-flex justify-center align-center" fill-height>
    <v-row>
      <v-col cols="12" md="6" class="mb-4">
        <v-card @click="showModal('consulta')" class="card-action">
          <v-card-title class="title">Registrar Consulta</v-card-title>
          <v-card-text class="description">
            Comece uma nova consulta médica e registre informações do paciente.
          </v-card-text>
        </v-card>
      </v-col>
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
        <v-card @click="showModal('secretario')" class="card-action">
          <v-card-title class="title">Gerenciar Secretários(a)</v-card-title>
          <v-card-text class="description">
            Registre um novo secretário(a) para auxiliar na administração.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class="mb-4">
        <v-card @click="showModal('listaPacientes')" class="card-action">
          <v-card-title class="title">Consultas</v-card-title>
          <v-card-text class="description">
            Veja a lista completa das suas consultas no sistema.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

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
                  <v-list-item-title>{{ paciente.nome }}</v-list-item-title>
                  <v-list-item-subtitle>
                    Número da Carteira: {{ paciente.numeroCarteira }}
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

    <!-- Modal Cadastrar/Editar Paciente -->
    <v-dialog v-model="dialogPaciente" max-width="900px">
      <v-card>
        <v-card-title>{{
          pacienteEditando ? "Editar Paciente" : "Cadastrar Paciente"
        }}</v-card-title>
        <v-card-text>
          <v-form
            @submit.prevent="
              pacienteEditando ? atualizarPaciente() : cadastrarPaciente()
            "
          >
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
              <v-col cols="12" v-if="pacienteEditando">
                <v-textarea label="Notas" v-model="paciente.notas"></v-textarea>
              </v-col>
            </v-row>
            <v-btn color="blue darken-1" text small type="submit">{{
              pacienteEditando ? "Salvar Paciente" : "Cadastrar Paciente"
            }}</v-btn>
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

    <!-- Modal Gerenciar Secretários -->
    <v-dialog v-model="dialogSecretario" max-width="800px">
      <v-card>
        <v-card-title>Gerenciar Secretários(a)</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <h3>Cadastrar Novo Secretário(a)</h3>
                <v-form>
                  <v-text-field
                    label="Nome"
                    v-model="secretario.nome"
                  ></v-text-field>
                  <v-text-field
                    label="Login"
                    v-model="secretario.login"
                  ></v-text-field>
                  <v-text-field
                    label="Senha"
                    v-model="secretario.senha"
                    type="password"
                  ></v-text-field>
                  <v-text-field
                    label="Data de Admissão"
                    v-model="secretario.dataAdmissao"
                    type="date"
                  ></v-text-field>
                  <v-btn
                    color="blue darken-1"
                    text
                    small
                    @click="
                      secretarioEditando
                        ? atualizarSecretario()
                        : cadastrarSecretario()
                    "
                  >
                    {{
                      secretarioEditando
                        ? "Salvar Secretário(a)"
                        : "Cadastrar Secretário(a)"
                    }}
                  </v-btn>
                </v-form>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="12" md="6">
                <h3>Secretários Cadastrados</h3>
                <v-list>
                  <v-list-item
                    v-for="(secretario, index) in listaSecretarios"
                    :key="index"
                  >
                    <v-list-item-content>
                      <v-list-item-title>{{
                        secretario.nome
                      }}</v-list-item-title>
                      <v-list-item-subtitle>
                        Data de Admissão: {{ secretario.dataAdmissao }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn
                        text
                        color="primary"
                        small
                        @click="editarSecretario(secretario)"
                      >
                        Editar
                      </v-btn>
                      <v-btn
                        text
                        color="red"
                        small
                        @click="excluirSecretario(secretario.id)"
                      >
                        Excluir
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            small
            @click="dialogSecretario = false"
            >Fechar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal Exibir Lista de Consultas -->
    <v-dialog v-model="dialogListaPacientes" max-width="800px">
      <v-card>
        <v-card-title>Lista de Consultas</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-list>
                  <v-list-item
                    v-for="(paciente, index) in pacientesConsultados"
                    :key="index"
                    @click="verDetalhesConsulta(paciente)"
                  >
                    <v-list-item-content>
                      <v-list-item-title>{{ paciente.nome }}</v-list-item-title>
                      <v-list-item-subtitle>
                        Número da Carteira: {{ paciente.numeroCarteira }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>
                        Médico: {{ paciente.medico }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>
                        Data de Entrada: {{ paciente.dataEntrada }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>
                        Data de Saída: {{ paciente.dataSaida }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>
                        Notas: {{ paciente.notas }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn
                        text
                        color="primary"
                        small
                        @click.stop="editarPaciente(paciente)"
                      >
                        Editar
                      </v-btn>
                      <v-btn
                        text
                        color="red"
                        small
                        @click.stop="excluirPaciente(paciente.id)"
                      >
                        Excluir
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            small
            @click="dialogListaPacientes = false"
            >Fechar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialogConsulta: false,
    dialogPaciente: false,
    dialogSecretario: false,
    dialogListaPacientes: false,
    consultaFormVisible: false,
    consulta: {
      medico: "",
      paciente: "",
      pacienteNome: "",
      dataEntrada: "",
      dataSaida: "",
      notas: "",
    },
    paciente: {
      id: null,
      nome: "",
      numeroCarteira: "",
      medico: "",
      dataSaida: "",
      notas: "",
    },
    secretario: {
      id: null,
      nome: "",
      login: "",
      senha: "",
      dataAdmissao: "",
    },
    listaPacientes: [],
    listaSecretarios: [
      { id: 1, nome: "Secretário 1", dataAdmissao: "2023-01-01" },
      { id: 2, nome: "Secretário 2", dataAdmissao: "2023-02-01" },
    ],
    pacienteEditando: false,
    secretarioEditando: false,
  }),
  mounted() {
    this.getPatients();
  },
  computed: {
    pacientesNaoConsultados() {
      return this.listaPacientes.filter((paciente) => !paciente.consultado);
    },
    pacientesConsultados() {
      return this.listaPacientes.filter((paciente) => paciente.consultado);
    },
  },
  methods: {
    async getPatients() {
      try {
        const response = await axios.get("http://localhost:3333/patients");
        this.patients = response.data;
      } catch (error) {
        this.error = "Erro ao buscar usuários: " + error.message;
      }
    },
    showModal(type) {
      if (type === "consulta") {
        this.consultaFormVisible = false;
        this.dialogConsulta = true;
      } else if (type === "paciente") {
        this.dialogPaciente = true;
        this.pacienteEditando = false;
        this.resetPacienteForm();
      } else if (type === "secretario") {
        this.dialogSecretario = true;
        this.secretarioEditando = false;
        this.resetSecretarioForm();
      } else if (type === "listaPacientes") {
        this.dialogListaPacientes = true;
      }
    },
    iniciarConsulta(paciente) {
      this.consulta.paciente = paciente.id;
      this.consulta.pacienteNome = paciente.nome;
      this.consulta.dataEntrada = paciente.dataEntrada;
      this.consultaFormVisible = true;
    },
    salvarConsulta() {
      // Lógica para salvar consulta médica
      console.log("Consulta salva:", this.consulta);
      this.dialogConsulta = false;
      // Atualiza o status do paciente para consultado
      const paciente = this.listaPacientes.find(
        (p) => p.id === this.consulta.paciente
      );
      if (paciente) {
        paciente.consultado = true;
        paciente.medico = this.consulta.medico;
        paciente.dataSaida = this.consulta.dataSaida;
        paciente.notas = this.consulta.notas;
      }
    },
    cadastrarPaciente() {
      // Lógica para cadastrar paciente
      console.log("Paciente cadastrado:", this.paciente);
      this.listaPacientes.push({
        ...this.paciente,
        id: this.listaPacientes.length + 1,
        consultado: false,
      });
      this.dialogPaciente = false;
      this.resetPacienteForm();
    },
    atualizarPaciente() {
      // Lógica para atualizar paciente
      const pacienteIndex = this.listaPacientes.findIndex(
        (p) => p.id === this.paciente.id
      );
      if (pacienteIndex !== -1) {
        this.listaPacientes.splice(pacienteIndex, 1, { ...this.paciente });
        console.log("Paciente atualizado:", this.paciente);
      }
      this.dialogPaciente = false;
      this.pacienteEditando = false;
    },
    editarPaciente(paciente) {
      // Lógica para editar paciente
      console.log("Editando paciente:", paciente);
      this.paciente = { ...paciente };
      this.pacienteEditando = true;
      this.dialogPaciente = true;
    },
    excluirPaciente(id) {
      // Lógica para excluir paciente
      console.log("Excluindo paciente com ID:", id);
      this.listaPacientes = this.listaPacientes.filter(
        (paciente) => paciente.id !== id
      );
    },
    consultarPaciente(paciente) {
      // Lógica para iniciar consulta do paciente
      console.log("Consultando paciente:", paciente);
      this.consulta.paciente = paciente.id;
      this.consulta.pacienteNome = paciente.nome;
      this.consulta.dataEntrada = paciente.dataEntrada;
      this.consultaFormVisible = true;
      this.dialogConsulta = true;
    },
    cadastrarSecretario() {
      // Lógica para cadastrar secretário(a)
      console.log("Secretário(a) cadastrado(a):", this.secretario);
      this.listaSecretarios.push({
        ...this.secretario,
        id: this.listaSecretarios.length + 1,
      });
      this.dialogSecretario = false;
      this.resetSecretarioForm();
    },
    atualizarSecretario() {
      // Lógica para atualizar secretário(a)
      const secretarioIndex = this.listaSecretarios.findIndex(
        (s) => s.id === this.secretario.id
      );
      if (secretarioIndex !== -1) {
        this.listaSecretarios.splice(secretarioIndex, 1, {
          ...this.secretario,
        });
        console.log("Secretário(a) atualizado(a):", this.secretario);
      }
      this.dialogSecretario = false;
      this.secretarioEditando = false;
    },
    editarSecretario(secretario) {
      // Lógica para editar secretário(a)
      console.log("Editando secretário(a):", secretario);
      this.secretario = { ...secretario };
      this.secretarioEditando = true;
      this.dialogSecretario = true;
    },
    excluirSecretario(id) {
      // Lógica para excluir secretário(a)
      console.log("Excluindo secretário(a) com ID:", id);
      this.listaSecretarios = this.listaSecretarios.filter(
        (secretario) => secretario.id !== id
      );
    },
    resetPacienteForm() {
      this.paciente = {
        id: null,
        nome: "",
        numeroCarteira: "",
        medico: "",
        dataSaida: "",
        notas: "",
      };
    },
    resetSecretarioForm() {
      this.secretario = {
        id: null,
        nome: "",
        login: "",
        senha: "",
        dataAdmissao: "",
      };
    },
    verDetalhesConsulta(paciente) {
      this.paciente = { ...paciente };
      this.dialogPaciente = true;
      this.pacienteEditando = true;
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

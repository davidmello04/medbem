<template>
  <v-col cols="12" class="mb-4">
    <v-card @click="showModal('secretario')" class="card-action">
      <v-card-title class="title">Gerenciar Secretários(a)</v-card-title>
      <v-card-text class="description">
        Registre um novo secretário(a) para auxiliar na administração.
      </v-card-text>
    </v-card>

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
                    <v-list-item>
                      <v-list-item-title>{{
                        secretario.nome
                      }}</v-list-item-title>
                      <v-list-item-subtitle
                        >Data de Admissão:
                        {{ secretario.dataAdmissao }}</v-list-item-subtitle
                      >
                    </v-list-item>
                    <v-list-item-action>
                      <v-btn
                        text
                        color="primary"
                        small
                        @click="editarSecretario(secretario)"
                        >Editar</v-btn
                      >
                      <v-btn
                        text
                        color="red"
                        small
                        @click="excluirSecretario(secretario.id)"
                        >Excluir</v-btn
                      >
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
  </v-col>
</template>

<script>
export default {
  name: "ManageSecretaries",
  data() {
    return {
      dialogSecretario: false,
      secretarioEditando: false,
      secretario: {
        nome: "",
        login: "",
        senha: "",
        dataAdmissao: "",
      },
      listaSecretarios: [
        { id: 1, nome: "David Melo", dataAdmissao: "2022-01-15" },
        { id: 2, nome: "Alice Luna", dataAdmissao: "2022-02-20" },
      ],
    };
  },
  methods: {
    showModal(type) {
      this.dialogSecretario = true;
      this.secretarioEditando = false;
    },
    cadastrarSecretario() {
      console.log("Secretário cadastrado", this.secretario);
      this.listaSecretarios.push({ ...this.secretario, id: Date.now() });
      this.dialogSecretario = false;
    },
    atualizarSecretario() {
      console.log("Secretário atualizado", this.secretario);
      const index = this.listaSecretarios.findIndex(
        (s) => s.id === this.secretario.id
      );
      if (index !== -1) {
        this.listaSecretarios.splice(index, 1, this.secretario);
      }
      this.dialogSecretario = false;
    },
    editarSecretario(secretario) {
      this.secretario = { ...secretario };
      this.secretarioEditando = true;
      this.dialogSecretario = true;
    },
    excluirSecretario(id) {
      this.listaSecretarios = this.listaSecretarios.filter((s) => s.id !== id);
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

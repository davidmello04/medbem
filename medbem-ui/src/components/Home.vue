<template>
  <div>
    <v-card
      class="mx-auto pa-12 pb-8 top"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div v-if="isLoginForm">
        <div class="text-subtitle-1 text-medium-emphasis">Email</div>

        <v-text-field
          v-model="loginForm.email"
          density="compact"
          placeholder="Endereço de E-mail"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        ></v-text-field>

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Senha

          <a
            class="text-caption text-decoration-none text-blue"
            href="#"
            rel="noopener noreferrer"
            target="/doctors"
          >
            Esqueceu a senha?</a
          >
        </div>

        <v-text-field
          v-model="loginForm.password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Insira sua senha"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Tipo de Usuário</div>
        <v-select
          clearable
          label="Selecionar"
          :items="['Médico(a)', 'Secretátio(a)']"
        ></v-select>

        <v-btn
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          block
          @click="login"
        >
          Entrar
        </v-btn>

        <v-card-text class="text-center">
          <a
            class="text-blue text-decoration-none"
            href="#"
            @click.prevent="toggleForm"
          >
            Inscreva-se agora<v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text>
      </div>

      <div v-else>
        <div class="text-subtitle-1 text-medium-emphasis">Nome</div>

        <v-text-field
          v-model="registerForm.name"
          density="compact"
          placeholder="Seu Nome"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Registro</div>

        <v-text-field
          v-model="registerForm.registration"
          density="compact"
          placeholder="Seu Número de Registro"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Email</div>

        <v-text-field
          v-model="registerForm.email"
          density="compact"
          placeholder="Endereço de E-mail"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Senha</div>

        <v-text-field
          v-model="registerForm.password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Crie uma senha"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-btn
          class="mb-8"
          color="green"
          size="large"
          variant="tonal"
          block
          @click="register"
        >
          Cadastrar
        </v-btn>

        <v-card-text class="text-center">
          <a
            class="text-blue text-decoration-none"
            href="#"
            @click.prevent="toggleForm"
          >
            Já tem uma conta? Entrar<v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    visible: false,
    isLoginForm: true,
    loginForm: {
      email: "",
      password: "",
      userType: "Médico", // Valor padrão
    },
    registerForm: {
      name: "",
      registration: "",
      email: "",
      password: "",
    },
  }),
  methods: {
    toggleForm() {
      this.isLoginForm = !this.isLoginForm;
    },
    async login() {
      try {
        const response = await http.post(
          "URL_DO_BACKEND/login",
          this.loginForm
        );
        console.log("Login bem-sucedido:", response.data);
      } catch (error) {
        console.error("Erro ao fazer login:", error);
      }
    },
    async register() {
      try {
        const response = await http.post(
          "URL_DO_BACKEND/register",
          this.registerForm
        );
        console.log("Cadastro bem-sucedido:", response.data);
      } catch (error) {
        console.error("Erro ao fazer cadastro:", error);
      }
    },
  },
};
</script>

<style>
.top {
  margin-top: 9em;
}
</style>

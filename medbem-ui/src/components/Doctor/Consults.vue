<template>
  <v-col cols="12" class="mb-4">
    <v-card @click="showModal('listaPacientes')" class="card-action">
      <v-card-title class="title">Consultas</v-card-title>
      <v-card-text class="description">
        Veja a lista completa das suas consultas no sistema.
      </v-card-text>
    </v-card>

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
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
export default {
  name: "Consults",
  data() {
    return {
      dialogListaPacientes: false,
      pacientesConsultados: [
        {
          id: 1,
          nome: "João Silva",
          numeroCarteira: "12345",
          medico: "Dr. Alves",
          dataEntrada: "2024-06-01",
          dataSaida: "2024-06-05",
          notas: "Consulta de rotina",
        },
        {
          id: 2,
          nome: "Maria Oliveira",
          numeroCarteira: "67890",
          medico: "Dr. Santos",
          dataEntrada: "2024-07-01",
          dataSaida: "2024-07-03",
          notas: "Consulta especializada",
        },
      ],
    };
  },
  methods: {
    showModal() {
      this.dialogListaPacientes = true;
    },
    verDetalhesConsulta(paciente) {
      console.log("Ver detalhes da consulta", paciente);
    },
    editarPaciente(paciente) {
      console.log("Editar paciente", paciente);
    },
    excluirPaciente(id) {
      console.log("Excluir paciente com ID", id);
      this.pacientesConsultados = this.pacientesConsultados.filter(
        (p) => p.id !== id
      );
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

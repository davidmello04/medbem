<template>
  <v-col cols="12" class="mb-4">
    <v-card @click="showModal" class="card-action">
      <v-card-title class="title">Consultas</v-card-title>
      <v-card-text class="description">
        Veja a lista completa das suas consultas no sistema.
      </v-card-text>
    </v-card>

    <!-- Modal Exibir Lista de Consultas -->
    <v-dialog v-model="dialogListaPacientes" max-width="800px">
      <v-card>
        <v-card-title class="title-card">Lista de Consultas</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="6"
                v-for="(consult, index) in listaConsultas"
                :key="index"
              >
                <v-card class="mb-4" outlined>
                  <v-card-title class="title-card-consult">{{
                    consult.patient.name
                  }}</v-card-title>
                  <v-card-subtitle>
                    Número da Carteira: {{ consult.patient.cardId }}
                  </v-card-subtitle>
                  <v-card-subtitle>
                    Médico: {{ consult.doctor.name }}
                  </v-card-subtitle>
                  <v-card-subtitle>
                    Data de Entrada: {{ consult.entryDate }}
                  </v-card-subtitle>
                  <v-card-subtitle>
                    Data de Saída: {{ consult.outDate }}
                  </v-card-subtitle>
                  <v-card-subtitle> Notas: {{ consult.note }} </v-card-subtitle>
                  <v-card-actions>
                    <v-btn
                      text
                      color="primary"
                      small
                      @click.stop="openEditModal(consult)"
                    >
                      Editar
                    </v-btn>
                    <v-btn
                      text
                      color="red"
                      small
                      @click.stop="deleteConsult(consult.id)"
                    >
                      Excluir
                    </v-btn>
                  </v-card-actions>
                </v-card>
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

    <!-- Modal Editar Consulta -->
    <v-dialog v-model="dialogEditConsult" max-width="800px">
      <v-card>
        <v-card-title class="title-card">Editar Consulta</v-card-title>
        <v-card-text>
          <v-form ref="editForm" v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="currentConsult.patient.name"
                    label="Nome do Paciente"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="currentConsult.patient.cardId"
                    label="Número da Carteira"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="currentConsult.doctorId"
                    label="ID do Médico"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="currentConsult.entryDate"
                    label="Data de Entrada"
                    type="date"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="currentConsult.outDate"
                    label="Data de Saída"
                    type="date"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="currentConsult.note"
                    label="Notas"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text small @click="updateConsult">
            Salvar
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            small
            @click="dialogEditConsult = false"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dialogListaPacientes: false,
      dialogEditConsult: false,
      listaConsultas: [],
      currentConsult: {},
      valid: true,
    };
  },
  mounted() {
    this.getConsults();
  },
  methods: {
    async showModal() {
      await this.getConsults();
      this.dialogListaPacientes = true;
    },
    async getConsults() {
      try {
        const response = await axios.get("http://localhost:3333/consults");
        this.listaConsultas = response.data;
      } catch (error) {
        console.error("Erro ao buscar consultas", error);
      }
    },
    async deleteConsult(id) {
      try {
        await axios.delete(`http://localhost:3333/consults/${id}`);
        await this.getConsults();
      } catch (error) {
        console.error("Erro ao excluir consulta", error);
      }
    },
    openEditModal(consult) {
      this.currentConsult = { ...consult };
      this.dialogEditConsult = true;
    },
    async updateConsult() {
      try {
        await axios.put(
          `http://localhost:3333/consults/${this.currentConsult.id}`,
          this.currentConsult
        );
        this.dialogEditConsult = false;
        await this.getConsults();
      } catch (error) {
        console.error("Erro ao atualizar consulta", error);
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

.title,
.title-card {
  color: #0693e3;
  font-size: 1.5em;
  text-align: center;
}

.title-card-consult {
  color: #0693e3;
}

.title-card {
  margin-top: 1em;
}

.description {
  color: #666;
  font-size: 0.875em;
  text-align: center;
  margin-top: 0.5em;
}

.v-card-text {
  padding-top: 0;
}

.v-btn {
  margin: 0 4px;
}

.v-card {
  border: 1px solid #ddd;
}

.v-card-title {
  font-weight: bold;
}

.v-card-subtitle {
  color: #555;
}
</style>

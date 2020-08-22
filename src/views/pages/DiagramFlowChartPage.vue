<template>
  <div class="about">
    <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <h2 class="display-1 font-weight-bold mb-3">Exemplo feito baseado na lib Vue FlowChart</h2>
        </v-col>
        <v-col cols="12">
          <v-layout wrap id="toolbar">
            <v-flex xs12 sm3 px-2>
              <v-btn @click="$refs.chart.editCurrent()" block>
                <v-icon class="mx-1">edit</v-icon>Editar Selecionado
              </v-btn>
            </v-flex>
            <v-flex xs12 sm6 px-2>
              <v-btn
                @click="
                      $refs.chart.add({
                        id: +new Date(),
                        x: 10 + Math.floor(Math.random() * 30),
                        y: 100 + Math.floor(Math.random() * 30),
                        width:200,
                        title: '',
                        type: 'operation',
                        text: '',
                        endCause: false
                      })
                    "
                block
              >
                <v-icon class="mx-1">add</v-icon>Adicionar Item
              </v-btn>
            </v-flex>
            <v-flex xs12 sm3 px-2>
              <v-btn @click="$refs.chart.remove()" block>
                <v-icon class="mx-1">delete</v-icon>Remover Selecionado
              </v-btn>
            </v-flex>
          </v-layout>
        </v-col>
        <v-col cols="12">
          <FlowChart
            :width="'100%'"
            :nodes="nodes"
            :connections="connections"
            @editnode="handleEditNode"
            @dblclick="handleDblClick"
            @editconnection="handleEditConnection"
            @save="handleChartSave"
            ref="chart"
          ></FlowChart>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="nodeDialogVisible" width="500px" persistent>
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        Editar
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-layout wrap>
          <v-flex xs12>
            <v-switch v-model="nodeForm.endCause" label="Causa Raiz"></v-switch>
          </v-flex>
          <v-flex xs12>
            <v-text-field label="Barreira" v-model="nodeForm.title"></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-textarea label="Texto" v-model="nodeForm.text"></v-textarea>
          </v-flex>
          <v-flex xs12 v-if="is_touch_screen">
            <v-select :disabled="readonlyView" v-model="node_destination" :items="node_destination_list"
              item-text="text" label="Ligar com" return-object>
              <template v-slot:no-data>
                <v-alert :value="true" class="text-xs-center">
                  Não há itens disponiveis
                </v-alert>
              </template>
              <template v-slot:selection="{ item }">
                <span v-if="item.text.length < 24">{{ item.text }}</span>
                <span v-else>{{ item.text.substring(0,24)+".." }}</span>
              </template>
            </v-select>
          </v-flex>
          <v-flex xs12 v-if="is_touch_screen">
            <v-select :disabled="readonlyView" v-model="direction_source" :items="list_directions" item-text="text"
              label="Saindo pelo ponto" return-object>
              <template v-slot:no-data>
                <v-alert :value="true" class="text-xs-center">
                  Não há itens disponiveis
                </v-alert>
              </template>
            </v-select>
          </v-flex>
          <v-flex xs12 v-if="is_touch_screen">
            <v-select :disabled="readonlyView" v-model="direction_destination" :items="list_directions"
              item-text="text" label="Chegando pelo ponto" return-object>
              <template v-slot:no-data>
                <v-alert :value="true" class="text-xs-center">
                  Não há itens disponiveis
                </v-alert>
              </template>
            </v-select>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-btn color="default" @click="handleClickCancelSaveNode">Cancelar</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="handleClickSaveNode">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </div>
</template>

<script>
import FlowChart from "@/components/DiagramFlowChart/Flowchart";

export default {
  components: {
    FlowChart,
  },
  data() {
    return {
      nodes: [
        {
          id: +new Date(),
          x: 40,
          y: 130,
          title: "TITULO 1",
          type: "operation",
          text: 'TEXT long text TEXT long text TEXT long text TEXT long text TEXT long text ',
          width: 150,
        },
        {
          id: +new Date(),
          x: 340,
          y: 350,
          title: "TITULO 2",
          type: "operation",
          text: 'TEXT long text TEXT long text TEXT long text TEXT long text TEXT long text ',
          width: 150,
        },
      ],
      connections: [
      ],
      last_return_object_chart: {},
      node_destination_list: [],
      direction_destination: {},
      direction_source: {},
      node_destination: {},
      selectedNode: { target: null },
      nodeDialogVisible: false,
      is_touch_screen: false,
      nodeForm: { title: null, id: null, type: null, text: '', endCause: false },
    };
  },
  mounted () {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 960) {
        this.is_touch_screen = true;
      } else {
        this.is_touch_screen = false;
      }
    });
    if (window.innerWidth < 960) {
      this.is_touch_screen = true;
    } else {
      this.is_touch_screen = false;
    };
  },
  methods: {
    handleChartSave(nodes, connections) {
      // return json of nodes and connections
      this.last_return_object_chart = { nodes: nodes, connections: connections };
    },
    handleEditNode(node) {
      this.$refs.chart.save();
      const json = this.last_return_object_chart;
      this.node_destination_list = json.nodes.filter((element) => { return element.id != node.id });
      this.direction_destination = '';
      this.direction_source = '';
      this.node_destination = {};
      this.selectedNode.target = node;
      this.nodeDialogVisible = true;
      this.nodeForm = { title: node.title, id: node.id, type: node.type, text: node.text, endCause: node.endCause };
    },
    handleEditConnection(connection) {},
    handleClickCancelSaveNode() {
      // close popup edition
      this.nodeDialogVisible = false;
    },
    handleClickSaveNode() {
      //salvando a edição do node
      this.selectedNode.target.title = this.nodeForm.title;
      this.selectedNode.target.type = this.nodeForm.type;
      this.selectedNode.target.text = this.nodeForm.text;
      this.selectedNode.target.endCause = this.nodeForm.endCause;

      if (this.is_touch_screen) {
        // cria coneção apenas se for telas de touch
        if (this.direction_source.value && this.node_destination.id && this.direction_destination.value) {
          //cria somente se escolheu os 3 campos para coneção
          const new_connection = {
            id: +new Date(),
            type: "pass",
            title: "Pass",
            source: {
              id: this.selectedNode.target.id,
              position: this.direction_source.value
            },
            destination: {
              id: this.node_destination.id,
              position: this.direction_destination.value
            }
          };
          // verifica se existe a coneção entre esses dois nodos
          if (this.last_return_object_chart.connections.some((element) => { return element.source.id === new_connection.source.id && element.destination.id === new_connection.destination.id })) {
            // this.alertConnection();
          } else {
            //metodo criado dentro do FlowChart que adiciona uma nova conexão as connections internas
            this.$refs.chart.pushConnection(new_connection);
          }
        }
      }
      this.handleClickCancelSaveNode();
    },
    handleDblClick(position) {
      this.$refs.chart.add({
        id: +new Date(),
        x: position.x,
        y: position.y,
        name: "New",
        type: "operation",
        approvers: [],
      });
    },
  },
};
</script>

<style>
</style>
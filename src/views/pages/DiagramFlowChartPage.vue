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
        { id: 1, x: 140, y: 270, name: "Start", type: "start" },
        {
          id: 2,
          x: 540,
          y: 270,
          name: "End",
          type: "end",
          description: "I'm here",
        },
      ],
      connections: [
        {
          source: { id: 1, position: "right" },
          destination: { id: 2, position: "left" },
          id: 1,
          type: "pass",
        },
      ],
    };
  },
  methods: {
    handleChartSave(nodes, connections) {},
    handleEditNode(node) {},
    handleEditConnection(connection) {},
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
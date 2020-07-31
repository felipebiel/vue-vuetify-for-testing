<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
         Bem vindo ao Vuetify
        </h1>

        <p class="subheading font-weight-regular">
          Neste Projeto possui alguns testes e exemplos para usar
        </p>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Arvores Charts
        </h2>

        <v-row justify="center">
          <a
            v-for="(next, i) in treeExamples"
            :key="i"
            :href="next.href"
            class="subheading mx-3"
          >
            {{ next.text }}
          </a>
        </v-row>
      </v-col>      

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Diagramadores
        </h2>

        <v-row justify="center">
          <a
            v-for="(next, i) in diagramsExamples"
            :key="i"
            :href="next.href"
            class="subheading mx-3"
          >
            {{ next.text }}
          </a>
        </v-row>
      </v-col>     
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data: () => ({

      treeExamples: [
        {
          text: 'Vue-tree-chart',
          href: '/tree-chart',
        },
        {
          text: 'Vuetify Tree',
          href: '/tree-chart-vuetify',
        },
        {
          text: 'Feita do 0 (sem draggable)',
          href: '/tree-chart-exemple-1',
        },
      ],
      diagramsExamples: [
         {
          text: 'Diagramador baseador no FlowChart',
          href: '/tree-chart',
        },
      ]
    }),
  }
</script>

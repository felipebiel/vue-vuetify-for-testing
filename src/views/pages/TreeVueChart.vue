<template>
  <div class="about">
    <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <h2
            class="display-1 font-weight-bold mb-3"
          >Esse é um Exemplo usando a libary vue-tree-chart</h2>
        </v-col>

        <v-col cols="12">
          <VueTreeChart />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
  import VueTreeChart from "@/components/vueTreeChart/VueTreeChart"

  export default {
    components: {
      VueTreeChart,
    },
  }
</script>

<style lang="scss" scoped>

</style>

<template>
  <div class="about">
    <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <h2
            class="display-1 font-weight-bold mb-3"
          >Esse é um Exemplo usando o Tree do Vuetify</h2>
        </v-col>

        <v-col cols="12">
          <VuetifyTree />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
  import VuetifyTree from "../components/vuetifyTree/VuetifyTree"

  export default {
    components: {
      VuetifyTree,
    },
  }
</script>

<style lang="scss" scoped>

</style>

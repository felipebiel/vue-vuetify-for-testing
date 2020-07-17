<template>
  <div class="text-left">
    <v-col class="mb-5" cols="6">
      <v-treeview :items="items" :active.sync="active" activatable active-class="primary--text" open-on-click multiple-active>
          <template v-slot:append="{ item }">
                <v-btn fab dark small color="success">
                   MARCAR
                </v-btn>
                <v-btn fab dark small color="error">
                   Add
                </v-btn>
                <v-btn fab dark small color="info">
                   remove
                </v-btn>
          </template>
      </v-treeview>
    </v-col>
    <v-col class="mb-5" cols="6">{{ active }}</v-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: [],
      items: [
        {
          id: 1,
          name: "Applications :",
          children: [
            { id: 2, name: "Calendar : app" },
            { id: 3, name: "Chrome : app" },
            { id: 4, name: "Webstorm : app" }
          ]
        },
        {
          id: 5,
          name: "Documents :",
          children: [
            {
              id: 6,
              name: "vuetify :",
              children: [
                {
                  id: 7,
                  name: "src :",
                  children: [
                    { id: 8, name: "index : ts" },
                    { id: 9, name: "bootstrap : ts" }
                  ]
                }
              ]
            },
            {
              id: 10,
              name: "material2 :",
              children: [
                {
                  id: 11,
                  name: "src :",
                  children: [
                    { id: 12, name: "v-btn : ts" },
                    { id: 13, name: "v-card : ts" },
                    { id: 14, name: "v-window : ts" }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 15,
          name: "Downloads :",
          children: [
            { id: 16, name: "October : pdf" },
            { id: 17, name: "November : pdf" },
            { id: 18, name: "Tutorial : html" }
          ]
        },
        {
          id: 19,
          name: "Videos :",
          children: [
            {
              id: 20,
              name: "Tutorials :",
              children: [
                { id: 21, name: "Basic layouts : mp4" },
                { id: 22, name: "Advanced techniques : mp4" },
                { id: 23, name: "All about app : dir" }
              ]
            },
            { id: 24, name: "Intro : mov" },
            { id: 25, name: "Conference introduction : avi" }
          ]
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
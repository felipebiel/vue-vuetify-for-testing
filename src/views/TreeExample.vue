<template>
  <div class="about">
    <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <h2 class="display-1 font-weight-bold mb-3">Esse é um Exemplo usando feito do 0</h2>
        </v-col>

        <v-col cols="12">
          <div class="tree">
            <tree-example
              :items="items"
              @addItem="addItem"
              @removeItem="checkRemover"
              @editItem="editItem"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="dialog" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Novo item</v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="Nome" v-model="name"></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>

        <v-card-actions>
          <v-btn color="default" @click="dialog = false">Cancelar</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="addNewItemToItems" v-if="!is_edit">Salvar</v-btn>
          <v-btn color="success" @click="editItemToItems" v-else>Editar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      item_selected: null,
      is_edit: false,
      name: "",
      items: [
        {
          id: 100,
          name: "Root",
          is_selected: false,
          children: [
            {
              id: 1,
              name: "Applications",
              children: [
                { id: 2, name: "Calendar app", is_selected: true },
                { id: 3, name: "Chrome app", is_selected: false },
                { id: 4, name: "Webstorm app", is_selected: true }
              ]
            },
            {
              id: 5,
              name: "Documents",
              is_selected: true,
              children: [
                {
                  id: 6,
                  name: "vuetify",
                  is_selected: true,
                  children: [
                    {
                      id: 7,
                      name: "src",
                      children: [
                        { id: 8, name: "index ts", is_selected: false },
                        { id: 9, name: "bootstrap ts", is_selected: false }
                      ]
                    }
                  ]
                },
                {
                  id: 10,
                  name: "material2",
                  is_selected: false,
                  children: [
                    {
                      id: 11,
                      name: "src",
                      is_selected: false,
                      children: [
                        { id: 12, name: "v-btn ts", is_selected: false },
                        { id: 13, name: "v-card ts", is_selected: false },
                        { id: 14, name: "v-window ts", is_selected: false }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
        /*{
          id: 15,
          name: "Downloads",
          children: [
            { id: 16, name: "October pdf" },
            { id: 17, name: "November pdf" },
            { id: 18, name: "Tutorial html" }
          ]
        },
        {
          id: 19,
          name: "Videos",
          children: [
            {
              id: 20,
              name: "Tutorials",
              children: [
                { id: 21, name: "Basic layouts mp4" },
                { id: 22, name: "Advanced techniques mp4" },
                { id: 23, name: "All about app dir" }
              ]
            },
            { id: 24, name: "Intro mov" },
            { id: 25, name: "Conference introduction avi" }
          ]
        }*/
      ]
    };
  },
  methods: {
    remove(id) {
      this.items = this.filter(this.items, id);
    },
    filter(data, id) {
      let that = this;
      var r = data.filter(item => {
        if (item.children) item.children = this.filter(item.children, id);
        return item.id != id;
      });
      return r;
    },
    addItem(item) {
      this.name = "";
      this.is_edit = false;
      this.item_selected = item;
      this.dialog = true;
    },
    checkRemover(item) {
      this.remove(item.id);
    },
    editItem(item) {
      this.is_edit = true;
      this.name = item.name;
      this.item_selected = item;
      this.dialog = true;
    },
    addNewItemToItems() {
      if (this.item_selected.children) {
        this.item_selected.children.push({
          id: Math.random(),
          name: this.name
        });
      } else {
        this.$set(this.item_selected, "children", [
          {
            id: Math.random(),
            name: this.name
          }
        ]);
      }

      this.name = "";
      this.dialog = false;
    },
    editItemToItems() {
      this.item_selected.name = this.name;
      this.name = "";
      this.dialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

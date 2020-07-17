<template>
  <ul>
    <li v-for="(item, index) in items" :key="index" :class="{is_selected: item.is_selected}">
      <div href="#" class="node pa-2">
        {{ item.name }}
        <div>
          <v-btn fab dark small color="error" @click.prevent="removeItem(item)">
            <v-icon dark>remove</v-icon>
          </v-btn>

          <v-btn fab dark small color="success" @click.prevent="addItem(item)">
            <v-icon dark>add</v-icon>
          </v-btn>

          <v-btn fab dark small color="info" @click.prevent="editItem(item)">
            <v-icon dark>edit</v-icon>
          </v-btn>
        </div>
      </div>

      <tree-example
        v-if="item.children && item.children.length > 0"
        :items="item.children"
        @addItem="addItem"
        @editItem="editItem"
        @removeItem="removeItem"
      />
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: {
      require: true,
      type: Object | Array,
      default: () => {
        return {
          id: "",
          name: "",
          children: []
        };
      }
    }
  },
  methods: {
    addItem(item) {
        this.$emit("addItem", item);
    },
    removeItem(item) {
      this.$emit("removeItem", item);
    },
    editItem(item) {
        this.$emit("editItem", item);
    }
  }
};
</script>

<style lang="scss" scoped>
$border-width: 1px;
$reverse: false;

.tree {
  @if $reverse {
    transform: rotate(180deg);
    transform-origin: 50%;
  }
}

.tree ul {
  position: relative;
  padding: 1em 0;
  white-space: nowrap;
  margin: 0 auto;
  text-align: center;
  &::after {
    content: "";
    display: table;
    clear: both;
  }
}

.tree li {
  display: inline-block; // need white-space fix
  vertical-align: top;
  text-align: center;
  list-style-type: none;
  position: relative;
  padding: 1em 1px;
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 50%;
    border-top: $border-width solid #ccc;
    width: 50%;
    height: 1em;
  }
  &::after {
    right: auto;
    left: 50%;
    border-left: $border-width solid #ccc;
  }
  &:only-child::after,
  &:only-child::before {
    display: none;
  }
  &:only-child {
    padding-top: 0;
  }
  &:first-child::before,
  &:last-child::after {
    border: 0 none;
  }
  &:last-child::before {
    border-right: $border-width solid #ccc;
    border-radius: 0 5px 0 0;
  }
  &:first-child::after {
    border-radius: 5px 0 0 0;
  }
}

.tree ul ul::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  border-left: $border-width solid #ccc;
  width: 0;
  height: 1em;
}

.tree li .node {
  border: $border-width solid #ccc;
  text-decoration: none;
  display: inline-block;
  border-radius: 5px;
  color: #333;
  position: relative;
  top: $border-width;
  @if $reverse {
    transform: rotate(180deg);
  }
}

/*.tree li.is_selected>.node{
    background: #ffd600;
}*/

.tree li .node:hover,
.tree li .node:hover + ul li .node {
  background: #e9453f;
  color: #fff;
  border: $border-width solid #e9453f;
}

.tree li .node:hover + ul li::after,
.tree li .node:hover + ul li::before,
.tree li .node:hover + ul::before,
.tree li .node:hover + ul ul::before {
  border-color: #e9453f;
}
</style>
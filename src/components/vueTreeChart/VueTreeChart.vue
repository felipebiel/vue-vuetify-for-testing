<template>
  <div>
    <TreeChart :json="treeData" />
  </div>
</template>

<script>
import TreeChart from "vue-tree-chart";

export default {
  components: {
    TreeChart
  },
  data() {
    return {
      treeData: {
        name: "root",
        image_url: "https://picsum.photos/seed/picsum/200/300",
        class: ["rootNode"],
        children: [
          {
            name: "children1",
            image_url: "https://picsum.photos/seed/picsum/200/300"
          },
          {
            name: "children2",
            image_url: "https://picsum.photos/seed/picsum/200/300",
            mate: {
              name: "mate",
              image_url: "https://picsum.photos/seed/picsum/200/300"
            },
            children: [
              {
                name: "grandchild",
                image_url: "https://picsum.photos/seed/picsum/200/300"
              },
              {
                name: "grandchild2",
                image_url: "https://picsum.photos/seed/picsum/200/300"
              },
              {
                name: "grandchild3",
                image_url: "https://picsum.photos/seed/picsum/200/300"
              }
            ]
          },
          {
            name: "children3",
            image_url: "https://picsum.photos/seed/picsum/200/300"
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
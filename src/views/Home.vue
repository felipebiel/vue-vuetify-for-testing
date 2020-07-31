<template>
  <div class="home">
    <Painel />
  </div>
</template>

<script>
// @ is an alias to /src
import Painel from '@/components/Painel.vue'

export default {
  name: 'Home',
  components: {
    Painel
  }
}
</script>

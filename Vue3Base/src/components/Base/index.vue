<template>
  <div>
      <!-- <ref-use /> -->
      <teleport-emits />
  </div>
</template>

<script lang="ts">
// import refUse from './ref.vue'
import teleportEmits from './teleport-emits.vue'
export default {
    name: 'Base',
    components: {
        // refUse,
        teleportEmits    
    }
}
</script>

<style>

</style>
<template>
  <div>
      <!-- <ref-use /> -->
      <!-- <teleport-emits /> -->
      <suspenseUse />
  </div>
</template>

<script lang="ts">
// import refUse from './ref.vue'
// import teleportEmits from './teleport-emits.vue'
import suspenseUse from './suspense.vue'
export default {
    name: 'Base',
    components: {
        // refUse,
        // teleportEmits,
        suspenseUse    
    }
}
</script>

<style>

</style>
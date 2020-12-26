<template>
  <div>
      <img :src="result && result.message" alt="dog">
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from 'axios'
export default defineComponent({
    async setup() {
        const rawData = await axios.get('https://dog.ceo/api/breeds/image/random')
        return {
            result: rawData.data
        }
    }
})
</script>

<style>

</style>